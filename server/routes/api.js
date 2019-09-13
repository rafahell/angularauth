const express = require('express')
const jwt = require ('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')

const mongoose = require ('mongoose')
const db = "mongodb://userview:Happy123@ds155823.mlab.com:55823/eventsdb"

//connect to mongodb
mongoose.connect(db,  err => {
    if (err) {
        console.log('Error' + err);
    }else {
        console.log('conneted to mongodb')
    }
})

//router api page
router.get ('/', (req, res) => {
    res.send('From API route')
})

//register user
router.post ( '/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if(error) {
            console.log(error)
        }else {
            let payload = {subject: registeredUser._id}
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token})
        }
    })
})

//login 
router.post ('/login', (req, res) => {
    let userData = req.body

    User.findOne({email: userData.email}, (error,user) => {
        if(error) {
            console.log(error)
        }else {
            if (!user) {
                res.status(401).send('* Invalid email *')
            }else
                if (user.password !== userData.password) {
                    res.status(200).send('*** Invalid Password ***')
                } else {
                    let payload = {subject: user._id}
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({token})
            }
        }
    })
})

//verify jwt
function verifyToken(req, res, next){
    if (!req.headers.authorization) {
        return res.status(401).send('Unathorized request')
    }

    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unathorized request')
    }

    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).send('Unathorized request')
    }
    req.userId = payload.subject
    next()
}


router.get('/events', (req,res) => {
    let events = [{
        "_id": "1",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "2",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "3",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "4",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "5",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "6",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      }
    ]
    res.json(events)
})

router.get('/special', (req,res) => {
    let special = [{
        "_id": "1",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "2",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "3",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "4",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "5",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "6",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      }
    ]
    res.json(special)
})


module.exports = router

