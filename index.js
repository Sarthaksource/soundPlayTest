const cursor = document.getElementById('circle');
let isDeviceFlat = false;
const button = document.querySelector('button');
const audio = new Audio();
audio.src = "./sound.wav";

window.addEventListener('deviceorientation', handleOrientation);
window.addEventListener('devicemotion', handleMotion);

function isColliding(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();

    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
}

function playCollisionSound() {
    audio.currentTime = 0; // Rewind sound to the beginning
    audio.play();
}

function checkCollision() {
    if (isColliding(cursor, button)) {
        playCollisionSound();
    }
}

button.addEventListener('click', () => {
    audio.play();
});

function handleOrientation(event) {
  const beta = event.beta; // Tilt front-to-back
  const gamma = event.gamma; // Tilt left-to-right

  // Check if the device is nearly flat
  isDeviceFlat = Math.abs(beta) < 15 && Math.abs(gamma) < 15;
}

function handleMotion(event) {
  if (isDeviceFlat) {
    const accelerationX = event.accelerationIncludingGravity.x;
    const accelerationY = event.accelerationIncludingGravity.y;

    // Simulate mouse movement based on acceleration
    const sensitivity = 1.5; // Adjust sensitivity as needed
    const offsetX = accelerationX * sensitivity;
    const offsetY = accelerationY * sensitivity;

    // Update the cursor position
    cursor.style.left = `${cursor.offsetLeft + offsetX}px`;
    cursor.style.top = `${cursor.offsetTop - offsetY}px`;
  }
}


setInterval(checkCollision, 100);