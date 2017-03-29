var Comment = require('../models/Comment')
var mongoose = require('mongoose')
var Promise = require('bluebird')

module.exports = {

  find: function(params, isRaw){
    return new Promise(function(resolve, reject){
      if(isRaw == null){isRaw = false}
      Comment.find(params, function(err, comments){
        if(err){
          reject(err)
          return
        }
        if(isRaw == true){
        resolve(comments)
        return
        }
        var list = []
        comments.forEach(comment=>{
          list.unshift(comment.summary())
        })
        resolve(list)
      })
    })
  },

  findById: function(params, isRaw){
    return new Promise(function(resolve, reject){
      if(isRaw == null){isRaw = false}
      Comment.findById(params, function(err, comment){
        if(err){
          reject(err)
          return
        }
        if(isRaw == true){
        resolve(comment)
        return
        }
        resolve(comment.summary())
      })
    })
  },

  create: function(body, isRaw){
    return new Promise(function(resolve, reject){
      if(isRaw == null){isRaw = false}
      Comment.create(body, function(err, comment){
        if(err){
          reject(err)
          return
        }
        if(isRaw == true){
        resolve(comment)
        return
        }
        resolve(comment.summary())
      })
    })
  }


}
