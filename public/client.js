const WebSocket = require('websocket');

const socket = new WebSocket('ws://localhost:8080');
var createRoom = document.getElementById("something");
var joinRoom = document.getElementById("something");

createRoom.onclick = function () {
    socket.send("Create");
}

joinRoom.onclick = function () {
    var msg = {
        text: document.getElementById("text box")
    };
    socket.send(msg);
}

socket.onopen = function (event) {
    console.log("Connected");
}

socket.onmessage = function (event) {
    console.log(event.data);
};