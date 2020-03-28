var http = require('http');
var fs = require("fs");
var os = require("os");

const accountSid = 'AC106764eeea3ff36b330cabb7a22da37b';
const authToken = 'something';
const client = require('twilio')(accountSid, authToken);

client.video.rooms.create({
    enableTurn: true,
    statusCallback: 'http://example.org',
    type: 'peer-to-peer',
    uniqueName: 'DailyStandup'
}).then(room => console.log(room.sid));

global.insnArr = []
global.insnList = ""

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  loadInsns();

  function loadInsns(){
    fs.readFile(__dirname + '\\insns.txt', function(err, data) {
      if (err) throw err;
      global.insnList = data.toString();
      insnArr = insnList.split("\n");
      printLog(insnList)
      for(i = 0; i < insnArr.length; i++){
        printLog(insnArr[i]);
      }
   });
  }

  function getInsn(){
    var lineNum = Math.floor(Math.random() * insnArr.length);
    printLog(insnArr[lineNum]);
  }

  function printLog(text){
    console.log(text);
    res.write(text + os.EOL);
  }
}).listen(8080);