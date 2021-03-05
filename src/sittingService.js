const SittingService = {
    getAllSitting(knex) {
        return knex.select('*').from('sitting')
    }
}

module.exports = SittingService