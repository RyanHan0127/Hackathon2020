var WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
var fs = require("fs");
var os = require("os");

global.rooms = [];

wss.on('connection', function connection(ws, request, client) {
    ws.on('message', function message(msg) {
        switch (true) {
            case msg[0] == 1:
                console.log('Received create message');
                var msg = "1" + " " + makeRoom();
                ws.send(msg);
                break;
            case msg[0] == 2:
                console.log('Received join message ' + msg[1]);
                var msg = "2" + " " + joinRoom(msg[1]);
                ws.send(msg);
                break;
            case msg[0] == 3:
                console.log('Received create waiting message');
                var msg = "2" + " " + joinRoom(msg[1]);
                break;
            default:
                console.log('Unknown message: ${msg}');
                break;
        }
    });
});

function makeRoom() {
    const accountSid = 'AC106764eeea3ff36b330cabb7a22da37b';
    const authToken = 'something';
    const client = require('twilio')(accountSid, authToken);

    var rmCode = generateRoomName();
    while (rooms.indexOf(rmCode) != -1) {
        rmCode = generateRoomName();
        console.log(rooms.indexOf(rmCode))
    }
    client.video.rooms.create({
        enableTurn: true,
        statusCallback: 'http://example.org',
        type: 'peer-to-peer',
        uniqueName: rmCode,
    }).then(room => console.log(room.sid));
    rooms.push(rmCode);
    return rmCode;
}

function joinRoom(rmCode) {
    if (rooms.indexOf(rmCode) != -1) {
        return rmCode;
    }
    else {
        return "";
    }
}

function generateRoomName() {
    var name = ""
    for (i = 0; i < 5; i++) {
        var charNum = Math.floor(Math.random() * 62);
        switch (true) {
            case charNum <= 9: //Number
                name += charNum.toString();
                break;
            case charNum <= 35: //Uppercase
                charNum += 55;
                name += String.fromCharCode(charNum);
                break;
            case charNum <= 61: //Lowercase
                charNum += 61;
                name += String.fromCharCode(charNum);
                break;
            default:
                break;
        }
    }
    return name;
};