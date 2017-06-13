var express = require('express');
var io = require('socket.io');
var router = express.Router();
var server =  express().listen(99);
var ws = io.listen(server);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'chat' });
});
Connect();
function Connect(){

    //server
    ws.on('connection', function(client){
      console.log("connection.....");
      client.on('join', function(msg){
          if(checkNickname(msg)){
            client.emit('nickname','nickname repeat!');
          }else{
            client.nickname =msg;
            ws.sockets.emit('announcement', 'system', msg+'join chat!');
        }
      })
    });

    function checkNickname(name){
        for(var k in ws.sockets.sockets){
          if(ws.sockets.sockets.hasOwnProperty(k)){
            if(ws.sockets.sockets[k] && ws.sockets.sockets[k].nickname ==name){
                return true;
            }
          }
        }
        return false;
    }
}


module.exports = router;
