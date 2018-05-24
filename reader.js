// takes in a string of any mix of the formats and returns an array of leads
// (the leads themselves are arrays too)
function readLeads(text) {
  let leadsArray = text.split('\n').filter(entry => entry !== '')
  .map(entry => entry.trim())

  let results = []
  for (let i = 0; i < leadsArray.length; i++){
    let lead = []
    if (leadsArray[i].includes('|')) {
      lead = leadsArray[i].split('|').map(entry => entry.trim())
      results.push(lead)
    }
    else if (leadsArray[i].includes(',')) {
      lead = leadsArray[i].split(',').map(entry => entry.trim())
      results.push(lead)
    }
    else {
      lead = leadsArray[i].split(' ').filter(entry => entry !== '')
      results.push(lead)
    }
  }
  return results
}
module.exports = readLeads


// fs = require('fs')
// fs.readFile('yaa.txt', 'utf8', function (err,data) {
//   if (err) {
//     return console.log(err);
//   }
//   readLeads(data);
// });
