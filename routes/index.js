var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var controllers = require('../controllers')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/profile', function(req, res, next){

  if(req.session == null){
    res.render('profile', null)
    return
  }

  if(req.session.token == null){
    res.render('profile', null)
    return
  }

  jwt.verify(req.session.token, process.env.TOKEN_SECRET, function(err, decode){
     if(err){
       req.session.reset()
       res.render('profile', null)
       return
     }
     var user = null
     controllers.profile
     .findById(decode.id)
     .then(function(profile){
       user = profile
    //fetch profile comments
        return controllers.comment.find({profile: profile.id})
     })
     .then(function(comments){
       var data = {
         profile: user,
         comments: comments
       }
        res.render('profile', data)
     })
     .catch(function(err){
       res.render('profile', null)
     })
  })
})

module.exports = router;
