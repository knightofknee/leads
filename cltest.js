let reader = require('./reader').readLeads
let sorter = require('./sorter')
let display = require('./display')

// reads the 3 files by creating 3 promises
fs = require('fs')
let spacePromise = new Promise(function(resolve, reject) {
  fs.readFile('space.txt', 'utf8', function (err,data) {
    if (err) {
      reject(err)
    }
    resolve(reader(data))
  })
})
let pipePromise = new Promise(function(resolve, reject) {
  fs.readFile('pipe.txt', 'utf8', function (err,data) {
    if (err) {
      reject(err)
    }
    resolve(reader(data))
  })
})
let commaPromise = new Promise(function(resolve, reject) {
  fs.readFile('comma.txt', 'utf8', function (err,data) {
    if (err) {
      reject(err)
    }
    resolve(reader(data))
  })
})
// now the file data can be used from those promises
Promise.all([spacePromise, pipePromise, commaPromise])
.then((data) =>{return [...data[0], ...data[1], ...data[2]]})
.then((resultsArray) => {
  display(sorter(resultsArray, 'date'), 'Ordered by Date')
  display(sorter(resultsArray, 'last name'), 'Ordered by Last Name')
  display(sorter(resultsArray, 'projType'), 'Ordered by Project type and name')
})

