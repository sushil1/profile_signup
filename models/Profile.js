var mongoose = require('mongoose')

var ProfileSchema = new mongoose.Schema({
  name: {type:String, default:''},
  email: {type:String, default:''},
  password: {type:String, default:''},
  timestamp: {type:Date, default:Date.now}
})


ProfileSchema.methods.summary = function(){
  var summary = {
    id:this._id.toString(),
    name: this.name,
    email: this.email,
    timestamp:this.timestamp
    }
    return summary
}


module.exports = mongoose.model('ProfileSchema', ProfileSchema)
