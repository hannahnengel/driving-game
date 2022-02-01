var car = {
  direction: 'East'
};

document.addEventListener('keydown', turnCar);
function turnCar(event) {
  if (event.key === 'ArrowRight') {
    car.direction = 'East';

  } else if (event.key === 'ArrowLeft') {
    car.direction = 'West';

  } else if (event.key === 'ArrowUp') {
    car.direction = 'North';

  } else if (event.key === 'ArrowDown') {
    car.direction = 'South';

  }
}
