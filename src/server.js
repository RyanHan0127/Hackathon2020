var http = require('http');
var WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
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
//const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', function connection(ws, request, client) {
    ws.on('message', function message(msg) {
        console.log('Received message ${msg}');
    });
});


global.insnArr = [];
global.insnList = "";
global.rooms = [];

class Room {
    constructor(rmName, client1) {
        this.name = rmName;
        this.p1 = client1;
        this.p2 = ""
    }
    join(client2) {
        try {
            if (client2 != "") throw "Room full"
            this.p2 = client2
        }
        catch (err) {
            printLog(err);
        }
    }
}

function loadInsns() {
    fs.readFile(__dirname + '\\insns.txt', function (err, data) {
        if (err) throw err;
        global.insnList = data.toString();
        insnArr = insnList.split("\n");
    });
}

function getInsn() {
    var lineNum = Math.floor(Math.random() * insnArr.length);
    return insnArr[lineNum]
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
    return name
};

function printLog(text) {
    console.log(text);
    res.write(text + os.EOL);
}