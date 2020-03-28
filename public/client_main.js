//var WebSocket = require('websocket').client;

//var socket = new WebSocket('ws://localhost:8080');

function createRoomButton() {
    console.log("Clicked button");
}

function joinRoomButton() {
    console.log("Clicked button");
}

/*
joinRoom.onclick = function () {
    var msg = {
        text: document.getElementById(room_code)
    };
    socket.send(msg);
}

socket.onopen = function (event) {
    console.log("Connected");
}

socket.onmessage = function (event) {
    console.log(event.data);
};
*/