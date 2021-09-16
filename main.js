song1_status = "";
song2_status = "";

song1 = "";
song2 = "";

rightWristY = 0;
rightWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

leftWristX = 0;
leftWristY = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet is Initialized');
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("LeftWrist score is " + scoreLeftWrist);
        console.log("RightWrist score is " + scoreRightWrist);
        rightWristY = results[0].pose.rightWrist.y;
        rightWristX = results[0].pose.rightWrist.x;

        console.log("RightWrist X = " + rightWristX + " , the RightWrist Y = " + rightWristY);

        leftWristY = results[0].pose.leftWrist.y;
        leftWristX = results[0].pose.leftWrist.x;

        console.log("The LeftWrist X = " + leftWristX + " , LeftWrist Y = " + leftWristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
    fill("#0cf0e4");
    stroke("#0cf0e4");
    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song1.stop();
        if (song2_status == false) {
            song2.play;
            document.getElementById("song-name").innerHTML = "Playing - Beliver";
        }
    }
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        if (song1_status == false) {
            song1.play;
            document.getElementById("song-name").innerHTML = "Playing - Sunflower";
        }
    }
}



function preload() {
    song1 = loadSound("song1.mp3");
    song2 = loadSound("song2.mp3");
}

function play() {
    song1.play();
    song1.setVolume(0.8);
    song1.rate(1);
}