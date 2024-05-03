let intervalId; // Global interval ID to manage the interval
let updateInterval = 1000; // Default update interval is 60 fps
let buttonPressed = false;

function updateTime() {
  const currentDate = new Date();

  let milliseconds = currentDate.getMilliseconds();
  let seconds = currentDate.getSeconds();
  let minutes = currentDate.getMinutes();
  let hours = currentDate.getHours();

  if (updateInterval === 1000) {
    if (buttonPressed === true)
    {
      // Snap to the nearest second for smoother transition when updating every second
      seconds = Math.round(seconds);
      minutes += seconds / 60;
      hours += minutes / 60;
      seconds = seconds % 60; // Ensure seconds wrap around correctly
    }
    else
    {
      
    }
  } else {
    // Include milliseconds for smooth transitions when updating at 60 fps
    seconds += milliseconds / 1000;
    minutes += seconds / 60;
    hours += minutes / 60;
  }

  if (buttonPressed === true)
  {
    // Compute degrees for each hand
    const secondsDegree = (seconds / 60) * 360;
    const minutesDegree = (minutes / 60) * 360;
    const hoursDegree = ((hours % 12) / 12) * 360;

        // Apply the rotation to each hand
    document.getElementById('second-hand').style.transform = `rotate(${secondsDegree}deg)`;
    document.getElementById('minute-hand').style.transform = `rotate(${minutesDegree}deg)`;
    document.getElementById('hour-hand').style.transform = `rotate(${hoursDegree}deg)`;
  }
  else
  {
    const secondsDegree = ((seconds / 60) * 360);
    const minutesDegree = ((minutes / 60) * 360) + ((seconds / 60) * 6);
    const hoursDegree = ((hours / 12) * 360) + ((minutes / 60) * 30);

      // Apply the rotation to each hand
    document.getElementById('second-hand').style.transform = `rotate(${secondsDegree}deg)`;
    document.getElementById('minute-hand').style.transform = `rotate(${minutesDegree}deg)`;
    document.getElementById('hour-hand').style.transform = `rotate(${hoursDegree}deg)`;
  }


}


function createNumbers() {
  const numbersContainer = document.querySelector('.numbers-container');
  // Array of Roman numerals from I to XII
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

  for (let i = 0; i < 12; i++) { // Loop from 0 to 11 for index access
    let number = document.createElement('div');
    number.classList.add('number', `number${i+1}`);
    number.textContent = romanNumerals[i]; // Use the array for numeral
    // Position the number inside the clock
    number.style.transform =
      `rotate(${(270 + (i+1) * 30) % 360}deg) translate(var(--clock-padding)) rotate(-${(270 + (i+1) * 30) % 360}deg)`;
    numbersContainer.appendChild(number);
  }
}


function createTickMarks() {
  const clock = document.getElementById('clock');
  const markersContainer = document.querySelector('.markers-container');
  // Assuming the clock variable is the same as the --clock-padding value
  const padding = getComputedStyle(document.documentElement).getPropertyValue('--clock-padding');
  const offset = getComputedStyle(document.documentElement).getPropertyValue('--marker-offset');

  // Create hour tick marks
  for (let i = 0; i < 12; i++) {
    let hourMarker = document.createElement('div');
    hourMarker.classList.add('marker', 'hour-marker');
    // Adjust for the width of the marker to center it and add padding from the variable
    hourMarker.style.transform = `rotate(${i * 30}deg) translate(-0%, calc(-100% + ${padding} + ${offset}))`;
    clock.appendChild(hourMarker);
  }

  // Create minute tick marks
  for (let i = 0; i < 60; i++) {
    if (i % 5 === 0) continue; // Skip minute marks where the hour markers are
    let minuteMarker = document.createElement('div');
    minuteMarker.classList.add('marker', 'minute-marker');
    minuteMarker.style.transform = `rotate(${i * 6}deg) translate(-0%, calc(-100% + ${padding} + ${offset}))`;
    clock.appendChild(minuteMarker);
  }
}

// Function to adjust update frequency to every 60 fps
function updateEvery60fps() {
  buttonPressed = true;
  updateInterval = 1000 / 60;
  //clearInterval(intervalId); // Clear the existing interval
  intervalId = setInterval(updateTime, updateInterval); // Restart interval for 60 fps
}

// Function to adjust update frequency to every second
function updateEverySecond() {
  buttonPressed = true;
  updateInterval = 1000;
  //clearInterval(intervalId); // Clear the existing interval
  intervalId = setInterval(updateTime, updateInterval); // Restart interval for 1 second updates
}


// Initialization
createNumbers();
createTickMarks();
updateTime();
setInterval(updateTime, 16.666667); // Update the clock every second
updateEverySecond();