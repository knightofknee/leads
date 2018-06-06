const express = require('express')
const app = express()
const sorter = require('./sorter')
const reader = require('./reader').readOne

let leads = []
app.use(express.json())
app.use(express.urlencoded())

app.post('/leads', (req, res) => {
  let lead = reader(req.body.lead)
  if (Array.isArray(lead) && lead.length === 5){
    leads = [...leads, lead]
    res.send(202, 'lead submitted successfully')
  }
  else res.send(400, `Must submit a parameter called 'lead' as a string with 5 values delimited using commas, pipes or spaces, in the order of last name, first name, project type, project name, start date`)
})
app.get('/leads/propertytype', (req, res) => res.json(sorter(leads, 'propType')))
app.get('/leads/startdate', (req, res) => res.json(sorter(leads, 'date')))
app.get('/leads/project', (req, res) => res.json(sorter(leads, 'project')))

module.exports = app.listen(3000, () => console.log('Leads API listening on port 3000!!!'))
