var Profile = require('../models/Profile')
var mongoose = require('mongoose')
var Promise = require('bluebird')
var bcrypt = require('bcryptjs')

module.exports = {

  find: function(params, isRaw){
    return new Promise(function(resolve, reject){
      if(isRaw == null){isRaw = false}
      Profile.find(params, function(err, profiles){
        if(err){
          reject(err)
          return
        }
        if(isRaw == true){
          resolve(profiles)
          return
        }
        var list = []
        profiles.forEach(profile=>{
          list.unshift(profile.summary())
        })
        resolve(list)
      })
    })
  },

  findById: function(params, isRaw){
    return new Promise(function(resolve, reject){
      if(isRaw == null){isRaw = false}
      Profile.findById(params, function(err, profile){
        if(err){
          reject(err)
          return
        }
        if(isRaw == true){
          resolve(profile)
          return
        }
        resolve(profile.summary())
      })
    })
  },

  create: function(body, isRaw){
    return new Promise(function(resolve, reject){
      if(isRaw == null){isRaw = false}
      if(body.password != null){
        var password = body.password //plain text
        var hashed = bcrypt.hashSync(password, 10) //hashed
        body['password'] = hashed
      }

      Profile.create(body, function(err, profile){
        if(err){
          reject(err)
          return
        }
        if(isRaw == true){
          resolve(profile)
          return
        }
        resolve(profile.summary())
      })
    })
  }


}
