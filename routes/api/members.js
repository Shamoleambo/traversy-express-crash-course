const express = require('express')
const router = express.Router()
const uuid = require('uuid')
const members = require('../../Members')

router.get('/', (req, res) => res.json(members))

router.get('/:id', (req, res) => {
  const member = members.find(member => member.id === parseInt(req.params.id))

  if (!member) {
    res
      .status(404)
      .json({ message: `No member with the id of ${req.params.id}` })
  } else {
    res.status(200).json(member)
  }
})

router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  }

  if (!req.body.name || !req.body.email) {
    res.status(400).json({ message: 'Not a valid user' })
  } else {
    members.push(newMember)
    res.json(members)
  }
})

module.exports = router
