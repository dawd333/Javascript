var canvas = document.getElementById("plansza");
var ctx = canvas.getContext("2d");
var x;
var y;
var ballRadius = 10;
var ballDelta;
var rectSize = 30;
var rightPressed;
var leftPressed;
var downPressed;
var upPressed;
var squaresAmount;
var xValues;
var yValues;
var counterValues;
var alreadyHit;
var lifeTime;
var time;
var score;
var stageTime;
var stages;
var idInterval;
var idTime;
var idGame;
var idAnimation;
var nazwisko;

function keyDownHandler(event) {
    if (event.keyCode == 39) {
        rightPressed = true;
    }
    if (event.keyCode == 37) {
        leftPressed = true;
    }
    if (event.keyCode == 40) {
        downPressed = true;
    }
    if (event.keyCode == 38) {
        upPressed = true;
    }
}

function keyUpHandler(event) {
    if (event.keyCode == 39) {
        rightPressed = false;
    }
    if (event.keyCode == 37) {
        leftPressed = false;
    }
    if (event.keyCode == 40) {
        downPressed = false;
    }
    if (event.keyCode == 38) {
        upPressed = false;
    }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function squaresBegin() {
    xValues = [];
    yValues = [];
    counterValues = [];
    alreadyHit = [];
    lifeTime = [];
    for (var i = 0; i < squaresAmount; i++) {
        xValues.push(Math.floor(Math.random() * (canvas.width - rectSize)));
        yValues.push(Math.floor(Math.random() * (canvas.height - rectSize)));
        counterValues.push(20);
        alreadyHit.push("false");
        lifeTime.push(Math.floor(Math.random() * 20) + 20);
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function drawSquares() {
    for (var i = 0; i < squaresAmount; i++) {
        ctx.beginPath();
        ctx.rect(xValues[i], yValues[i], rectSize, rectSize);
        if (counterValues[i] >= 0) {
            if (alreadyHit[i] == "true") {
                ctx.fillStyle = "#90EE90";
            } else {
                ctx.fillStyle = "green";
            }
        } else {
            if (alreadyHit[i] == "true") {
                ctx.fillStyle = "#EE9090";
            } else {
                ctx.fillStyle = "red";
            }

        }
        ctx.fill();
        ctx.closePath();
        ctx.font = "14px Georgia";
        ctx.fillStyle = "black";
        ctx.fillText(counterValues[i].toString(), xValues[i] + 8, yValues[i] + 20)
    }
}

function checkHit() {
    for (var i = 0; i < squaresAmount; i++) {
        if (x > xValues[i] && x < xValues[i] + rectSize && y > yValues[i] && y < yValues[i] + rectSize && alreadyHit[i] == "false") {
            alreadyHit[i] = "true";
            score += counterValues[i];
            var pointsSpan = document.getElementById("punkty");
            pointsSpan.textContent = score.toString();
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawSquares();
    checkHit();

    if (rightPressed) {
        if (x + ballDelta > canvas.width) {
            x = 0;
        } else {
            x += ballDelta;
        }
    }
    if (leftPressed) { //tu przy wcisnieciu 3 sie cos psuje
        if (x - ballDelta < 0) {
            x = canvas.width;
        } else {
            x -= ballDelta;
        }
    }
    if (upPressed) { //tu rowniez przy wcisnieciu 3 sie cos psuje
        if (y - ballDelta < 0) {
            y = canvas.height;
        } else {
            y -= ballDelta;
        }
    }
    if (downPressed) {
        if (y + ballDelta > canvas.height) {
            y = 0;
        } else {
            y += ballDelta;
        }
    }
    idAnimation = requestAnimationFrame(draw);
}

function decrease() {
    for (var i = 0; i < squaresAmount; i++) {
        if (lifeTime[i] == 0) {
            xValues[i] = (Math.floor(Math.random() * (canvas.width - rectSize)));
            yValues[i] = (Math.floor(Math.random() * (canvas.height - rectSize)));
            counterValues[i] = 20;
            alreadyHit[i] = "false";
            lifeTime[i] = (Math.floor(Math.random() * 20) + 20);
        }
        counterValues[i]--;
        lifeTime[i]--;
    }
}

function decreaseTime() {
    stageTime--;
    var timeSpan = document.getElementById("czas");
    timeSpan.textContent = stageTime;
}

function stage() {
    if (stages < 3) {
        if (stages != 0) {
            window.clearInterval(idInterval);
            window.clearInterval(idTime);
            window.cancelAnimationFrame(idAnimation);
            stageTime = 60;
            squaresAmount = squaresAmount * 1.5;
            ballDelta = ballDelta * 1.3;
            time = time / 1.5;
        }
        stages++;
        var stageSpan = document.getElementById("etap");
        stageSpan.textContent = stages;
        var timeSpan = document.getElementById("czas");
        timeSpan.textContent = stageTime;
        squaresBegin();
        idAnimation = requestAnimationFrame(draw);
        idInterval = setInterval(decrease, time);
        idTime = setInterval(decreaseTime, 1000);
    } else {
        window.clearInterval(idInterval);
        window.clearInterval(idTime);
        window.cancelAnimationFrame(idAnimation);
        window.clearInterval(idGame);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        updateTable();
        var timeSpan = document.getElementById("czas");
        timeSpan.textContent = 0;
        var stageSpan = document.getElementById("etap");
        stageSpan.textContent = 0;
        var pointsSpan = document.getElementById("punkty");
        pointsSpan.textContent = 0;
        document.getElementById("button").disabled = false;
    }
}

function updateTable() {
    var score1 = parseInt(document.getElementById("top1").textContent);
    var score2 = parseInt(document.getElementById("top2").textContent);
    var score3 = parseInt(document.getElementById("top3").textContent);
    if (isNaN(score1) == true || score > score1) {
        var name1 = document.getElementById("name1");
        var top1 = document.getElementById("top1");
        var name2 = document.getElementById("name2");
        var top2 = document.getElementById("top2");
        var name3 = document.getElementById("name3");
        var top3 = document.getElementById("top3");
        name3.textContent = name2.textContent;
        top3.textContent = top2.textContent;
        name2.textContent = name1.textContent;
        top2.textContent = top1.textContent;
        name1.textContent = nazwisko;
        top1.textContent = score.toString();

    } else if (isNaN(score2) == true || score > score2) {
        var name2 = document.getElementById("name2");
        var top2 = document.getElementById("top2");
        var name3 = document.getElementById("name3");
        var top3 = document.getElementById("top3");
        name3.textContent = name2.textContent;
        top3.textContent = top2.textContent;
        name2.textContent = nazwisko;
        top2.textContent = score.toString();

    } else if (isNaN(score3) == true || score > score3) {
        var name3 = document.getElementById("name3");
        name3.textContent = nazwisko;
        var top3 = document.getElementById("top3");
        top3.textContent = score.toString();
    }
}

function prepare() {
    x = canvas.width / 2;
    y = canvas.height / 2;
    score = 0;
    stageTime = 60;
    stages = 0;
    document.getElementById("button").disabled = true;
    nazwisko = document.getElementById("nazwisko").value;
    squaresAmount = document.getElementById("kwadraty").value;
    ballDelta = parseInt(document.getElementById("kolo").value);
    time = document.getElementById("licznik").value * 1000;
}

function run() {
    prepare();
    if (nazwisko == "" || squaresAmount == "" || ballDelta == "" || time == "") {
        console.log('Ktores z wymaganych pol jest puste');
        document.getElementById("button").disabled = false;
        return;
    }
    stage();
    idGame = setInterval(stage, 60000);
}