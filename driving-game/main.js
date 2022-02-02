var car = {
  direction: 'East',
  location: {
    x: 0,
    y: 0
  },
  start: false
};

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
      car.start = false;
    }

  }
}

function startCar() {
  car.start = true;
  var pixelsToMove = parseInt($carImg.style.left) + 10;
  if (isNaN(pixelsToMove)) {
    pixelsToMove = 10;
  }
  var newValue = pixelsToMove.toString();
  car.location.y = newValue;
  $carImg.style.left = (newValue + 'px');
}
