var http = require('http');
var WebSocketServer = require('websocket').server;
const net = require('net');
var fs = require("fs");
var os = require("os");
/*
const accountSid = 'AC106764eeea3ff36b330cabb7a22da37b';
const authToken = 'something';
const client = require('twilio-video')(accountSid, authToken);

client.video.rooms.create({
    enableTurn: true,
    statusCallback: 'http://example.org',
    type: 'peer-to-peer',
    uniqueName: 'DailyStandup'
}).then(room => console.log(room.sid));
*/

const server = http.createServer();
server.listen(8080);

const wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', function (request) {
    const connection = request.accept(null, request.origin);
    connection.on('message', function (message) {
        console.log('Received Message:', message.utf8Data);
        connection.sendUTF('Hi this is WebSocket server!');
    });
    connection.on('close', function (reasonCode, description) {
        console.log('Client has disconnected.');
    });
});

global.insnArr = []
global.insnList = ""

function loadInsns() {
    fs.readFile(__dirname + '\\insns.txt', function (err, data) {
        if (err) throw err;
        global.insnList = data.toString();
        insnArr = insnList.split("\n");
    });
}

function getInsn() {
    var lineNum = Math.floor(Math.random() * insnArr.length);
    printLog(insnArr[lineNum]);
}

function generateRoomName() {
    var name = ""
    for (i = 0; i < 5; i++) {
        var charNum = Math.floor(Math.random() * 62);
        var char = ''
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
    return name
};

function printLog(text) {
    console.log(text);
    res.write(text + os.EOL);
}