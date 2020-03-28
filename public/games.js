var video = document.getElementById('video');

// Get access to the camera
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
    video.srcObject = stream;
    video.play();
  });
}

// 2 minute timer
var countDownDate = new Date().getTime() + 2*60*1000;
// Update the count down every 1 second
var x = setInterval(function() {

  // current time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down time
  var distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="timer"
  document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";
    
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("timer").innerHTML = "Time is gone! &#x1F980 &#x1F980 &#x1F980";
  }
}, 1000);