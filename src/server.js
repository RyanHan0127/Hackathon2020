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
        console.log(`Received message ${msg} from user ${client}`);
    });
});

server.on('upgrade', function upgrade(request, socket, head) {
    authenticate(request, (err, client) => {
        if (err || !client) {
            socket.destroy();
            return;
        }

        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit('connection', ws, request, client);
        });
    });
});

server.listen(8080);

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