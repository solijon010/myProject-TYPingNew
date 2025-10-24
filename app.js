import words from "./words.js";

// Info: DOM elementlar
const titleEl = document.querySelector(".title");
const inputEl = document.querySelector(".input");
const scoreEl = document.querySelector(".score-inner");
const secundEl = document.querySelector(".time-secund");
const overlayEl = document.querySelector(".overlay");
const restartBtn = overlayEl.querySelector("button");
const selectEl = document.querySelector("select");

// Info: Dastlabki qiymatlar
let score = 0;
let difficult = "easy";
let time = 5;
let randomWord;
let intervalId;

// Info: vaqtni ko‘rsatamiz
secundEl.textContent = time.toString().padStart(2, "0");

// Info: Tasodifiy so‘z tanlash funksiyasi
const randomWordFn = () => {
  const wordList = words[difficult]; // qiyinlikka mos arraydan tanlaymiz
  randomWord = wordList[Math.floor(Math.random() * wordList.length)];
  titleEl.textContent = randomWord;
  return randomWord;
};

// Info: Boshlang‘ich so‘z
randomWordFn();

// Info: Qiyinlik darajasini o‘zgartirish
selectEl.addEventListener("change", (e) => {
  difficult = e.target.value;
  randomWordFn(); 
});

// Info: Input effekti (rang o‘zgarishi)
const inputEvent = (event = "success") => {
  if (event === "success") {
    inputEl.style.outline = "4px solid #123456";
    inputEl.style.color = "#123456";
  } else {
    inputEl.style.outline = "4px solid red";
    inputEl.style.color = "red";
  }
};

// Info: So‘z kiritish jarayoni
inputEl.addEventListener("input", () => {
  const inputValue = inputEl.value;
  if (inputValue.length !== randomWord.length) return;

  if (inputValue === randomWord) {
    inputEl.value = "";
    inputEvent("success");
    score++;
    scoreEl.textContent = score;

    switch (difficult) {
      case "easy":
        time += 5;
        break;
      case "medium":
        time += 3;
        break;
      case "hard":
        time += 2;
        break;
    }

    randomWordFn();
  } else {
    inputEvent("error");
  }
});

// Info: Taymer funksiyasi
const startTimer = () => {
  clearInterval(intervalId); // eski intervalni to‘xtatamiz
  intervalId = setInterval(() => {
    if (time < 1) {
      overlayEl.classList.remove("hidden");
      overlayEl.querySelector(".modal-score").textContent = score;
      clearInterval(intervalId);
    } else {
      time--;
      secundEl.textContent = time.toString().padStart(2, "0");
    }
  }, 1000);
};

// Info: Boshlang‘ich taymerni ishga tushiramiz
startTimer();

// Info: Restart tugmasi
restartBtn.addEventListener("click", () => {
  overlayEl.classList.add("hidden");
  score = 0;
  scoreEl.textContent = score;
  time = 5;
  secundEl.textContent = time.toString().padStart(2, "0");
  randomWordFn();
  inputEl.value = "";
  inputEl.focus();
  startTimer();
});
