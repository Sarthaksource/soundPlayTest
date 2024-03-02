const circle = document.getElementById('circle');
let offsetX = 0;
let offsetY = 0;
const sensitivity = 10;
const button = document.querySelector('button');
const audio = new Audio();
audio.src = "./sound.wav";

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
    if (isColliding(circle, button)) {
        playCollisionSound();
    }
}

button.addEventListener('click', () => {
    audio.play();
});

function handleMotion(event) {
  const accelerationX = event.accelerationIncludingGravity.x;
  const accelerationY = event.accelerationIncludingGravity.y;

  // Adjust circle position based on acceleration with higher sensitivity
  offsetX = accelerationX * sensitivity; // Further increase the scale factor for higher sensitivity
  offsetY = accelerationY * sensitivity;

  // Limit the movement to the window bounds
  offsetX = Math.min(window.innerWidth - 50, Math.max(0, offsetX));
  offsetY = Math.min(window.innerHeight - 50, Math.max(0, offsetY));

  // Set circle position with a transform to improve performance
  circle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
}

setInterval(checkCollision, 100);
