
var user = new String
var msgObj = [];
var messageCount = 0
$(document).ready(()=> {
    getName();
    getNewMessages();
    updateScrollbar();
    $('.message-submit').click(function() {
        insertMessage();
        });
        
        $(window).on('keydown', function(e) {
        if (e.which == 13) {
        insertMessage();
        return false;
        }
        })
        setInterval(()=>{
            getNewMessages();
        },1000)
})
var getName = () => {
    $.get("/getName", (data,status)=>{
        user =  data.name;
    })
}

var insertMessage = ()=> {
    msg = $('.message-input').val();
    if ($.trim(msg) == '') {
        return false;
    }
    $('.message-input').val(null);
    $.post('/newMessage',{txtmsg: msg}).then((msg)=>{
            getNewMessages();
       updateScrollbar();
    }).catch((err)=>{
        console.log(err);
    })

}


// var $messages = $('.messages-content'),
// d, h, m,
// i = 0;

// $(window).load(function() {
// $messages.mCustomScrollbar();
// setTimeout(function() {
// fakeMessage();
// }, 100);
// });

var  updateScrollbar = () => {
    $('.chat').scrollTop(1E10);
// $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
// scrollInertia: 10,
// timeout: 0
// });

}

var getNewMessages = () =>{
    $.get("/getNewMessages", (data,status)=>{
        var dataLen = data.length 
        if(dataLen>msgObj.length){
            for(let i = messageCount;i<dataLen;i++){
                msgObj.push(data[i]);
            }
            fun();
        }
    });
    
}
var fun = () =>{
    var username = new String
    var len = msgObj.length
        for(let i = messageCount;i<len;i++){
            element = msgObj[i];
         if(element.name === user ){
             cls = "self"
             username = ''
         }else{
             cls = "other"
             username = ` <div class="user">${element.name}</div>    `
         }
         var msg =` <li class=${cls}>
         <div class="msg">
         ${username}
     <p>${element.text}</p>
           <time>${element.time}</time>
         </div>
       </li>`
       
         $(msg).appendTo($('.chat'))
        }
    messageCount = len
}
// var fillMessages = ()=> {
//     $.get("/getNewMessages", (data,status)=>{
//         messageCount = data.length;
//     });
// }


// setTimeout(function() {
// $('.message.loading').remove();
// $('<div class="message new"><figure class="avatar"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg" /></figure>' + Fake[i] + '</div>').appendTo($('.mCSB_container')).addClass('new');
// setDate();
// updateScrollbar();
// i++;
// }, 1000 + (Math.random() * 20) * 100);

// }