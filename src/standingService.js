const StandingService = {
    getAllStanding(knex) {
        return knex.select('*').from('standing')
    }
}

module.exports = StandingService