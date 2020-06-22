
// var express = require("express");
// var app = express();
// var server = require("http").createServer(app);
// var io = require("socket.io").listen(server);
// var fs = require("fs");
// server.listen(process.env.PORT || 3000);
// //server bat dau ket noi
// io.sockets.on('connection', function (socket) {
	
// 	console.log("Co nguoi connect ne");
	
	
	
	
	
//   });

var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var fs = require("fs");
server.listen(process.env.PORT || 3000);
app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");	
});
var taikhoan = [];
io.sockets.on('connection', function (socket) {
	
	console.log("Co nguoi connect ne");
	
	socket.on('client-gui-username', function (data){
		var keqtqua= false;
		if(taikhoan.indexOf(data)>-1){
			console.log("da ton tai ="+data);
			keqtqua = false;
		}else{
			taikhoan.push(data);
			socket.un = data;
			console.log("add thanh cong");
			keqtqua= true;
			io.sockets.emit('server-gui-taikhoan', { danhsach: taikhoan });
		}
		socket.emit('ketquadangky', { noidung: keqtqua});
		console.log("vua them tai khoan="+ taikhoan[0]);
	});
	socket.on('client-gui-tinchat', function (ndchat){
		console.log(socket.un+":"+ ndchat);
		io.sockets.emit('server-gui-tin-chat', { tinchat:socket.un +":"+ ndchat });
		
	});
	// io.sockets.emit('serverguitinnhan', { noidung: "okbaby" });
	
	// socket.on('servernhantinnhan', function (data) {
	//   // emit toi tat ca moi nguoi
	//   io.sockets.emit('serverguitinnhan', { noidung: data });
	  
	//   // emit tới máy nguoi vừa gửi
	//   socket.emit('serverguitinnhan', { noidung: data });
	// });
	
  });
  

// app.get("/", function(req, res){
// 	res.sendFile(__dirname + "/index.html");	
// });
