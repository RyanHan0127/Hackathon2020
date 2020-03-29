var WebSocket = require('ws');
const AccessToken = require('twilio').jwt.AccessToken;
const { connect, createLocalTracks } = require('twilio-video');
const VideoGrant = AccessToken.VideoGrant;
const wss = new WebSocket.Server({ port: 8080 });
var fs = require("fs");
var os = require("os");
var apiKeySid = 'SK70f247dc0606d80f0a7232a18e50b99c';
var apiKeySecret = '';
var accountSid = 'AC106764eeea3ff36b330cabb7a22da37b';
var authToken = '';

global.rooms = [];

wss.on('connection', function connection(ws, request, client) {
    ws.on('message', function message(msg) {
        var res = msg.split(" ");
        switch (true) {
            case msg[0] == 1:
                console.log('Received create message');
                var msg = "1" + " " + makeRoom();
                ws.send(msg);
                break;
            case msg[0] == 2:
                console.log('Received join message ' + res[1]);
                var msg = "2" + " " + joinRoom(res[1]);
                ws.send(msg);
                break;
            case msg[0] == 3:
                console.log('Received waiting message: ' + res[1]);
                const videoGrant = new VideoGrant({
                    room: res[1]
                });

                const token = new AccessToken(accountSid, apiKeySid, apiKeySecret);
                token.addGrant(videoGrant);
                token.identity = res[2];

                console.log(token.toJwt());

                createLocalTracks({
                    audio: true,
                    video: { width: 640 }
                }).then(localTracks => {
                    return connect(token.toJwt(), {
                        name: res[1],
                        tracks: localTracks
                    });
                }).then(room => {
                    console.log(`Connected to Room: ${room.name}`);
                });
                var msg = "3" + " " + "Join";
                ws.send(msg);
                break;
            default:
                console.log('Unknown message: ${msg}');
                break;
        }
    });
});

function makeRoom() {
    const client = require('twilio')(accountSid, authToken);

    var rmCode = generateRoomName();
    while (rooms.indexOf(rmCode) != -1) {
        rmCode = generateRoomName();
    }
    client.video.rooms.create({
        enableTurn: true,
        statusCallback: 'http://example.org',
        type: 'peer-to-peer',
        uniqueName: rmCode,
        max_participants: 2,
    }).then(room => console.log(room.sid));
    rooms.push(rmCode);
    return rmCode;
}

function joinRoom(rmCode) {
    if (rooms.indexOf(rmCode) != -1) {
        return rmCode;
    } else {
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