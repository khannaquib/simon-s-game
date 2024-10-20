
var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];
var gamePatterns = [];

var started = false;
var level = 0;

$(document).keydown(function(){
    if (!started){
        $("#level-title").text("Level" + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);

        playSound(userChosenColour);
        animatePress(userChosenColour);

        checkAnswer(userClickedPattern.length-1);
});
    
function checkAnswer(currentLevel){
    if(gamePatterns[currentLevel] === userClickedPattern[currentLevel]){
            
        console.log("success");
    
        if(userClickedPattern.length === gamePatterns.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
            }
    
    }else {
        console.log("wrong");

        playSound("wrong");
        
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
    
        $("#level-title").text("Game Over, Press Any Key To Restart");
        startOver();
    }
    
}

function nextSequence(){

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    
    var randomChosenColour = buttonColours[randomNumber];
    
    gamePatterns.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColour).removeClass('pressed');
    },100);   
}

function startOver(){
 level = 0;
 started = false;
 gamePatterns = [];
}