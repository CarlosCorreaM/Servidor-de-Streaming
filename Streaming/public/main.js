var canvas = document.getElementById('preview');
        var context = canvas.getContext('2d');

        canvas.width = 400;
        canvas.height = 320;

        context.width = 400;
        context.height = 320;


        video = document.getElementById('video');

        var socket = io();

        function logger(msg) {
            $('#logger').text(msg);
        }

        function loadCam(stream) {
            video.src = window.URL.createObjectURL(stream);
            
            logger('camara cargada correctamente');
        }

        function loadFail() {
            logger('camara no conectada');
        }

        function viewVideo(video, context) {
            context.drawImage(video,0,0,context.width,context.height);
            socket.emit('stream',canvas.toDataURL('image/webp'));
        }

        $(function () {

            navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msgGetUserMedia);

            if(navigator.getUserMedia){
                //carga correcta
                navigator.getUserMedia({video : true/*, audio : true*/},loadCam,loadFail)
            }

            setInterval(function () {
                viewVideo(video,context);
            },50)
        });