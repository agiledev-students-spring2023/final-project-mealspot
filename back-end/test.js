const server = require('./app.js')
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp);
const should = chai.should()

describe("GET request to /savedrecipes route", () => {
    it("it should respond with an HTTP 200 status code and an object with recipes and fridge", done => {
        chai
        .request(server)
        .get('/savedrecipes')
        .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('recipes')
            res.body.should.have.property('fridge')
            done()
        })
    })
})

describe('POST request to /savedrecipes route', () => {
    it('it should respond with an HTTP 200 status code and an object containing result: this should not happen when request has save = true', done => {
        let requestBody = {
            save: true
        }
        chai
        .request(server)
        .post('/savedrecipes')
        .set('content-type', 'application/json')
        .send(requestBody)
        .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('result').eql('this should not happen')
            done()
        })
    })
    it('it should respond with an HTTP 200 status code and an object containing result: recipe unsaved when request has save = false', done => {
        let requestBody = {
            save: false
        }
        chai
        .request(server)
        .post('/savedrecipes')
        .send(requestBody)
        .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('result').eql('recipe unsaved')
            done()
        })
    })
    it('it should respond with an HTTP 400 status code and an object with msg: invalid input when request does not have save property', done => {
        chai
        .request(server)
        .post('/savedrecipes')
        .send({})
        .end((err, res) => {
            res.should.have.status(400)
            res.body.should.be.a('object')
            res.body.should.have.property('msg').eql('invalid input')
            done()
        })
    })
})

describe("GET request to /recipesearch route", () => {
    it("it should respond with an HTTP 200 status code and an object containing recipes and fridge", done => {
        chai
        .request(server)
        .get("/recipesearch")
        .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('recipes')
            res.body.should.have.property('fridge')
            done()
        })
    })
})

describe('POST request to /recipesearch route with save = true', () => {
    it('it should respond with an HTTP 200 status code and an object containing result: recipe saved when request has save = true', done => {
        let requestBody = {
            save: true
        }
        chai
        .request(server)
        .post('/recipesearch')
        .send(requestBody)
        .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('result').eql('recipe saved')
            done()
        })
    })
    it('it should respond with an HTTP 200 status code and an object containing result: recipe unsaved when request has save = false', done => {
        let requestBody = {
            save: false
        }
        chai
        .request(server)
        .post('/recipesearch')
        .send(requestBody)
        .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('result').eql('recipe unsaved')
            done()
        })
    })
    it('it should respond with an HTTP 400 status code and an object with msg: invalid input when request does not have save property', done => {
        chai
        .request(server)
        .post('/recipesearch')
        .send({})
        .end((err, res) => {
            res.should.have.status(400)
            res.body.should.be.a('object')
            res.body.should.have.property('msg').eql('invalid input')
            done()
        })
    })
})

describe("GET request to /myfridge route", () => {
    it("should respond with an HTTP 200 status code", done => {
        chai
        .request(server)
        .get("/myfridge")
        .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            done()
        })
    })
})

describe("GET request to /grocerylist route", () => {
    it("it should respond with an HTTP 200 status code", done => {
        chai
        .request(server)
        .get("/grocerylist")
        .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            done()
        })
    })
})