require('dotenv').config()
const {User} = require('./models/index')
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
   res.send('OK')
})

app.post('/user/create', (req, res) => {
   const {name, email, password} = req.body
   if (!name || !email || !password) {
      res.send('Data tidak lengkap')
   } else {
      User.create({name, email, password})
      .then((data) => {
         res.send("CREATED! " + data)
      })
      .catch((err) => {
         res.send("error: " + err)
      })
   }
})

app.listen(port, () => {
   console.log("App running on port ", port)
})