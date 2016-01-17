
//create functions for generating movement


// Store frame for motion functions


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
    if(document.getElementById("currentMotion").value == 1){
      newOne();
    }
  }

  //MOVE 2
  if(secondMove){
    console.log("YOU did move 2 " + numTimesSecond);
    secondMove = false;
    if(document.getElementById("currentMotion").value == 2){
      newOne();
    }
  }

  //MOVE 3
  if(thirdMove.get("topl") && thirdMove.get("bottom") && thirdMove.get("topr")){
    console.log("YOU did move 3");
    thirdMove.set("topl", false);
    thirdMove.set("topr", false);
    thirdMove.set("bottom", false);
    if(document.getElementById("currentMotion").value == 3){
      newOne();
    }
  }
  //MOVE 4
  if(fourthMotion){
    console.log("YOU did move 4 " + numTimesFourth);
    fourthMotion = false;
    if(document.getElementById("currentMotion").value == 4){
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
  document.getElementById("currentMotion").value = Math.floor((Math.random() * 4) + 1);

}

