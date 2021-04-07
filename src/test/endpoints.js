const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')

describe('App Endpoints', function() {
    let db

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('clean the table', () => db('yoga').truncate())

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

    const testSitting = [
        {
            "id": 1,
            "name": "Easy Pose",
            "img1": "https://lh5.googleusercontent.com/DuhWFp7QBpR-X6whKehCvm233FCwqdy-5fjjm0JPlkq6euMSkPohWQbkPRO_-JNHyo-OBjSskRy_6-_hfgZNxLQaSyXFWKHepybaHAaN-yyAOmYUWq4Y2l3m0h5WvayGOL_D-Ina",
            "img2": "https://www.huggermugger.com/wp-content/uploads/2018/01/sukhasana-meditation.jpg",
            "img3": "http://arogyayogaschool.com/blog/wp-content/uploads/2017/04/Sukhasana-Help-Reduce-Your-Blood-Pressure.jpg",
            "notes": "This is one way to do easy pose, but as the name suggests, this pose is intended to be a comfortable seat. If this configuration does not work for you, take any cross-legged position. Sitting on a blanket to elevate the hips is also encouraged here."
        },
        {
            "id": 2,
            "name": "Thunderbolt Pose",
            "img1": "https://i.pinimg.com/originals/78/8a/5d/788a5d0c9c852e1cdcd58a8c98fded8b.jpg",
            "img2": "https://photos.cdn-outlet.com/yo-images/userfiles/guide/image/yoga/yoga_how-to-do-thunderbolt-pose_300x350_jpg.jpg",
            "img3": "https://i.ytimg.com/vi/3ILEYJOtHgM/maxresdefault.jpg",
            "notes": "A basic kneeling position, with the seat resting on the feet."
        },
        {
            "id": 3,
            "name": "Staff Pose",
            "img1": "https://www.verywellfit.com/thmb/u6DHrDtCYh8JD5-Kh7fQA-EGLcE=/1500x1000/filters:no_upscale():max_bytes(150000):strip_icc()/StaffPose_annotated-007b1534c2914848af88f7e09360c0b4.jpg",
            "img2": "https://www.ekhartyoga.com/media/images/articles/content/Staff-Pose-Dandasana-Ekhart-Yoga.jpg",
            "img3": "https://cdn.shopify.com/s/files/1/0032/7539/1011/articles/Yoga_SeatedStaffPose_01_300x350_1_600x.jpg?v=1558424546",
            "notes": "Staff pose is often called the seated equivalent of mountain pose. Just as mountain sets up the alignment for many standing poses, staff pose is the starting point for many seated poses."
        }
    ]

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
    
    beforeEach('insert standing', () => {
       return db
        .into('standing')
        .insert(testStanding)
    })
    beforeEach('insert sitting', () => {
        return db
         .into('sitting')
         .insert(testSitting)
    })
    beforeEach('insert last', () => {
        return db
         .into('lastfive')
         .insert(testlast)
    })

    it('GET /standing responds with 200 and all of the standing poses', () => {
        return supertest(app)
            .get('/standing')
            .expect(200, testStanding)
        })
    it('GET /sitting responds with 200 and all of the sitting poses', () => {
        return supertest(app)
            .get('/sitting')
            .expect(200, testSitting)
        })
    
    it('GET /lastfive responds with 200 and all of the sitting poses', () => {
        return supertest(app)
            .get('/lastfive')
            .expect(200, testlast)
        })

        describe.only(`POST /lastfive`, () => {
            it(`posts new orders, responding with 201 and the new orders`,  function() {
                return supertest(app)
                   .post('/lastfive')
                   .send({
                    "ordersitting": "15 14 13 12 11 10 9 8 7 6 5 4 3 2 1",
                    "orderstanding": "15 14 13 12 11 10 9 8 7 6 5 4 3 2 1"
                   })
                   .expect(201)
            })
        })
    
    afterEach('cleanup', () => db('yoga').truncate())
  })
})