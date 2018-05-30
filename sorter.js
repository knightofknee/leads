function sortLeads(leadsArray, method){

  if (method === 'date'){
    leadsArray.sort(function(a, b){
      return Date.parse(a[4]) > Date.parse(b[4])
    })
  }
  else if (method === 'last name'){
    leadsArray.sort(function(a, b){
      return a[0] < b[0]
    })
  }
  else if (method === 'project'){
    leadsArray.sort(function(a, b){
      return a[3] > b[3]
    })
  }
  else {
    leadsArray.sort(function(a, b){
      if (a[2] === b[2]){
        return a[3] > b[3]
      }
      else return a[2] > b[2]
    })
  }
  return leadsArray
}
module.exports = sortLeads
