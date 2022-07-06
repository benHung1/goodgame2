window.onload = function () {
  timeDown();
  rpsPart1();
};

// timer 倒數

var time = document.getElementById("timeBox");
var rps = document.getElementById("rpsWrapper");

function timeDown() {
  let timer = 4;
  rps.style.display = "none";

  var timeMinus = setInterval(() => {
    timer--;
    time.innerText = timer;
    if (timer <= 0) {
      clearInterval(timeMinus);
      timer = 3;
      time.innerText = timer;
      time.style.display = "none";
      rps.style.display = "block";
    }
  }, 1000);
}

// 第一關計時器

var opponent;
var choices = ["r", "p", "s"];
var result = document.getElementById("result");
var firstTimer = document.getElementById("timer");
var part1Btn = document.getElementById("part1-btn");
var firstTime;

// 提示即將轉場
var show = document.getElementById("show");
var isPaused = true;
var myChoice = document.getElementById("my-choice");

function firstTimerDown() {
  var firstTime = 5;
  var firstTimerMinus = setInterval(() => {
    if (rps.style.display == "block" && firstTime >= 0 && isPaused) {
      firstTimer.innerText = "出拳時間還有" + firstTime + "秒";
      firstTime--;
      // 點擊照片後暫停計時

      part1Btn.addEventListener("click", function () {
        isPaused = false;
        setTimeout("show.style.visibility = 'visible' ", 2000);
        setTimeout("show.style.visibility = 'hidden' ", 4000);
        setTimeout(() => {
          isPaused = true;
          rpsPart2();
        }, 4000);
      });

      if (firstTime <= -1 && result.innerText == "") {
        result.innerHTML = "失敗 超時了";
        clearInterval(firstTimerMinus);
        // 超時需停止點擊事件
        document.getElementById("part1-btn").style.pointerEvents = "none";
      }
    }
  }, 1000);
  firstTime = 5;
}

function rpsPart1() {
  // 進畫面開始倒數

  firstTimerDown();

  // 點擊下方出拳

  document
    .getElementById("part1-btn")
    .addEventListener("click", function change(e) {
      let img = e.target;
      let imgId = e.target.id;
      document.getElementById("my-choice").src = imgId + ".png";

      //  電腦出拳

      opponent = choices[Math.floor(Math.random() * 3)];
      document.getElementById("choice").src = opponent + ".png";

      // 判斷使用者出了什麼

      if (imgId === "r") {
        img.src = "./rock.png";

        // 使用者出拳

        if (imgId === "r" && opponent === "r") {
          result.innerText = "平手!";
        } else if (imgId === "r" && opponent === "p") {
          result.innerText = "輸了 底子不行";
        } else {
          result.innerText = "贏了 底子可以";
        }
      } else if (imgId === "p") {
        img.src = "./cloth.png";

        // 使用者出布

        if (imgId === "p" && opponent === "p") {
          result.innerText = "平手!";
        } else if (imgId === "p" && opponent === "s") {
          result.innerText = "輸了 底子不行";
        } else {
          result.innerText = "贏了 底子可以";
        }
      } else {
        img.src = "./shears.png";

        // 使用者出剪刀

        if (imgId === "s" && opponent === "s") {
          result.innerText = "平手!";
        } else if (imgId === "s" && opponent === "r") {
          result.innerText = "輸了 底子不行";
        } else {
          result.innerText = "贏了 底子可以";
        }
      }
      // 都出完後需停止點擊事件
      document.getElementById("part1-btn").style.pointerEvents = "none";

      // 清除第一關資料

      clearPart1();

      // 回到某一個場景
    });
}

var rpsUserWins = document.getElementById("rpsUserWins");
var rpsUserLoses = document.getElementById("rpsUserLoses");
var rpsUserDraw = document.getElementById("rpsUserDraw");

function rpsPart2() {
  // 判斷猜拳輸贏後 該顯示哪個畫面

  if ((result.innerText = "贏了 底子可以")) {
    rps.style.display = "none";
    rpsUserWins.style.display = "block";
  } else if ((result.innerText = "輸了 底子不行")) {
    rps.style.display = "none";
    rpsUserLoses.style.display = "block";
  } else {
    rps.style.display = "none";
    rpsUserDraw.style.display = "block";
  }
  document
    .getElementsByClassName("part2btn")[0]
    .addEventListener("click", function (e) {
      console.log(e.target);
    });
}

function clearPart1() {
  // 如果不在第一關 則清除第一關資料
  setTimeout(() => {
    document.getElementById("r").src = "r.png";
    document.getElementById("p").src = "p.png";
    document.getElementById("s").src = "s.png";
    document.getElementById("choice").src = "plz.png";
    document.getElementById("my-choice").src = "plz.png";
    document.getElementById("part1-btn").style.pointerEvents = "auto";
    document.getElementById("result").innerHTML = "";
    firstTimerDown();
  }, 13000);
}
