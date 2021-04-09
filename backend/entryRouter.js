//initialize express router
let router = require('express').Router();

//set default API response
router.get('/', function(req, res) {
    res.json({
        status: 'API Works',
        message: 'Welcome to FirstRest API'
    });
});

//Import Entry Controller
var entryController = require('./entryController');

// Entry routes
router.route('/entry')
    .get(entryController.index)
    .post(entryController.add);

    router.route('/entry/:entry_id')
    .get(entryController.view)
    .patch(entryController.update)
    .put(entryController.update)
    .delete(entryController.delete);

    //Export API routes
module.exports = router;