// takes in a string of any mix of the formats and returns an array of leads
// (the leads themselves are arrays too)
function readOne(text){
  let lead = []
    if (text.includes('|')) {
      lead = text.split('|').map(entry => entry.trim())
    }
    else if (text.includes(',')) {
      lead = text.split(',').map(entry => entry.trim())
    }
    else {
      if (text === '') return []
      lead = text.split(' ').filter(entry => entry !== '')
    }
    return lead
}
function readLeads(text) {
  let leadsArray = text.split('\n').filter(entry => entry !== '')
  .map(entry => entry.trim())

  let results = []
  for (let i = 0; i < leadsArray.length; i++){
    results.push(readOne(leadsArray[i]))
  }
  return results
}


module.exports = {readLeads, readOne}
