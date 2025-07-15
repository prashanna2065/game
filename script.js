const canvas = document.getElementById("gameCanvas");
      const ctx = canvas.getContext("2d");

      const box = 20;
      const canvasSize = 20;

      let snake = [{ x: 9 * box, y: 9 * box }];
      let direction = null;
      let score = 0;
      let level = 1;
      let speed = 150;

      let food = {
        x: Math.floor(Math.random() * canvasSize) * box,
        y: Math.floor(Math.random() * canvasSize) * box,
      };

      const scoreDisplay = document.getElementById("score");
      const levelDisplay = document.getElementById("level");

      document.addEventListener("keydown", changeDirection);

      function changeDirection(e) {
        if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
        else if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
        else if (e.key === "ArrowRight" && direction !== "LEFT")
          direction = "RIGHT";
        else if (e.key === "ArrowDown" && direction !== "UP")
          direction = "DOWN";
      }

      function drawGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < snake.length; i++) {
          ctx.fillStyle = i === 0 ? "#4caf50" : "#8bc34a";
          ctx.fillRect(snake[i].x, snake[i].y, box, box);
        }

        ctx.fillStyle = "lime";
        ctx.fillRect(food.x, food.y, box, box);

        let head = { x: snake[0].x, y: snake[0].y };
        if (direction === "LEFT") head.x -= box;
        if (direction === "RIGHT") head.x += box;
        if (direction === "UP") head.y -= box;
        if (direction === "DOWN") head.y += box;

        if (
          head.x < 0 ||
          head.x >= canvas.width ||
          head.y < 0 ||
          head.y >= canvas.height ||
          snake.slice(1).some((seg) => seg.x === head.x && seg.y === head.y)
        ) {
          clearInterval(game);
          alert("💀 Game Over! Final Score: " + score);
          return;
        }

        if (head.x === food.x && head.y === food.y) {
          score++;
          updateScore();

          food = {
            x: Math.floor(Math.random() * canvasSize) * box,
            y: Math.floor(Math.random() * canvasSize) * box,
          };

          if (score % 5 === 0) {
            level++;
            updateLevel();
          }
        } else {
          snake.pop();
        }

        snake.unshift(head);
      }

      function updateScore() {
        scoreDisplay.textContent = score;
      }

      function updateLevel() {
        levelDisplay.textContent = level;
        clearInterval(game);
        speed = Math.max(50, 150 - (level - 1) * 10);
        game = setInterval(drawGame, speed);
      }

      let game = setInterval(drawGame, speed);

      document.getElementById("restartBtn").addEventListener("click", restartGame);

function restartGame() {
  clearInterval(game);

  snake = [{ x: 9 * box, y: 9 * box }];
  direction = null;
  score = 0;
  level = 1;
  speed = 150;

  food = {
    x: Math.floor(Math.random() * canvasSize) * box,
    y: Math.floor(Math.random() * canvasSize) * box,
  };

  updateScore();
  updateLevel();

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  game = setInterval(drawGame, speed);
}
