 
//create functions for generating movement


// Store frame for motion functions
document.body.style.background='black';
var score=0;
var currentMotion = 1;
var previousFrame = null;
var paused = false;
var pauseOnGesture = false;

var previousMotion = 1;
// Define movement

var hasBegun = false;

//FIRST MOTION
var firstMove = new Map();
firstMove.set("top", false);
firstMove.set("bottom", false);
//first point
var FIRST_X_MIN = -70
var FIRST_X_MAX = 100

var FIRST_Y_TOP_MIN = 220
var FIRST_Y_TOP_MAX = 260
//second point
var FIRST_Y_BOT_MIN = 35
var FIRST_Y_BOT_MAX = 105

//SECOND MOTION
var secondMove = false;
var numTimesSecond = 0;

//THIRD MOTION

//first point
var THIRD_X_TOP_LEFT_MIN = -135
var THIRD_X_TOP_LEFT_MAX = -35

var THIRD_Y_TOP_LEFT_MIN = 115
var THIRD_Y_TOP_LEFT_MAX = 205



//second point
var THIRD_X_BOTTOM_MIN = -50
var THIRD_X_BOTTOM_MAX = 50

var THIRD_Y_BOTTOM_MIN = 50
var THIRD_Y_BOTTOM_MAX = 80

//third point
var THIRD_X_TOP_RIGHT_MIN = 35
var THIRD_X_TOP_RIGHT_MAX = 135

var THIRD_Y_TOP_RIGHT_MIN = 115
var THIRD_Y_TOP_RIGHT_MAX = 205

var thirdMove = new Map();
thirdMove.set("topl", false);
thirdMove.set("bottom", false);
thirdMove.set("topr", false);

//fourh point
var fourthMotion = false;
var numTimesFourth = 0;







// Setup Leap loop with frame callback function
var controllerOptions = {enableGestures: true};

// to use HMD mode:
// controllerOptions.optimizeHMD = true;

Leap.loop(controllerOptions, function(frame) {




  //CHECK MOVES

  //MOVE 1
  if(firstMove.get("top") && firstMove.get("bottom")){
    console.log("YOU did move 1");
    firstMove.set("top", false);
    firstMove.set("bottom", false);
    if(currentMotion == 1){
      newOne();
    }
  }

  //MOVE 2
  if(secondMove){
    console.log("YOU did move 2 " + numTimesSecond);
    secondMove = false;
    if(currentMotion == 2){
      newOne();
    }
  }

  //MOVE 3
  if(thirdMove.get("topl") && thirdMove.get("bottom") && thirdMove.get("topr")){
    console.log("YOU did move 3");
    thirdMove.set("topl", false);
    thirdMove.set("topr", false);
    thirdMove.set("bottom", false);
    if(currentMotion == 3){
      newOne();
    }
  }
  //MOVE 4
  if(fourthMotion){
    console.log("YOU did move 4 " + numTimesFourth);
    fourthMotion = false;
    if(currentMotion == 4){
      newOne();
    }
  }


  

  // Display Hand object data

  var nextStep = false;
  var X_MIN = -10
  var X_MAX = 40
  var Y_MIN = 90
  var Y_MAX = 155
  var Z_MIN = 10
  var Z_MAX = 150

  if (frame.hands.length > 0) {
    for (var i = 0; i < frame.hands.length; i++) {
      var hand = frame.hands[i];


      
      
      if(hand.palmPosition[0] >= X_MIN && hand.palmPosition[0] <= X_MAX &&
       hand.palmPosition[1] >= Y_MIN && hand.palmPosition[1] <= Y_MAX &&
       hand.palmPosition[2] >= Z_MIN && hand.palmPosition[2] <= Z_MAX){


        nextStep = true;
      hasBegun = true;
    } 
    //FIRST MOTION
    if(!firstMove.get("bottom") && hasBegun && !firstMove.get("top") && hand.palmPosition[1]  > FIRST_Y_TOP_MIN && hand.palmPosition[1] < FIRST_Y_TOP_MAX && hand.palmPosition[0] > FIRST_X_MIN && hand.palmPosition[0] < FIRST_X_MAX){
      console.log("TOP MET");
      firstMove.set("top", true)
    }
    if(!firstMove.get("bottom") && hasBegun &&firstMove.get("top") && hand.palmPosition[1]  > FIRST_Y_BOT_MIN && hand.palmPosition[1] < FIRST_Y_BOT_MAX){
      console.log("BOT MET");
      firstMove.set("bottom", true);
    }

    //SECOND MOTIION
    if(frame.valid && frame.gestures.length > 0 && hasBegun){
      frame.gestures.forEach(function(gesture){
        if(gesture.type == "circle"){

          if(gesture.state == "stop"){
            secondMove = true;
            numTimesSecond+=1;

          }
        }
        
      }
      );
    }

  //THIRD MOTIION

  if(!thirdMove.get("bottom") && hasBegun && !thirdMove.get("topl") && !thirdMove.get("topr") && hand.palmPosition[0]  > THIRD_X_TOP_LEFT_MIN && hand.palmPosition[0] < THIRD_X_TOP_LEFT_MAX && hand.palmPosition[1] > THIRD_Y_TOP_LEFT_MIN &&
    hand.palmPosition[1] < THIRD_Y_TOP_LEFT_MAX){
    console.log("TOP LEFT MET");
  thirdMove.set("topl", true)
}

if(!thirdMove.get("bottom") && hasBegun && thirdMove.get("topl") && !thirdMove.get("topr") && hand.palmPosition[0]  > THIRD_X_BOTTOM_MIN && hand.palmPosition[0] < THIRD_X_BOTTOM_MAX && hand.palmPosition[1] > THIRD_Y_BOTTOM_MIN &&
  hand.palmPosition[1] < THIRD_Y_BOTTOM_MAX){
  console.log("BOTTOM MET");
thirdMove.set("bottom", true)
}

if(thirdMove.get("bottom") && hasBegun && thirdMove.get("topl") && !thirdMove.get("topr") && hand.palmPosition[0]  > THIRD_X_TOP_RIGHT_MIN && hand.palmPosition[0] < THIRD_X_TOP_RIGHT_MAX && hand.palmPosition[1] > THIRD_Y_TOP_RIGHT_MIN &&
  hand.palmPosition[1] < THIRD_Y_TOP_RIGHT_MAX){
  console.log("TOP RIGHT MET");
thirdMove.set("topr", true)
}

  //FOURTH MOVE
  if(frame.valid && frame.gestures.length > 0 && hasBegun){
    frame.gestures.forEach(function(gesture){
      if(gesture.type == "screenTap" || gesture.type == "keyTap"){


        fourthMotion = true;
        numTimesFourth+=1;


      }

    }
    );
  }

  
  

  

  // // Store frame for motion functions
  previousFrame = frame;

}
}
});


function newOne(){
  score+=1;

}


 

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  var w = window.innerWidth;
  var h = window.innerHeight;

  canvas.width = w;
  canvas.height = h;

  ctx.fillStyle = '#000000';
  ctx.fillRect(w*.0,0,w*.95,h*.95);


  window.addEventListener('resize', function() {
    ctx.clearRect(0,0,w,h);
    w = window.innerWidth;
    h = window.innerHeight;

    canvas.width = w;
    canvas.height = h;

    ctx.fillRect(0,0,w,h);
  })
  ctx.font = 'bold 60px Raleway'
  var audio = new Audio('sample-audio1.wav');
  var looper;
  var animations = [down,circle,check,tap];
  var counter = 0;
  function loop() {
    if(counter < 180) {
      
      ctx.fillStyle= '#000000';
      ctx.strokeStyle='black';
      ctx.fillRect(0,0,w,h);
      ctx.font = 'bold 60px Raleway'
      ctx.fillStyle = "white"
      ctx.font = 'bold 60px Raleway'
      
      
      ctx.fillText(score, 32.5, 70.5);
      var rand = Math.floor(Math.random()*animations.length);
      currentMotion= rand+1;
      animations[rand]();
      counter++;
    } else {
      clearInterval(looper);
      audio.pause();
      counter = 0;

    }
  }

  play();

  function play() {
    audio.load();
    audio.play();
    clearInterval(looper);
    counter = 0;
    num = 0;
    
    loop();
    looper = setInterval(loop, 1000*60/61);
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
    ctx.fillStyle= '#000000';
    ctx.strokeStyle= '#0000FF';
    //ctx.fill();
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
    ctx.fillStyle= '#000000';
    ctx.strokeStyle= '#0000FF';
    //ctx.fill();
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