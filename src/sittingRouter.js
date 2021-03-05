const path = require('path')
const express = require('express')
const SittingService = require('./sittingService')

const sittingRouter = express.Router()
const jsonParser = express.json()

const serializeSitting = pose => ({
    id: pose.id,
    name: pose.name,
    img1: pose.img1,
    img2: pose.img2,
    img3: pose.img3,
    notes: pose.notes
})

sittingRouter
    .route('/')
    .get((req,res,next) =>{
        const knexInstance = req.app.get('db')
        SittingService.getAllSitting(knexInstance)
            .then(poses => {
                res.json(poses.map(serializeSitting))
            })
            .catch(next)
    })

module.exports = sittingRouter