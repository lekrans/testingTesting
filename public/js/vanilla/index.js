// This is the vanilla version of the self driving car.
// This file gets data and shows it on the vehicle dashboard.
// We get the imporant info from the various services the car exposes to us...


// to/from mph
function convertSpeed(speed, targetUnit) {
  // to mph
  if (targetUnit === 'mph') {
    return speed * 0.621371; // FIXME: Possible error
  }

  return speed * 1.609344;
}

function getChanceOfCollision() {
  const otherCars = getNearbyVehicleCount();
  const speed = getCurrentSpeed();
  const closestCarSpeed = getOncomingVehicleSpeed();
  const roadCondition = getRoadCondition();

  return otherCars * convertSpeed(speed, 'mph') * roadCondition * closestCarSpeed / 100 * getFancyRandomNumber(0, 10000000);
}

function getFancyRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getCurrentSpeed() {
// assumes mph
  const min = 0;
  const max = 250;

   // TODO: Hook this up to the speed service in the car
  const currentSpeed = getFancyRandomNumber(min, max);
  console.log('currentSpeed', currentSpeed); // FIXME: Remove this
  return currentSpeed;
}

function getRoadCondition() {
  // TODO: connect this to the proper service
  // return getRoadConditionFromService();
  return 'wet' || 'dry' || 'icy';
}

// duration and amount?
function getRemainingGasAmount() {
 // TODO: get these from the service...
  const tankCapacity = 16; // gallons
  const gasMileage = 35; // miles / gallon
  const totalMileage = tankCapacity * gasMileage;

  const milesDriven = getFancyRandomNumber(0, totalMileage);

  const remainingMiles = totalMileage - milesDriven;
  return remainingMiles;
}

// nearby vehicles
function getNearbyVehicleCount(vehicle) {
  return vehicle.getSpeed();
  return 5;
}

// returns the speed of the closest oncoming vehicle
function getOncomingVehicleSpeed() {
  const min = 0;
  const max = 350; // This is a feature we promised, but we are totally guessing.

  // TODO: Hook this up to the speed detection service in the car
  const currentSpeed = Math.floor(Math.random() * (max - min)) + min;
  return currentSpeed;
}


function getChanceOfExplosion() {
  return getFancyRandomNumber(0, 100) * 1.528493;
}

function getEngineHealth() {
  return getFancyRandomNumber(0, 100);
}

// round everything up
function init() {
  const speedEl = document.getElementById('current_speed');
  const gasEl = document.getElementById('gas_left');
  const engineHealthEl = document.getElementById('engine_health');

  // render status to the DOM
  speedEl.innerHTML = getCurrentSpeed();
  engineHealthEl.innerHTML = getEngineHealth();
  gasEl.innerHTML = getRemainingGasAmount();

  getChanceOfExplosion();
  getChanceOfCollision();

  // document.getElementById('container').innerHTML = 'look ma the car I built in the back shed drives itself'
}

init();

