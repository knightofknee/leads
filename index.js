const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/leads', (req, res) => res.send('Hello World!'))

app.get('/leads/propertytype', (req, res) => res.send('Hello World!'))

app.get('/leads/startdate', (req, res) => res.send('Hello World!'))

app.get('/leads/project', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
