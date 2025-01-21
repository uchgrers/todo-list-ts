module.exports = function (app) {
    app.get('/', (req, res) => {
        let todos = require('./../../server').todos
        res.json(todos);
    })
}