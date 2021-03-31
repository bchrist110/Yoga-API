const path = require('path')
const express = require('express')
const LastService = require('./lastService')

const lastRouter = express.Router()
const jsonParser = express.json()

const serializeOrder = order => ({
    id: order.id,
    ordersitting: order.ordersitting,
    orderstanding: order.orderstanding
})

lastRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        LastService.getAllOrders(knexInstance)
          .then(orders => {
            res.json(orders.map(serializeOrder))
          })
          .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { ordersitting, orderstanding } = req.body
        const newOrder = { ordersitting, orderstanding }
    
        for (const [key, value] of Object.entries(newOrder))
          if (value == null)
            return res.status(400).json({
              error: { message: `Missing '${key}' in request body` }
            })
    
        LastService.addOrder(
          req.app.get('db'),
          newOrder
        )
          .then(order => {
            res
              .status(201)
              .location(path.posix.join(req.originalUrl, `/${order.id}`))
              .json(serializeOrder(order))
          })
          .catch(next)
    })


module.exports = lastRouter
