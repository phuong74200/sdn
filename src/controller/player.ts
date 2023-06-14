const express = require('express')
const router = express.Router()

router.get('/', (_, res) => {
  res.send('Player Router')
})

router.put('/', (_, res) => {
  res.statusCode = 403
  res.send('Operation not suppported.')
})

router.post('/', (_, res) => {
  res.send('Updating')
})

router.delete('/', (_, res) => {
  res.send('Deleting all players.')
})

router.get('/:playerId', (_, res) => {
  res.send('Get a specific player')
})

router.put('/:playerId', (_, res) => {
  res.statusCode = 403
  res.send('Operation not suppported.')
})

router.post('/:playerId', (req, res) => {
  res.send(`Updating player id ${req.params.playerId}`)
})

router.delete('/:playerId', (req, res) => {
  res.send(`Deleting player id ${req.params.playerId}`)
})

module.exports = router