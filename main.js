 song = "";
 leftWristX = 0;
 leftWristY = 0;
 rightWristX = 0;
 rightWristY = 0;


function preload(){

   song = loadSound("music.mp3")
 }
 

function setup(){

canvas = createCanvas(600, 500);
canvas.position(250,190);
video = createCapture(VIDEO)
video.size(600,500);
video.hide();

posenet  = ml5.poseNet(video,modelLoaded);
posenet.on("pose",gotPoses);
}

function modelLoaded(){

    console.log("model loaded");
}

function gotPoses(result){
    
    console.log(result);

    leftWristX = result[0].pose.leftWrist.x;
    leftWristY = result[0].pose.leftWrist.y;
    rightWristX = result[0].pose.rightWrist.x;
    rightWristY = result[0].pose.rightWrist.y;

    }

function draw(){

    image(video, 0, 0, 600, 500);

    fill("red");
    circle(leftWristX,leftWristY,40);
    circle(rightWristX,rightWristY,40);
    
    convertNumber = Number(leftWristY);
    removeDecimal = floor(convertNumber);
    volume = removeDecimal / 500;
    document.getElementById("volumeValue").innerHTML = volume;
    song.setVolume(volume);

    if(rightWristY > 0 && rightWristY < 100){
        document.getElementById("speedValue").innerHTML = "0.5 X ";
        song.rate(0.5);

    }

    if(rightWristY > 100 && rightWristY < 200){
        document.getElementById("speedValue").innerHTML = "1.0";
        song.rate(1.0);
    }

    if(rightWristY > 200 && rightWristY < 300){
        document.getElementById("speedValue").innerHTML = "1.5";
        song.rate(1.5);
    }

    if(rightWristY > 300 && rightWristY < 400){
        document.getElementById("speedValue").innerHTML = "2.0";
        song.rate(2.0);
    }

    if(rightWristY > 400 && rightWristY < 500){
        document.getElementById("speedValue").innerHTML = "2.5";
        song.rate(2.5);
    }
}






function playSong(){
    song.setVolume(1);
    song.rate(1)
    song.play();
}