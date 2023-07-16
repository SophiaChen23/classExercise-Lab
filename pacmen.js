const pacMen = []; // This array holds all the pacmen

// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}
// create a pac with random location
// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  // x y -> x,xile yxile speend
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(200);

  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = './images/PacMan1.png';
  newimg.width = 100;

  // TODO: set position here
  newimg.style.left = position.x + 'px';
  newimg.style.top = position.y + 'px';

  // TODO add new Child image to game
  game.appendChild(newimg);

  // return details in an object
  return {
    position,
    velocity,
    newimg,
  };
}
// TODO: start game
function update() {
  // loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x +'px';
    item.newimg.style.top = item.position.y+'px';
  });
  setTimeout(update, 20);
}

function checkCollisions(item) {
  // TODO: detect collision with all walls and make pacman bounce
  let game = document.getElementById('game');
  let maxX = game.offsetWidth - item.newimg.width; // Maximum x-coordinate value
  let maxY = game.offsetHeight - item.newimg.height; // Maximum y-coordinate value

  // Check collision with left or right walls
  if (item.position.x <= 0 || item.position.x >= maxX) {
    item.velocity.x *= -1; // Reverse the x velocity to bounce
  }

  // Check collision with top or bottom walls
  if (item.position.y <= 0 || item.position.y >= maxY) {
    item.velocity.y *= -1; // Reverse the y velocity to bounce
  }
}

function makeOne() {
  //TODO: ADD PACMAN BUTTON
  pacMen.push(makePac()); // add a new PacMan
}
// Get the "Add PacMan" button element by its ID
let addBtn = document.getElementById("addBtn");

// Attach the makeOne function as an event listener to the button
addBtn.addEventListener("click", makeOne);

// Start the game by calling the update function
update();
//don't change this line
if (typeof module !== 'undefined') {
  module.exports = { checkCollisions, update, pacMen };
}
