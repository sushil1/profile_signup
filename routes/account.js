var express = require('express')
var router = express.Router()
var controllers = require('../controllers')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

router.get('/logout', function(req, res, next){

  req.session.reset()
  res.redirect('/')
  return
})

router.get('/currentuser', function(req, res, next){
  if(req.session == null){
    res.json({
      confirmation:'success',
      result: 'no session'
    })
    return
  }

  if(req.session.token == null){
    res.json({
      confirmation:'success',
      result: 'no user in the session'
    })
    return
  }

  jwt.verify(req.session.token, process.env.TOKEN_SECRET, function(err, decode){
     if(err){
       req.session.reset()
       res.json({
         confirmation: 'fail',
         message: 'Invalid token'
       })
       return
     }
     controllers.profile
     .findById(decode.id)
     .then(function(profile){
       res.json({
         confirmation:'success',
         user: profile
       })
     })
     .catch(function(err){
       res.json({
         confirmation:'fail',
         message: err
       })
     })
  })


})



router.post('/:action', function(req, res, next){

  var action = req.params.action
  if(action == 'login'){
    var credentials = {
      email: req.body.email,
      password: req.body.password
    }
    controllers.profile
    .find({email: credentials.email}, true)
    .then(profiles =>{
      if(profiles.length == 0){
        res.json({
          confirmation:'fail',
          message: 'profile not found'
        })
        return
      }
      var profile = profiles[0]
      var comparePassword = bcrypt.compareSync(credentials.password, profile.password)
        if(comparePassword == false){
          req.session.reset()
          res.json({
            confirmation: 'fail',
            message: 'wrong password'
          })
          return
        }
            //give a token to the session
            //req.session.user = profile._id.toString()
            req.session.token = jwt.sign({id: profile._id.toString()}, process.env.TOKEN_SECRET, {expiresIn:4000})
            res.redirect('/profile')

    })
    .catch(err=>{
      console.log(err+' Error logging in')
    })

  }
  if(action == 'register'){
      controllers.profile
        .create(req.body)
        .then(profile=>{
          //register for the session give the token and redirect to /profile
          req.session.token = jwt.sign({id:profile.id}, process.env.TOKEN_SECRET, {expiresIn:4000})
          res.redirect('/profile')
          return
        })
        .catch(err=>{
          next(err)
        })

  }

  if(action == 'comment'){
    //commentData['profile'] = decode.id
    if(req.session == null){
      res.json({
        confirmation: 'fail',
        message: 'not session'
      })
      return
    }
    if(req.session.token == null){
      res.json({
        confirmation: 'fail',
        message: 'not logged in'
      })
      return
    }

    var token = req.session.token
    jwt.verify(token, process.env.TOKEN_SECRET, function(err, decode){
      if(err){
        req.session.reset()
        res.json({
          confirmation: 'fail',
          message: 'invalid token'
        })
        return
      }
      var commentData = req.body
      commentData['profile'] = decode.id
      controllers.comment
        .create(commentData)
        .then(function(result){
          res.redirect('/profile')
        })
        .catch(function(err){

        })
    })



  }

})

module.exports = router
