const express = require('express')
const path = require('path')

const app = express()

const members = [
  {
    id: 1,
    name: 'Mano',
    email: 'mano@mail.com',
    status: 'active'
  },
  {
    id: 2,
    name: 'Truta',
    email: 'truta@mail.com',
    status: 'inactive'
  },
  {
    id: 3,
    name: 'Manolo',
    email: 'manolo@mail.com',
    status: 'active'
  }
]

app.get('/api/members', (req, res) => {
  res.json(members)
})

app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started at port ${PORT}`))
