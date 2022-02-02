var car = {
  direction: 'East',
  location: {
    x: 8,
    y: 8
  },
  start: false
};

var leftScreenX = document.documentElement.clientWidth - 15 - 150;
var topScreenY = document.documentElement.clientHeight - 15 - 150;

var $enemyCar1 = document.querySelector('.enemy-car1-img');
var $enemyCar2 = document.querySelector('.enemy-car2-img');
var $finishLine = document.querySelector('.finish-line');
$enemyCar1.style.left = leftScreenX.toString() + 'px';
$enemyCar2.style.left = '15px';
$finishLine.style.left = leftScreenX.toString() + 'px';
$finishLine.style.top = topScreenY.toString() + 'px';

var enemyCars = {
  enemyCar1: {
    direction: 'West',
    location: {
      x: leftScreenX,
      y: 300
    }
  },
  enemyCar2: {
    direction: 'East',
    location: {
      x: 15,
      y: 600
    }
  }
};

// var finishLine = {
//   location: {
//     x: leftScreenX,
//     y: topScreenY
//   }
// };

var $carImg = document.querySelector('.car-img');
var myInt;

document.addEventListener('keydown', moveCar);
function moveCar(event) {
  if (event.key === 'ArrowRight') {
    car.direction = 'East';
    $carImg.className = 'car-img east';
  } else if (event.key === 'ArrowLeft') {
    car.direction = 'West';
    $carImg.className = 'car-img west';
  } else if (event.key === 'ArrowUp') {
    car.direction = 'North';
    $carImg.className = 'car-img north';
  } else if (event.key === 'ArrowDown') {
    car.direction = 'South';
    $carImg.className = 'car-img south';
  }
  if (event.key === ' ') {
    if (car.start === false) {
      myInt = setInterval(startCar, 16);
    } else if (car.start === true) {
      clearInterval(myInt);

      car.location.x = parseInt($carImg.style.left);
      if (isNaN(parseInt($carImg.style.left))) {
        car.location.x = 8;
      }
      car.location.y = parseInt($carImg.style.top);
      if (isNaN(parseInt($carImg.style.top))) {
        car.location.y = 8;
      }

      car.start = false;
    }

  }
}

function startCar() {
  car.start = true;
  var pixelsToMove;
  var newValue;
  var movementSpeed = 10;

  if (car.direction === 'East') {
    pixelsToMove = parseInt($carImg.style.left) + movementSpeed;
    if (isNaN(pixelsToMove)) {
      pixelsToMove = movementSpeed;
    }
    newValue = pixelsToMove.toString();
    car.location.x = newValue;
    $carImg.style.left = (newValue + 'px');
  } else if (car.direction === 'West') {
    pixelsToMove = parseInt($carImg.style.left) - movementSpeed;
    if (isNaN(pixelsToMove)) {
      pixelsToMove = -movementSpeed;
    }
    newValue = pixelsToMove.toString();
    car.location.x = newValue;
    $carImg.style.left = (newValue + 'px');
  } else if (car.direction === 'South') {
    pixelsToMove = parseInt($carImg.style.top) + movementSpeed;
    if (isNaN(pixelsToMove)) {
      pixelsToMove = movementSpeed;
    }
    newValue = pixelsToMove.toString();
    car.location.y = newValue;
    $carImg.style.top = (newValue + 'px');
  } else if (car.direction === 'North') {
    pixelsToMove = parseInt($carImg.style.top) - movementSpeed;
    if (isNaN(pixelsToMove)) {
      pixelsToMove = -movementSpeed;
    }
    newValue = pixelsToMove.toString();
    car.location.y = newValue;
    $carImg.style.top = (newValue + 'px');
  }
  checkCrash();
}

function resetGame() {
  var $crash = document.querySelector('.crash');
  $crash.classList.add('hidden');
  car = {
    direction: 'East',
    location: {
      x: 8,
      y: 8
    },
    start: false
  };
  $carImg.style.left = '8px';
  $carImg.style.top = '8px';
  $carImg.className = 'car-img east';
  moveEnemyCarsInt = setInterval(moveEnemyCars, 16);
}

function checkCrash() {
  var crash = false;

  var carLeftX = parseInt(car.location.x);
  var carRightX = parseInt(car.location.x) + 150;
  var carTopY = parseInt(car.location.y);
  var carBottomY = parseInt(car.location.y) + 150;

  var enemyCar1LeftX = parseInt(enemyCars.enemyCar1.location.x);
  var enemyCar1RightX = parseInt(enemyCars.enemyCar1.location.x) + 150;
  var enemyCar1TopY = parseInt(enemyCars.enemyCar1.location.y);
  var enemyCar1BottomY = parseInt(enemyCars.enemyCar1.location.y) + 105;

  var enemyCar2LeftX = parseInt(enemyCars.enemyCar2.location.x);
  var enemyCar2RightX = parseInt(enemyCars.enemyCar2.location.x) + 150;
  var enemyCar2TopY = parseInt(enemyCars.enemyCar2.location.y);
  var enemyCar2BottomY = parseInt(enemyCars.enemyCar2.location.y) + 105;

  if (carLeftX > enemyCar2RightX || carRightX < enemyCar2LeftX) {
    crash = false;
  } else if (carTopY > enemyCar2BottomY || carBottomY < enemyCar2TopY) {
    crash = false;
  } else {
    crash = true;
  }

  if (crash === false) {
    if ((carLeftX > enemyCar1RightX || carRightX < enemyCar1LeftX)) {
      crash = false;
    } else if (carTopY > enemyCar1BottomY || carBottomY < enemyCar1TopY) {
      crash = false;
    } else {
      crash = true;
    }
  }

  if (car.location.x <= -1 || car.location.y <= -1 || car.location.x >= leftScreenX + 15 || car.location.y >= topScreenY + 15) {
    crash = true;
  }

  if (crash) {
    var $crash = document.querySelector('.crash');
    $crash.classList.remove('hidden');
    clearInterval(myInt);
    setTimeout(resetGame, 1500);
    crash = false;
    clearInterval(moveEnemyCarsInt);
  }
}

function moveEnemyCars() {
  $enemyCar1 = document.querySelector('.enemy-car1-img');
  var enemyCar1PixelsToMove;
  var newValue;

  var movementSpeed = 12;

  if (enemyCars.enemyCar1.direction === 'West') {
    enemyCar1PixelsToMove = parseInt($enemyCar1.style.left) - movementSpeed;
    newValue = enemyCar1PixelsToMove.toString();
    $enemyCar1.style.left = newValue + 'px';
    enemyCars.enemyCar1.location.x = newValue;
    if (parseInt($enemyCar1.style.left) <= 15) {
      enemyCars.enemyCar1.direction = 'East';
      $enemyCar1.style.transform = 'scaleX(-1)';
    }
  }

  if (enemyCars.enemyCar1.direction === 'East') {
    enemyCar1PixelsToMove = parseInt($enemyCar1.style.left) + movementSpeed;
    newValue = enemyCar1PixelsToMove.toString();
    $enemyCar1.style.left = newValue + 'px';
    enemyCars.enemyCar1.location.x = newValue;
    if (parseInt($enemyCar1.style.left) >= leftScreenX) {
      enemyCars.enemyCar1.direction = 'West';
      $enemyCar1.style.transform = 'scaleX(1)';
    }
  }

  $enemyCar2 = document.querySelector('.enemy-car2-img');
  var enemyCar2PixelsToMove;
  var newValue2;

  if (enemyCars.enemyCar2.direction === 'West') {
    enemyCar2PixelsToMove = parseInt($enemyCar2.style.left) - movementSpeed;
    newValue2 = enemyCar2PixelsToMove.toString();
    $enemyCar2.style.left = newValue2 + 'px';
    enemyCars.enemyCar2.location.x = newValue;
    if (parseInt($enemyCar2.style.left) <= 15) {
      enemyCars.enemyCar2.direction = 'East';
      $enemyCar2.style.transform = 'scaleX(-1)';
    }
  }
  if (enemyCars.enemyCar2.direction === 'East') {
    enemyCar2PixelsToMove = parseInt($enemyCar2.style.left) + movementSpeed;
    newValue2 = enemyCar2PixelsToMove.toString();
    $enemyCar2.style.left = newValue2 + 'px';
    enemyCars.enemyCar2.location.x = newValue;
    if (parseInt($enemyCar2.style.left) >= leftScreenX) {
      enemyCars.enemyCar2.direction = 'West';
      $enemyCar2.style.transform = 'scaleX(1)';
    }
  }

}
var moveEnemyCarsInt = setInterval(moveEnemyCars, 16);
