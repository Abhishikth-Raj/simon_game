var buttonColours = ["blue", "green", "red", "yellow"];

var levelPattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
$(document).keypress(function() {
  if (!started) {

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
});

function nextSequence() {
  userClickedPattern = [];
  level++;

  $("#level-title").text("level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  levelPattern.push(randomChosenColour);

  $("." + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function checkAns(currentLevel) {
  if (levelPattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("level cleared");

    if (levelPattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    } else {
      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      startOver();
    }
  }
}

function playSound(name) {
  var audio = new audio("sounds/" + name + ".mp3");
  audio.play();
}

function btnAnimate(id) {
  $("#" + id).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  levelPattern = [];
  started = false;
}
