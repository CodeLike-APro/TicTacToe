let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let playerX = document.querySelector(".playerX");
let playerO = document.querySelector(".playerO");
let mode = document.querySelector(".mode");
let mode1 = document.querySelector(".darkMode");
let mode2 = document.querySelector(".lightMode");
let body = document.querySelector("body");
let container = document.querySelector(".container");
let game = document.querySelector(".game");
let status01 = document.querySelector(".status");

let turnX = true; // playerX , playerO
let count = 0; //To Track Draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnX = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  msg.classList.remove("X-mark", "O-mark");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnX) {
      box.innerText = "X";
      box.classList.remove("darkBoxes");
      box.classList.add("X-mark");
      playerX.classList.remove("pulse");
      playerO.classList.add("pulse");
      turnX = false;
    } else {
      box.innerText = "O";
      box.classList.remove("darkBoxes");
      box.classList.add("O-mark");
      playerX.classList.add("pulse");
      playerO.classList.remove("pulse");
      turnX = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw!!`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("X-mark", "O-mark", "X-mark01", "O-mark01");
    playerX.classList.add("pulse");
    playerO.classList.remove("pulse");
  }
};

const showWinner = (winner) => {
  msg.innerText = `${winner} WON!!`;
  msg.classList.add(`${winner}-mark`);
  msg.style.background = "transparent";
  msgContainer.classList.remove("hide");
  msg.classList.remove("pop");
  void msg.offsetWidth; // <- This line forces a reflow
  msg.classList.add("pop");
  newGameBtn.classList.remove("pop");
  void newGameBtn.offsetWidth; // <- This line forces a reflow
  newGameBtn.classList.add("pop");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos1Val === pos2Val && pos2Val === pos3Val) {
      showWinner(pos1Val);
      return true;
    }
  }
  return false;
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
playerX.classList.add("pulse");
mode2.classList.add("hide");

let theme = "dark";

theme = localStorage.getItem("theme") || "dark";

// Apply the saved theme right away
if (theme === "light") {
  mode1.classList.add("hide");
  mode2.classList.remove("hide");
  body.classList.add("darkItDown");
  container.classList.add("boxShadow");
  game.classList.add("boxShadow");
  boxes.forEach((box) => {
    if (box.innerText === "") {
      box.classList.add("darkBoxes");
    }
  });
  status01.classList.add("boxShadow");
} else {
  mode2.classList.add("hide");
  mode1.classList.remove("hide");
  body.classList.remove("darkItDown");
  container.classList.remove("boxShadow");
  game.classList.remove("boxShadow");
  boxes.forEach((box) => {
    box.classList.remove("darkBoxes");
  });
  status01.classList.remove("boxShadow");
}

mode.addEventListener("click", () => {
  if (theme === "dark") {
    mode1.classList.add("hide");
    mode2.classList.remove("hide");
    body.classList.add("darkItDown");
    container.classList.add("boxShadow");
    game.classList.add("boxShadow");
    boxes.forEach((box) => {
      if (box.innerText === "") {
        box.classList.add("darkBoxes");
      }
    });
    status01.classList.add("boxShadow");
    theme = "light";
  } else {
    mode2.classList.add("hide");
    mode1.classList.remove("hide");
    body.classList.remove("darkItDown");
    container.classList.remove("boxShadow");
    game.classList.remove("boxShadow");
    boxes.forEach((box) => {
      box.classList.remove("darkBoxes");
      box.classList.remove("X-mark");
      box.classList.remove("O-mark");
    });
    status01.classList.remove("boxShadow");
    theme = "dark";
  }
  localStorage.setItem("theme", theme);
  mode.classList.add("mode-toggle");

  setTimeout(() => {
    mode.classList.remove("mode-toggle");
  }, 300); // info:- Match the transition time
});
