function display(leadsArray, title){
  console.log(title + '\n\nLast Name | First Name | Property Type | Start Date \n')
  for (let i = 0; i < leadsArray.length; i++) {
    console.log(leadsArray[i].join(' | '))
  }
  console.log('\n')
}

module.exports = display
