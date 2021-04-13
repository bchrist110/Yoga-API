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

  before('clean the table', () => db('sitting').truncate())

  context('Given there is data in the database', () => {

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

    
    beforeEach('insert sitting', () => {
        return db
         .into('sitting')
         .insert(testSitting)
    })


    it('GET /sitting responds with 200 and all of the sitting poses', () => {
        return supertest(app)
            .get('/api/sitting')
            .expect(200, testSitting)
        })
    
    afterEach('cleanup', () => db('sitting').truncate())
  })
})