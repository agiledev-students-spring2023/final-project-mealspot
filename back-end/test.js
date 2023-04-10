const server = require('./app.js')
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp);
const should = chai.should()

describe("GET request to / route", () => {
    it("it should respond with an HTTP 200 status code and an array of objects containing recipe data in the response body", done => {
        chai
        .request(server)
        .get('/')
        .end((err, res) => {
            res.should.have.status(200) // use should to make BDD-style assertions
            res.body.should.be.a('array') // our route sends back an object
            done() // resolve the Promise that these tests create so mocha can move on
        })
    })
})

describe("POST request to / route", () => {
    it("it should respond with an HTTP 200 status code and an object containing day data gives status ok", done => {
        chai
        .request(server)
        .post('/')
        .set('content-type', 'application/json')
        .send({day: 1})
        .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('status').eql('ok')
            done()
        })
    })
    it("it should respond with an HTTP 400 status code and an object containing status error", done => {
        chai
        .request(server)
        .post('/')
        .set('content-type', 'application/json')
        .send({})
        .end((err, res) => {
            res.should.have.status(400)
            res.body.should.be.a('object')
            res.body.should.have.property('status').eql('error')
            done()
        })
    })
    it("it should respond with an HTTP 400 status code and an object containing status error", done => {
        chai
        .request(server)
        .post('/')
        .set('content-type', 'application/json')
        .send({day: 7})
        .end((err, res) => {
            res.should.have.status(400)
            res.body.should.be.a('object')
            res.body.should.have.property('status').eql('error')
            done()
        })
    })
})

describe("GET request to /choosepage route", () => {
    it("it should respond with an HTTP 200 status code and an array of objects containing recipe data in the response body", done => {
        chai
        .request(server)
        .get('/choosepage')
        .end((err, res) => {
            res.should.have.status(200) // use should to make BDD-style assertions
            res.body.should.be.a('object') // our route sends back an object
            done() // resolve the Promise that these tests create so mocha can move on
        })
    })
})

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

describe('POST request to /recipesearch route', () => {
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

describe('POST request to /account route', () => {
    it('it should respond with an HTTP 200 status code and an object the budget rounded to 2 decimals, with a $ appended to the front', done => {
        let requestBody = {
            budget: '18.5421'
        }
        chai
        .request(server)
        .post('/account')
        .send(requestBody)
        .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('budget').eql('$18.54')
            done()
        })
    })
    it('it should respond with an HTTP 400 status code when request budget is not a number (invalid input)', done => {
        let requestBody = {
            budget: 'test'
        }
        chai
        .request(server)
        .post('/account')
        .send(requestBody)
        .end((err, res) => {
            res.should.have.status(400)
            res.body.should.be.a('object')
            res.body.should.have.property('msg').eql('invalid input')
            done()
        })
    })
})

describe('POST request to /login route with username and password', () => {
    it('it should respond with an HTTP 200 status code and an object containing result: success', done => {
        let requestBody = {
            username: 'a',
            password: 'a'
        }
        chai
        .request(server)
        .post('/login')
        .send(requestBody)
        .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('result').eql('success')
            done()
        })
    })
    it('it should respond with an HTTP 400 status code and an object with result: fail', done => {
        chai
        .request(server)
        .post('/login')
        .send({})
        .end((err, res) => {
            res.should.have.status(400)
            res.body.should.be.a('object')
            res.body.should.have.property('result').eql('fail')
            done()
        })
    })
})

describe('POST request to /register route with username, password, and email', () => {
    it('it should respond with an HTTP 200 status code and an object containing result: success', done => {
        let requestBody = {
            username: 'a',
            email: 'a',
            password: 'a'
        }
        chai
        .request(server)
        .post('/register')
        .send(requestBody)
        .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('result').eql('success')
            done()
        })
    })
    it('it should respond with an HTTP 400 status code and an object with result: fail', done => {
        chai
        .request(server)
        .post('/register')
        .send({})
        .end((err, res) => {
            res.should.have.status(400)
            res.body.should.be.a('object')
            res.body.should.have.property('result').eql('fail')
            done()
        })
    })
})

describe("GET request to /account route", () => {
    it("it should respond with an HTTP 200 status code and an object with name, email, and budget", done => {
        chai
        .request(server)
        .get('/account')
        .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('array')
            done()
        })
    })
})

describe("GET request to /choosesavedrecipes route", () => {
    it("it should respond with an HTTP 200 status code and an object containing recipes and fridge", done => {
        chai
        .request(server)
        .get("/choosesavedrecipes")
        .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            done()
        })
    })
})

describe("GET request to /addpage route", () => {
    it("it should respond with an HTTP 200 status code and an object containing recipes and fridge", done => {
        chai
        .request(server)
        .get("/addpage")
        .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
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
