const express = require('express')
const router = express.Router()
const uuid = require('uuid')
let members = require('../../Members')

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

router.put('/:id', (req, res) => {
  const member = members.find(member => member.id === parseInt(req.params.id))

  if (!member) {
    res
      .status(404)
      .json({ message: `No member with the id ${req.params.id} found` })
  } else {
    const updMember = req.body
    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name
        member.email = updMember.email ? updMember.email : member.email
      }
    })

    res.status(200).json({ message: 'Member updated', updMember })
  }
})

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const member = members.find(member => member.id === id)

  if (!member) {
    res
      .status(404)
      .json({ message: `No member with the id of ${id} found to be deleted` })
  } else {
    members = members.filter(member => member.id !== id)
    res
      .status(200)
      .json({ message: `Member with the id of ${id} deleted`, member })
  }
})

module.exports = router
