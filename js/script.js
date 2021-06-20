// Create a playing field
let field = document.getElementById("field");

// Create block's
for (let i = 1; i < 101; i++) {
  let excel = document.createElement("div");
  field.appendChild(excel);
  excel.classList.add("excel");
}

// Coordinates
let excel = document.querySelectorAll(".excel");

let x = 1,
  y = 10;

for (let i = 0; i < excel.length; i++) {
  if (x > 10) {
    x = 1;
    y--;
  }
  excel[i].setAttribute("posX", x);
  excel[i].setAttribute("posY", y);
  x++;
}

// Create a random appearance
function generateSnake() {
  let posX = Math.round(Math.random() * (10 - 3) + 3); // Default snake size is 3. Shift the random shift by 3 cells
  let posY = Math.round(Math.random() * (10 - 1) + 1);
  return [posX, posY];
}

let coordinates = generateSnake();
let snakeBody = [
  document.querySelector(`[posX = "${coordinates[0]}"][posY = "${coordinates[1]}"]`),
  document.querySelector(`[posX = "${coordinates[0] - 1}"][posY = "${coordinates[1]}"]`),
  document.querySelector(`[posX = "${coordinates[0] - 2}"][posY = "${coordinates[1]}"]`),
];

// Add class to snake body
for (let i = 0; i < snakeBody.length; i++) {
  snakeBody[i].classList.add("snakeBody");
}
snakeBody[0].classList.add("head"); // Add class to snake head

// Create eat
let food;

function creatFood() {
  function generateFood() {
    let posX = Math.round(Math.random() * (10 - 1) + 1);
    let posY = Math.round(Math.random() * (10 - 1) + 1);
    return [posX, posY];
  }
  let foodCoordinates = generateFood();
  food = document.querySelector(`[posX = "${foodCoordinates[0]}"][posY = "${foodCoordinates[1]}"]`);

  // If the cell is in the same place as the food
  while (food.classList.contains("snakeBody")) {
    let foodCoordinates = generateFood(); // Re-creating food
    food = document.querySelector(
      `[posX = "${foodCoordinates[0]}"][posY = "${foodCoordinates[1]}"]`
    );
  }

  food.classList.add("food"); // Add class to eat
}
creatFood();

// Default direction
let direction = "rigth";
// False move
let steps = false;
// Score
let input = document.getElementById("score");
// Scoring
let score = 0;
input.value = `Ваши очки ${score}`;

// Snake movement
function move() {
  let snakeCoordinates = [snakeBody[0].getAttribute("posX"), snakeBody[0].getAttribute("posY")];
  snakeBody[0].classList.remove("head"); // Remove head
  snakeBody[snakeBody.length - 1].classList.remove("snakeBody"); // Remove last element snake
  snakeBody.pop(); // Remove last element array

  if (direction == "rigth") {
    if (snakeCoordinates[0] < 10) {
      snakeBody.unshift(
        document.querySelector(
          `[posX = "${+snakeCoordinates[0] + 1}"][posY = "${snakeCoordinates[1]}"]`
        )
      );
    } else {
      snakeBody.unshift(document.querySelector(`[posX = "1"][posY = "${snakeCoordinates[1]}"]`));
    }
  } else if (direction == "left") {
    if (snakeCoordinates[0] > 1) {
      snakeBody.unshift(
        document.querySelector(
          `[posX = "${+snakeCoordinates[0] - 1}"][posY = "${snakeCoordinates[1]}"]`
        )
      );
    } else {
      snakeBody.unshift(document.querySelector(`[posX = "10"][posY = "${snakeCoordinates[1]}"]`));
    }
  } else if (direction == "up") {
    if (snakeCoordinates[1] < 10) {
      snakeBody.unshift(
        document.querySelector(
          `[posX = "${snakeCoordinates[0]}"][posY = "${+snakeCoordinates[1] + 1}"]`
        )
      );
    } else {
      snakeBody.unshift(document.querySelector(`[posX = "${snakeCoordinates[0]}"][posY = "1"]`));
    }
  } else if (direction == "down") {
    if (snakeCoordinates[1] > 1) {
      snakeBody.unshift(
        document.querySelector(
          `[posX = "${snakeCoordinates[0]}"][posY = "${snakeCoordinates[1] - 1}"]`
        )
      );
    } else {
      snakeBody.unshift(document.querySelector(`[posX = "${snakeCoordinates[0]}"][posY = "10"]`));
    }
  }

  if (
    snakeBody[0].getAttribute("posX") == food.getAttribute("posX") &&
    snakeBody[0].getAttribute("posY") == food.getAttribute("posY")
  ) {
    food.classList.remove("food");
    let a = snakeBody[snakeBody.length - 1].getAttribute("posX");
    let b = snakeBody[snakeBody.length - 1].getAttribute("posY");
    snakeBody.push(document.querySelector(`[posX = "${a}"][posY = "${b}"]`));
    creatFood();

    // Increase points every time we eat a mouse
    score++;
    input.value = `Ваши очки ${score}`;
  }

  if (snakeBody[0].classList.contains("snakeBody")) {
    setTimeout(() => {
      alert(`Игра окончена. Ваши очки ${score}`);
    }, 200);
    clearInterval(interval);
    snakeBody[0].style.background = "red";
  }

  snakeBody[0].classList.add("head"); // Add a class to the first element (head) after changing coordinates
  for (let i = 0; i < snakeBody.length; i++) {
    snakeBody[i].classList.add("snakeBody");
  }

  steps = true;
}

// Mouse speed
let interval = setInterval(move, 100);

window.addEventListener("keydown", function (event) {
  if (steps == true) {
    if (event.keyCode === 37 && direction != "rigth") {
      // left
      direction = "left";
      steps = false;
    } else if (event.keyCode === 39 && direction != "left") {
      // rigth
      direction = "rigth";
      steps = false;
    } else if (event.keyCode === 38 && direction != "down") {
      // up
      direction = "up";
      steps = false;
    } else if (event.keyCode === 40 && direction != "up") {
      // down
      direction = "down";
      steps = false;
    }
  }
});
