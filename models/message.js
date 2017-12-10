var mongoose = require('mongoose');
var Message = mongoose.model('Message',{
   name: String,
   text : String,
   time : String
});
Message.remove({}, () => {
    console.log('removed all');
})
module.exports = {Message}