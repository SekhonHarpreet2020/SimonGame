var buttonColors = ["red","blue","green","yellow"];

var gamePattern =[];
var userClickedPattern = [];
var level=0;
var started = false;

$(document).on("keypress",function(){
     if(!started)
     {
        $("h1").text("Level "+level);
        nextSequence();
        started=true;
    }
});



function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4 );
    var randomChosenColor = buttonColors[randomNumber];
     gamePattern.push(randomChosenColor);
    
     $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
     playSound(randomChosenColor);
    
    
}





$(".btn").on("click", function(){
    
    var clickedButton = this.id;
    userClickedPattern.push(clickedButton);
    console.log(userClickedPattern);


    playSound(clickedButton);
    animatePress(clickedButton);

    checkAnswer(userClickedPattern.length-1);


    
    
});






function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){

        console.log("success");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }

    }else{
        console.log("wrong");
        $(document).addClass("game-over");
        playSound("wrong");
        $("#level-title").text("Game over.Press any key to start");
        setTimeout(function(){
            $(document).removeClass("game-over")
        },200);
        startOver();
        

       
    }

}

function startOver(){
    level=0;
    gamePattern=[];
    started = false;
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    var currentClass = "."+ currentColor;
    $(currentClass).addClass("pressed");
    setTimeout(function(){
        $(currentClass).removeClass("pressed"),200
    });

}
