const express = require('express')
const router = express.Router()
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

module.exports = router
