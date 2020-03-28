var video = document.getElementById('video');

// Get access to the camera
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
        video.src = window.URL.createObjectURL(stream);
        video.srcObject = stream;
        video.play();
    });
}