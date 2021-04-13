const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')

describe('App Endpoints', function() {
    let db

    this.timeout(5000)

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: 'postgresql://dunder_mifflin@localhost/yoga-test',
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('clean the table', () => db('lastfive').truncate())

  context('Given there is data in the database', () => {
    const testlast = [
        {
            "id": 1,
            "ordersitting": "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15",
            "orderstanding": "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15"
        },
        {
            "id": 2,
            "ordersitting": "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15",
            "orderstanding": "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15"
        },
        {
            "id": 3,
            "ordersitting": "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15",
            "orderstanding": "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15"
        },
    ]

    beforeEach('insert last', () => {
        return db
         .into('lastfive')
         .insert(testlast)
    })
    
    it('GET /lastfive responds with 200 and all of the sitting poses', () => {
        return supertest(app)
            .get('/api/lastfive')
            .expect(200, testlast)
        })

    afterEach('cleanup', () => db('lastfive').truncate())
  })
})