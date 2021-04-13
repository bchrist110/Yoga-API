const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')

describe('App Endpoints', function() {
    let db

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: 'postgresql://dunder_mifflin@localhost/yoga-test',
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('clean the table', () => db('standing').truncate())

  context('Given there is data in the database', () => {
    const testStanding = [
        {
            "id": 1,
            "name": "Warrior II",
            "img1": "http://static1.squarespace.com/static/5008a3c6c4aa6450352d2303/5008a4a8e4b051a31a29f14e/5257aec2e4b066932a9abe56/1395089046618/warrior-2-other-side.jpg?format=1500w",
            "img2": "https://dsgmedia.blob.core.windows.net/pub/2016/03/12BasicYogaPoses_NEW.jpg",
            "img3": "https://www.gaia.com/wp-content/uploads/WarriorII_ColleenSaidman.jpg",
            "notes": "Try to keep your body in one straight line, switch sides after 30 seconds"
        },
        {
            "id": 2,
            "name": "Extended Side Angle",
            "img1": "https://blog.myfitnesspal.com/wp-content/uploads/2019/03/11-Essential-Yoga-Poses-For-Beginners-752x472.jpg",
            "img2": "https://beyogi.com/wp-content/uploads/2015/03/Extended-Side-Angle-Pose-2.png",
            "img3": "https://media.istockphoto.com/photos/yoga-extended-side-angle-pose-utthita-parsvakonasana-picture-id543188324",
            "notes": "Reach as far as you can forward, then put the arms at 6 and 12, switch sides after 30 seconds"
        },
        {
            "id": 3,
            "name": "Forward Fold",
            "img1": "http://www.yogabasics.com/yogabasics2017/wp-content/uploads/2013/11/ForFold_9701.jpg",
            "img2": "https://www.ekhartyoga.com/media/images/articles/content/Uttanasana-Standing-forward-fold-Esther-Ekhart-Yoga.jpg",
            "img3": "https://cdn.prod.openfit.com/uploads/2017/07/06110247/standing-forward-bend-yoga52-odette-hughes.jpg",
            "notes": "Slight bend in your knees"
        }
    ]
    
    beforeEach('insert standing', () => {
       return db
        .into('standing')
        .insert(testStanding)
    })

    it('GET /standing responds with 200 and all of the standing poses', () => {
        return supertest(app)
            .get('/api/standing')
            .expect(200, testStanding)
        })
    
    afterEach('cleanup', () => db('standing').truncate())
  })
})