
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level=0;
var starting=false;
$(document).keypress(function(){
  if(!starting){
  $("#level-title").text("Level " + level);
  nextSequence();
  starting=true;
  }
}); //donee

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  } else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
  
  
  startOver();
  }
}
function startOver(){
  level=0;
  gamePattern=[];
  starting=false;
}

$(".btn").click(function(){
  
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour)
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
  userClickedPattern=[];

  level++;
  $("#level-title").text("Level " + level);
  
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  // animatePress(randomChosenColour);
  
  
}

function playSound(Colour){
  var audio = new Audio("sounds/" + Colour + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  },100)
}

