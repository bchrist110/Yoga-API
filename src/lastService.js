const LastService = {
    getAllOrders(knex) {
        return knex.select('*').from('lastfive')
    },

    addOrder(knex, newOrder) {
        return knex
        .insert(newOrder)
        .into('lastfive')
        .returning('*')
        .then(rows => {
          return rows[0]
        })
    }
}

module.exports = LastService