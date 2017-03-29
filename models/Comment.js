var mongoose = require('mongoose')

var CommentSchema = new mongoose.Schema({
  profile: {type:String, default:''},
  text: {type:String, default:''},
  timestamp: {type:Date, default:Date.now}
})


CommentSchema.methods.summary = function(){
  var summary = {
    id:this._id.toString(),
    profile: this.profile,
    text: this.text,
    timestamp:this.timestamp
    }
    return summary
}


module.exports = mongoose.model('CommentSchema', CommentSchema)
