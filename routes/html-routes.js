var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '..', '/public/index.html'));
});
router.get('/stats', function(req, res) {
    res.sendFile(path.join(__dirname, '..', '/public/stats.html'));
});
router.get('/exercise', function(req, res) {
    res.sendFile(path.join(__dirname, '..', '/public/exercise.html'));
});

module.exports = router;