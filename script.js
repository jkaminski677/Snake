/**
 *
 * The browser game "Snake" tweaked by Jan Kamiński. The
 * author of the basic code is Mentisimo Rafael Frącek.
 *
 * @finalauthor     Jan Kamiński
 *
 */

window.addEventListener("load", () => {
  let snake, move, nextMove, points, apple, running, x;
  let ctx = document.getElementById("snake-canvas").getContext("2d");
  let prehistoric = 100;
  let inter = prehistoric;
  let old_var = inter;
  let nInterval;
  let punkty = old_var;
  let another_points = 0;

  setDefault();
  addKeyDownEventListener();
  if (!nInterval) {
    nInterval = setInterval(renderFrame, old_var);
  }

  function renderFrame() {
    if (running) {
      if (nextMove.x !== -move.x || nextMove.y !== -move.y) {
        move = nextMove;
      }
      snake.push({
        x: processBound(getHead().x + move.x),
        y: processBound(getHead().y + move.y),
      });
      if (
        snake.filter(
          (square) => square.x === getHead().x && square.y === getHead().y
        ).length >= 2
      ) {
        setDefault();
      } else {
        console.log(getHead());

        if (getHead().x === apple.x && getHead().y === apple.y) {
          points++;
          another_points++;
          if (another_points > 30 && another_points < 100) {
            punkty += 1;
          } else if (another_points >= 100) {
            punkty += 3;
          }
          old_var = punkty;
          inter = old_var;
          changeDelay(inter);
          apple = generateAppleLocation();
        }
        points <= 0 ? snake.shift() : points--;
      }
    }

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "pink";
    snake.forEach((square) =>
      ctx.fillRect(square.x * 20, square.y * 20, 18, 18)
    );
    ctx.fillStyle = "green";
    ctx.fillRect(apple.x * 20, apple.y * 20, 18, 18);
  }

  function getHead() {
    return snake[snake.length - 1];
  }

  function processBound(xOrY) {
    if (xOrY > 21) {
      return 0;
    } else if (xOrY < 0) {
      return 21;
    }
    return xOrY;
  }

  function setDefault() {
    snake = [{ x: 10, y: 10 }];
    punkty = prehistoric;
    another_points = 0;
    [move, nextMove] = Array(2).fill({ x: 0, y: 0 });
    points = 2;
    running = false;
    apple = generateAppleLocation();
  }

  function generateAppleLocation() {
    let location;
    do {
      location = { x: generateRandomNumber(21), y: generateRandomNumber(21) };
    } while (
      snake.filter(
        (square) => square.x === location.x && square.y === location.y
      ).length > 0
    );
    return location;
  }

  function generateRandomNumber(max) {
    return Math.floor(Math.random() * (max + 1));
  }

  function addKeyDownEventListener() {
    window.addEventListener("keydown", (e) => {
      if (e.keyCode === 16) {
        old_var = prehistoric;
        changeDelay(old_var);
      } else {
        old_var = inter;
        changeDelay(old_var);
      }
      if (e.code.startsWith("Arrow")) {
        e.preventDefault();
        running = true;
      }
      switch (e.code) {
        case "ArrowLeft":
          nextMove = { x: -1, y: 0 };
          break;
        case "ArrowRight":
          nextMove = { x: 1, y: 0 };
          break;
        case "ArrowDown":
          nextMove = { x: 0, y: 1 };
          break;
        case "ArrowUp":
          nextMove = { x: 0, y: -1 };
      }
    });
  }

  function changeDelay(x) {
    clearInterval(nInterval);
    nInterval = null;
    nInterval = setInterval(renderFrame, x);
  }
});
