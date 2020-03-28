var http = require('http');
var fs = require("fs");
var os = require("os");


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