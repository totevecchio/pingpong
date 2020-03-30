<!doctype html>
<html>
    <head>
        <title>Pong</title>
        <script src='js/functions.js'> </script>
        <script src='js/dibujante.js'> </script>
        <script src='js/balls.js'> </script>
        <script src='js/paddle.js'> </script>
        <script src='js/player.js'> </script>
        <script src='js/computer.js'> </script>
        <script src="js/pong.js"></script>
        <style type="text/css">
            body {
                margin: 0 auto;
                width: 400px;
            }
        </style>
    </head>
    <body>
    </body>
    <script type="text/javascript">
        var pingpong = new Pong();
        pingpong.difficulty = 1;
        pingpong.width = 400;
        pingpong.height = 300;
        pingpong.paddlewidth = 60;
        pingpong.Init();
    </script>
</html>
