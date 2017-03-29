var express = require('express');
var router = express.Router();
var controllers = require('../controllers')

/* GET users listing. */
router.get('/:resource', function(req, res, next) {
  var resource = req.params.resource
  var controller = controllers[resource]
  if(controller == null){
    res.json({
      confirmation:'fail',
      message: 'not found'
    })
    return
  }

    controller
      .find(req.query)
      .then(results=>{
        res.json({
          confirmation:'success',
          result: results
        })
      })
      .catch(err=>{
        res.json({
          confirmation:'fail',
          message: err +''
        })
      })


})

router.get('/:resource/:id', function(req, res, next) {
  var resource = req.params.resource
  var controller = controllers[resource]
  if(controller == null){
    res.json({
      confirmation:'fail',
      message: 'not found'
    })
    return
  }
    var id = req.params.id
    controller
      .findById(id)
      .then(result=>{
        res.json({
          confirmation:'success',
          result: result
        })
      })
      .catch(err=>{
        res.json({
          confirmation:'fail',
          message: err +''
        })
      })
})

router.post('/:resource', function(req, res, next) {
  var resource = req.params.resource
  var controller = controllers[resource]
  if(controller == null){
    res.json({
      confirmation:'fail',
      message: 'not found'
    })
    return
  }
    controller
      .create(req.body)
      .then(result=>{
        res.json({
          confirmation:'success',
          result: result
        })
      })
      .catch(err=>{
        res.json({
          confirmation:'fail',
          message: err +''
        })
      })
})



module.exports = router;
