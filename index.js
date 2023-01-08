const express = require('express')
const path = require('path')
const members = require('./Members')
const logger = require('./middleware/logger')

const app = express()

app.use(logger)

app.get('/api/members', (req, res) => res.json(members))

app.get('/api/members/:id', (req, res) => {
  const member = members.find(member => member.id === parseInt(req.params.id))
  if (!member) {
    res.status(404)
    res.json({ message: 'No member found' })
  } else {
    res.status(200)
    res.json(member)
  }
})

app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started at port ${PORT}`))
