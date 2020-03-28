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
   });
  }

  function getInsn(){
    var lineNum = Math.floor(Math.random() * insnArr.length);
    printLog(insnArr[lineNum]);
  }

  function generateRoomName(){
    var name = ""
    for(i = 0; i < 5; i++){
      var charNum = Math.floor(Math.random() * 62);
      var char = ''
      switch(true){
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

  function printLog(text){
    console.log(text);
    res.write(text + os.EOL);
  }
  
}).listen(8080);