function updateTimeText() {
  // Create a new Date object to get the current time
  const currentDate = new Date();

  // Get the current date in YYYY-MM-DD format
  const date = currentDate.toISOString().slice(0, 10);

  // Get the current time components (hours, minutes, seconds, milliseconds)
  let hours = currentDate.getHours();
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const seconds = currentDate.getSeconds().toString().padStart(2, "0");
  // const milliseconds = currentDate.getMilliseconds().toString().padStart(3, "0");

  // Determine AM or PM suffix
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  hours = hours.toString().padStart(2, "0");

  // Get the GMT offset
  const offset = -currentDate.getTimezoneOffset();
  const offsetHours = Math.floor(offset / 60);
  const offsetMinutes = offset % 60;
  const gmtOffset = `GMT${offsetHours >= 0 ? '+' : ''}${offsetHours.toString().padStart(2, '0')}:${offsetMinutes.toString().padStart(2, '0')}`;

  // Combine the date and time components
  //const dateTime = `${date} ${hours}:${minutes}:${seconds}:${milliseconds} ${ampm} ${gmtOffset}`;
  const dateTime = `${date} ${hours}:${minutes}:${seconds} ${ampm} ${gmtOffset}`;

  // Display the formatted date and time in the HTML element
  document.getElementById("currentTime").innerText = "Current time: " + dateTime;
}

// Call updateTimeText initially to display the current time immediately
updateTimeText();

// Update the time-text every 16.67 milliseconds
setInterval(updateTimeText, 16.666667); // This equates to about 16.6667 milliseconds, aligning with the frame rate
