const WebSocket = require('websocket');

const socket = new WebSocket('ws://localhost:8080');
var createRoom = document.getElementById("something");
var joinRoom = document.getElementById("something");

var video = document.getElementById('video');

// Get access to the camera!
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
        //video.src = window.URL.createObjectURL(stream);
        video.srcObject = stream;
        video.play();
    });
}

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