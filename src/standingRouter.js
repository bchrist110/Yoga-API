const path = require('path')
const express = require('express')
const StandingService = require('./standingService')

const standingRouter = express.Router()
const jsonParser = express.json()

const serializeStanding = pose => ({
    id: pose.id,
    name: pose.name,
    img1: pose.img1,
    img2: pose.img2,
    img3: pose.img3,
    notes: pose.notes
})

standingRouter
    .route('/')
    .get((req,res,next) =>{
        const knexInstance = req.app.get('db')
        StandingService.getAllStanding(knexInstance)
            .then(poses => {
                res.json(poses.map(serializeStanding))
            })
            .catch(next)
    })

module.exports = standingRouter