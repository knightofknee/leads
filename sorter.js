// sorts an array of arrays, with the default method of project type then project name
function sortLeads(leadsArray, method){
  let results = [...leadsArray]
  if (method === 'date'){
    results.sort(function(a, b){
      return Date.parse(a[4]) > Date.parse(b[4])
    })
  }
  else if (method === 'last name'){
    results.sort(function(a, b){
      return a[0] < b[0]
    })
  }
  else if (method === 'project'){
    results.sort(function(a, b){
      return a[3] > b[3]
    })
  }
  else {
    results.sort(function(a, b){
      if (a[2] === b[2]){
        return a[3] > b[3]
      }
      else return a[2] > b[2]
    })
  }
  return results
}

module.exports = sortLeads
