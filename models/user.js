var mongoose = require('mongoose');
var User = mongoose.model('User',{
            sid: String,
            name: String
});
User.remove({}, () => {
    console.log('removed all');
})
module.exports = {User}