const expect = require('chai').expect
const reader = require('../reader')
const sorter = require('../sorter')
const request = require('supertest')

describe('Leads application', function() {

  describe('readOne function', function(){
    it('should return an empty array when given an empty string', function() {
      expect(reader.readOne('')).to.be.an('array').that.is.empty
    })
    it('should convert leads with commas, pipes, or spaces', function() {
      expect(reader.readOne('one two three four five')).to.deep.equal(['one', 'two', 'three', 'four', 'five'])
      expect(reader.readOne('one|two|three|four')).to.deep.equal(['one', 'two', 'three', 'four'])
      expect(reader.readOne('one,two,three,four')).to.deep.equal(['one', 'two', 'three', 'four'])
    })
  })

  describe('readLeads function', function(){
    it('should return an array with its only entry being an array when given an empty string', function() {
      expect(reader.readLeads('')[0]).to.be.an('array').that.is.empty
      expect(reader.readLeads('').length).to.equal(1)
    })
    it('should convert groups of leads with commas, pipes, or spaces', function() {
      expect(reader.readLeads('one two three four five \n six seven eight nine ten')).to.deep.equal([['one', 'two', 'three', 'four', 'five'], ['six', 'seven', 'eight', 'nine', 'ten']])
      expect(reader.readLeads('one|two|three|four|five \n six|seven|eight|nine|ten')).to.deep.equal([['one', 'two', 'three', 'four', 'five'], ['six', 'seven', 'eight', 'nine', 'ten']])
      expect(reader.readLeads('one,two,three,four,five,more \n six,seven,eight,nine,ten,extra')).to.deep.equal([['one', 'two', 'three', 'four', 'five', 'more'], ['six', 'seven', 'eight', 'nine', 'ten', 'extra']])
    })
  })

  let testArray = [['efirst', 'alast', 'aprojectType', 'aproject', '3/3/2018'], ['bfirst', 'blast', 'bprojectType', 'cproject', '3/3/2017'], ['cfirst', 'clast', 'cprojectType', 'dproject', '3/6/2018'], ['dfirst', 'dlast', 'cprojectType', 'bproject', '2/3/2018']]

  describe('sorter function', function(){
    it('sorts date properly', function(){
      expect(sorter(testArray, 'date')).to.deep.equal([testArray[1], testArray[3], testArray[0], testArray[2]])
    })
    it('sorts last name properly', function(){
      expect(sorter(testArray, 'last name')).to.deep.equal([testArray[0], testArray[3], testArray[2], testArray[1]])
    })
    it('sorts by project properly', function(){
      expect(sorter(testArray, 'project')).to.deep.equal([testArray[0], testArray[3], testArray[1], testArray[2]])
    })
    it('sorts by project type properly', function(){
      expect(sorter(testArray, 'projType')).to.deep.equal([testArray[0], testArray[1], testArray[3], testArray[2]])
    })
  })

  let test = ['lastnammee first! HOUSE steamroom 11/12/2018', 'alastnammee,afirst!,HOUSE,asteamroom,10/12/2018', 'lastnammee|first|bath|room|12/11/2018']
  let processedTest = [['lastnammee', 'first!', 'HOUSE', 'steamroom', '11/12/2018'], ['alastnammee', 'afirst!', 'HOUSE', 'asteamroom', '10/12/2018'], ['lastnammee', 'first', 'bath', 'room', '12/11/2018']]

  describe('API routes', function(){
    let app
    before(function(done){
      app = require('../index')
      request(app)
      .post('/leads')
      .set('Content-Type', 'application/json')
      .send({lead: test[0]})
      .expect((res)=>{})
      .end(done)
    })
    before(function(done){
      request(app)
      .post('/leads')
      .set('Content-Type', 'application/json')
      .send({lead: test[1]})
      .expect((res)=>{})
      .end(done)
    })
    before(function(done){
      request(app)
      .post('/leads')
      .set('Content-Type', 'application/json')
      .send({lead: test[2]})
      .expect((res)=>{})
      .end(done)
    })
    after(function(){
      app.close()
    })

    it('returns the initial 3 leads posted', function(done){
      request(app)
      .get('/leads/project')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, function(err, res){
        if (err) return done(err)
        data = res.body
        expect(data).to.be.an('array')
        expect(data.length).to.equal(3)
        done()
      })
    })
    it('returns the leads in project order', function(done){
      request(app)
      .get('/leads/project')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, function(err, res){
        if (err) return done(err)
        data = res.body
        expect(data).to.deep.equal([processedTest[1], processedTest[2], processedTest[0]])
        done()
      })
    })
    it('returns the leads in order of start date', function(done){
      request(app)
      .get('/leads/startdate')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, function(err, res){
        if (err) return done(err)
        data = res.body
        expect(data).to.deep.equal([processedTest[1], processedTest[0], processedTest[2]])
        done()
      })
    })
    it('returns the leads in order of property type then project', function(done){
      request(app)
      .get('/leads/propertytype')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, function(err, res){
        if (err) return done(err)
        data = res.body
        expect(data).to.deep.equal([processedTest[1], processedTest[0], processedTest[2]])
        done()
      })
    })
    it('rejects leads without 5 fields with a message', function(done){
      request(app)
      .post('/leads')
      .set('Content-Type', 'application/json')
      .send({lead: 'one two three four'})
      .expect(400, function(err, res){
        if (err) return done(err)
        expect(res.text).to.equal(`Must submit a parameter called 'lead' as an array of length 5`)
        done()
      })
    })
    it('returns a 202 for successful posts', function(done){
      request(app)
      .post('/leads')
      .set('Content-Type', 'application/json')
      .send({lead: 'one two three four five'})
      .expect(202, function(err, res){
        if (err) return done(err)
        done()
      })
    })
  })
});
