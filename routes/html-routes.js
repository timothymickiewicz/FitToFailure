const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..', '/public/html/index.html'))
})

router.get('/stats', function (req, res) {
  res.sendFile(path.join(__dirname, '..', '/public/html/stats.html'))
})

router.get('/exercise', function (req, res) {
  res.sendFile(path.join(__dirname, '..', '/public/html/exercise.html'))
})

module.exports = router
