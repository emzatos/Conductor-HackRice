
  var num = 0;
  function changeScore() {
    num++;
    document.getElementById("score").innerHTML = "Score: " + num + "/60";
  }

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  var w = window.innerWidth;
  var h = window.innerHeight;

  canvas.width = w;
  canvas.height = h;

  ctx.fillStyle = '#000000';
  ctx.fillRect(w*.1,0,w*.8,h*.8);

  window.addEventListener('resize', function() {
    ctx.clearRect(0,0,w,h);
    w = window.innerWidth;
    h = window.innerHeight;

    canvas.width = w;
    canvas.height = h;

    ctx.fillRect(w*.1,0,w*.8,h*.8);
  })

  var audio = new Audio('sample-audio1.wav');
  var looper;
  var animations = [down,circle,check,tap];
  var counter = 0;
  function loop() {
    if(counter < 60) {
      ctx.fillStyle= '#000000';
      ctx.fillRect(w*.1,0,w*.8,h*.8);
      var rand = Math.floor(Math.random()*animations.length);
      animations[rand]();
      counter++;
    } else {
      clearInterval(looper);
      audio.pause();
      counter = 0;
      document.getElementById("score").innerHTML = "Score: 0/60";
    }
  }

  function play() {
    audio.load();
    audio.play();
    clearInterval(looper);
    counter = 0;
    num = 0;
    document.getElementById("score").innerHTML = "Score: 0/60";
    loop();
    looper = setInterval(loop, 2000*60/61);
  }

  // MOVE 1
  function down(){
    var down = 0;
    function add(){
      down+=10;
      if (down > h*.7){
        ctx.fillStyle= '#000000';
        ctx.fillRect(w*.1,0,w*.8,h*.8);
        clearInterval(id);
        return;
      }
    ctx.fillStyle= '#000000';
    ctx.fillRect(w*.1,0,w*.8,h*.8);
    ctx.fillStyle = '#0000FF';
    ctx.fillRect(w*.45, down,w*.1,h*.1);
    } 
    var id = setInterval(add, 10);
  }

  // MOVE 2
  function circle(){
    var around = 0;
    ctx.strokeStyle= '#0000FF';
    ctx.fill();
    function round() {
      if(around > 2*Math.PI) {
        ctx.fillStyle= '#000000';
        ctx.fillRect(w*.1,0,w*.8,h*.8);
        clearInterval(id);
        return;
      }
      around+= 0.1;
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.arc(w*.5, h*.4, Math.min(w*.1,h*.1), 0, around);
      ctx.stroke();
    }
    var id = setInterval(round, 10);
  }

  var speedScale = 2;
  // MOVE 3
  function check(){
    var x = w*.15;
    var y = 0;
    ctx.fillStyle='#0000FF';
    function increment(){
      if(x < w/2) {
        x += 3*speedScale;
        y += 2*speedScale;
      }
      else if (x > w/2){
        if(x > w*.825) {
          ctx.fillStyle= '#000000';
          ctx.fillRect(w*.1,0,w*.8,h*.8);
          clearInterval(id);
          return;
        }
        x += 3*speedScale;
        y -= 2*speedScale;
      }
      ctx.fillRect(x, h*.3 + y, w*.01, h*.01);
    }
    var id = setInterval(increment, 5);
  }

  // MOVE 4
  function tap() {
    ctx.strokeStyle= '#0000FF';
    ctx.fill();
    var radius = 0;
    function ring() {
      if(radius < Math.min(w*.15,h*.15))
        radius+=10;
      else {
        ctx.fillStyle= '#000000';
        ctx.fillRect(w*.1,0,w*.8,h*.8);
        clearInterval(id);
        clearInterval(ip);
        return;
      }
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.arc(w*.5, h*.4, radius, 0, 2*Math.PI);
      ctx.stroke();
    }
    function erase() {
      ctx.fillStyle='black';
      ctx.fillRect(w*.1,0,w*.8,h*.8);
    }
    var id = setInterval(ring, 50);
    var ip = setInterval(erase, 100);
  }