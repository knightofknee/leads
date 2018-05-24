// import submitLeadFunction

// request a file to be entered

// run submitLeadFunctionToDatabase
// pull data from database and sort it
// print these to screen

// reads the 3 files by creating 3 promises
let reader = require('./reader')
let sorter = require('./sort')
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
// use sort function
Promise.all([spacePromise, pipePromise, commaPromise])
.then((data) =>{return [...data[0], ...data[1], ...data[2]]})
.then((resultsArray) => {console.log(sorter(resultsArray, 'lasddt'))})

