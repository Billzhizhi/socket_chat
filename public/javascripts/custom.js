/**
 * Created by admin on 2017/6/12.
 */
window.onload = function(){
    console.log("loading page...");
    var socket = io.connect('http://localhost:9090');
    socket.on('message', function(data){
        if(data.message){
            var html ='';
            for(var i=0;i<data.message.length;i++){
                html+= data.message[i];
            }
            document.getElementById("headLine").innerHTML=html;
        }
    });

    document.getElementById('submit').onclick =function(){
        var ipt =document.getElementById("iptValue");
        var mgs =ipt.value;
        socket.emit('send',{'message':mgs});
        ipt.value='';

    }


}