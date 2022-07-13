window.onload = function () {
  timeDown();
  rpsPart1();
};

// timer 倒數

var time = document.getElementById("timeBox");
var rps = document.getElementById("rpsWrapper");
var rpsUserWins = document.getElementById("rpsUserWins");
var rpsUserLoses = document.getElementById("rpsUserLoses");
var rpsUserDraw = document.getElementById("rpsUserDraw");
var timer;
var timeMinus;
var round = document.getElementById("round");
var count = 1;
var score = 0;
var myScore = document.getElementById("myScore");

function timeDown() {
  timer = 4;
  rps.style.display = "none";

  clearInterval(timeMinus);
  timeMinus = setInterval(function () {
    timer--;
    time.innerText = timer;
    if (timer <= 0) {
      clearInterval(timeMinus);
      timer = 4;
      timer--;
      time.innerText = timer;
      time.style.display = "none";
      rps.style.display = "block";
      firstTimer.style.display = "block";
    }
  }, 1000);
}

// 第一關計時器

var opponent;
var choices = ["r", "p", "s"];
var result = document.getElementById("result");
var firstTimer = document.getElementById("timer");
var part1Btn = document.getElementById("part1-btn");

// 提示即將轉場
var show = document.getElementById("show");
var isPaused = true;
var firstTime;
var part2Btn = document.getElementsByClassName("userWinsBtn")[0];
var part2BtnLoses = document.getElementsByClassName("userLosesBtn")[0];

var part2ImgAttact = document.getElementById("attack");
var part2ImgDefence = document.getElementById("defence");

var finalResult = document.getElementById("finalResult");
var finalResultSecond = document.getElementById("finalResultSecond");

var secondTime;

function changeTime() {
  if (count <= 3) {
    firstTime = 15;
    if (
      finalResult.innerText == "恭喜 準備進入下一輪" ||
      finalResultSecond.innerText == "恭喜 準備進入下一輪"
    ) {
      count += 1;
      score += 10;
      round.innerText = `您好我是第  ${count} 回合 `;
      myScore.innerText = `您好我的分數是 ${score}`;
    } else if (
      finalResult.innerText == "平手!" ||
      finalResultDraw.innerText == "平手!"
    ) {
      count = count;
      score = score;
      round.innerText = `您好我是第  ${count} 回合 `;
      myScore.innerText = `您好我的分數是 ${score}`;
    } else {
      count = 1;
      score = 0;
      round.innerText = `您好我是第  ${count} 回合 `;
      myScore.innerText = `您好我的分數是 ${score}`;
    }
  } else if (count <= 6) {
    firstTime = 6;

    if (
      finalResult.innerText == "恭喜 準備進入下一輪" ||
      finalResultSecond.innerText == "恭喜 準備進入下一輪"
    ) {
      count += 1;
      score += 20;
      round.innerText = `您好我是第  ${count} 回合 `;
      myScore.innerText = `您好我的分數是 ${score}`;
    } else if (
      finalResult.innerText == "平手!" ||
      finalResultDraw.innerText == "平手!"
    ) {
      count = count;
      score = score;
      round.innerText = `您好我是第  ${count} 回合 `;
      myScore.innerText = `您好我的分數是 ${score}`;
    } else {
      count = 1;
      score = 0;
      round.innerText = `您好我是第  ${count} 回合 `;
      myScore.innerText = `您好我的分數是 ${score}`;
    }
  } else if (count < 9) {
    firstTime = 3;
    if (
      finalResult.innerText == "恭喜 準備進入下一輪" ||
      finalResultSecond.innerText == "恭喜 準備進入下一輪"
    ) {
      count += 1;
      score += 30;
      round.innerText = `您好我是第  ${count} 回合 `;
      myScore.innerText = `您好我的分數是 ${score}`;
    } else if (
      finalResult.innerText == "平手!" ||
      finalResultDraw.innerText == "平手!"
    ) {
      count = count;
      score = score;
      round.innerText = `您好我是第  ${count} 回合 `;
      myScore.innerText = `您好我的分數是 ${score}`;
    } else {
      count = 1;
      score = 0;
      round.innerText = `您好我是第  ${count} 回合 `;
      myScore.innerText = `您好我的分數是 ${score}`;
    }
  } else {
    if (
      score == 150 &&
      (finalResult.innerText == "恭喜 準備進入下一輪" ||
        finalResultSecond.innerText == "恭喜 準備進入下一輪")
    ) {
      count += 1;
      score += 30;
      alert("挑戰成功");
    } else if (score == 150 && finalResultDraw.innerText == "平手!") {
      firstTime = 3;
      count = count;
      score = score;
      round.innerText = `您好我是第  ${count} 回合 `;
      myScore.innerText = `您好我的分數是 ${score}`;
      return false;
    } else {
    }
    firstTime = 15;
    count = 1;
    score = 0;
    round.innerText = `您好我是第  ${count} 回合 `;
    myScore.innerText = `您好我的分數是 ${score}`;
  }
}

function firstTimerDown() {
  clearInterval(firstTimerMinus);
  var firstTimerMinus = setInterval(() => {
    if (firstTime >= 0 && time.style.display == "none") {
      firstTimer.innerText = "出拳時間還有" + firstTime + "秒";
      firstTime--;

      // 第一關猜拳 click邏輯

      part1Btn.addEventListener("click", function () {
        isPaused = false;
        // setTimeout("show.style.visibility = 'visible' ", 2000);
        // setTimeout("show.style.visibility = 'hidden' ", 4000);
        clearTimeout(secondTime);
        secondTime = setTimeout(() => {
          isPaused = true;
          rpsPart2();
        }, 1000);
      });
      if (result.innerText == "平手!") {
        clearInterval(firstTimerMinus);
      }
      if (firstTime <= -1) {
        clearInterval(firstTimerMinus);
        document.getElementById("part1-btn").style.pointerEvents = "none";
        part2Btn.style.pointerEvents = "none";
        part2BtnLoses.style.pointerEvents = "none";
      }
      if (firstTime <= -1 && result.innerText == "請出拳") {
        result.innerText = "失敗 超時了";
        firstTimer.style.display = "none";
        count = 1;
        score = 0;
        round.innerText = `您好我是第  ${count} 回合 `;
        myScore.innerText = `您好我的分數是 ${score}`;

        clearInterval(firstTimerMinus);
        clearTimeout(secondTime);
        secondTime = setTimeout(() => {
          rps.style.display = "none";
          time.style.display = "block";
          timeDown();
          clearPart1();
          clearPart2();
        }, 1000);

        // 超時需停止點擊事件

        document.getElementById("part1-btn").style.pointerEvents = "none";
      }

      // 第二關 userWin click 邏輯

      part2Btn.addEventListener("click", function () {
        clearInterval(firstTimerMinus);
      });

      // 第二關 userLoses click 邏輯

      part2BtnLoses.addEventListener("click", function () {
        clearInterval(firstTimerMinus);
      });

      document.addEventListener("keydown", function (e) {
        if (
          (rps.style.display == "none" &&
            rpsUserDraw.style.display == "block" &&
            (e.key == "d" || e.key == "a")) ||
          (rps.style.display == "none" &&
            rpsUserLoses.style.display == "block" &&
            (e.key == "d" || e.key == "a")) ||
          (rps.style.display == "none" &&
            rpsUserWins.style.display == "block" &&
            (e.key == "d" || e.key == "a"))
        ) {
          clearInterval(firstTimerMinus);
        }
      });

      if (firstTime <= -1 && finalResult.innerText == "請選擇") {
        finalResult.innerText = "失敗 超時了";
        finalResultSecond.innerText = "失敗 超時了";
        firstTimer.style.display = "none";
        count = 1;
        score = 0;
        round.innerText = `您好我是第  ${count} 回合 `;
        myScore.innerText = `您好我的分數是 ${score}`;

        clearInterval(firstTimerMinus);
        clearTimeout(secondTime);
        secondTime = setTimeout(() => {
          rpsUserWins.style.display = "none";
          rpsUserLoses.style.display = "none";
          time.style.display = "block";
          timeDown();
          clearPart1();
          clearPart2();
        }, 1500);

        // 超時且沒動作需停止點擊事件

        part2Btn.style.pointerEvents = "none";
      }
    }
  }, 1000);
  changeTime();
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
      clearTimeout(secondTime);
      secondTime = setTimeout(() => {
        rpsPart2();
      }, 1000);
    });

  //  鍵盤操作
  document.addEventListener("keydown", function changekeyDown(e) {
    let keyCode = e.key;

    if (rps.style.display === "block" && time.style.display === "none") {
      if (keyCode === "r" || keyCode === "p" || keyCode === "s") {
        document.getElementById("my-choice").src = keyCode + ".png";
        document.removeEventListener("keydown", changekeyDown);

        // 都出完後需停止點擊事件

        // 電腦出拳
        opponent = choices[Math.floor(Math.random() * 3)];
        document.getElementById("choice").src = opponent + ".png";

        clearTimeout(secondTime);
        secondTime = setTimeout(() => {
          rpsPart2();
        }, 1000);
      } else {
        // alert("請不要亂按 石頭 = r  剪刀 = s 布 = p");
      }

      // 判斷使用者出了什麼

      if (keyCode === "r") {
        document.getElementById("r").src = "./rock.png";

        // 使用者出拳

        if (keyCode === "r" && opponent === "r") {
          result.innerText = "平手!";
        } else if (keyCode === "r" && opponent === "p") {
          result.innerText = "輸了 底子不行";
        } else {
          result.innerText = "贏了 底子可以";
        }
      } else if (keyCode === "p") {
        document.getElementById("p").src = "./cloth.png";

        // 使用者出布

        if (keyCode === "p" && opponent === "p") {
          result.innerText = "平手!";
        } else if (keyCode === "p" && opponent === "s") {
          result.innerText = "輸了 底子不行";
        } else {
          result.innerText = "贏了 底子可以";
        }
      } else if (keyCode === "s") {
        document.getElementById("s").src = "./shears.png";

        // 使用者出剪刀

        if (keyCode === "s" && opponent === "s") {
          result.innerText = "平手!";
        } else if (keyCode === "s" && opponent === "r") {
          result.innerText = "輸了 底子不行";
        } else {
          result.innerText = "贏了 底子可以";
        }
      }
    }
  });
}

var userWinChoice = document.getElementById("userWinChoice");
var userLosesChoice = document.getElementById("userLosesChoice");
var Timer = document.getElementById("Timer");
var finalResultDraw = document.getElementById("finalResultDraw");

function rpsPart2() {
  // 鍵盤操作

  document.addEventListener("keypress", function changekeyDownPart2(e) {
    let keyCodePart2 = e.key;

    if (keyCodePart2 == "a" || keyCodePart2 == "d") {
      document.getElementById("attack").src = "./shame.png";
      document.getElementById("defence").src = "./hands.png";
      userLosesChoice.src = keyCodePart2 + ".png";
      userWinChoice.src = keyCodePart2 + ".png";
      document.removeEventListener("keypress", changekeyDownPart2);
    }

    if (rpsUserWins.style.display == "block" && keyCodePart2 == "a") {
      finalResult.innerText = "恭喜 準備進入下一輪";
      firstTimer.style.display = "none";
      clearTimeout(secondTime);
      secondTime = setTimeout(() => {
        rpsUserWins.style.display = "none";
        time.style.display = "block";
        timeDown();
        clearPart1();
        clearPart2();
      }, 1000);
    } else if (rpsUserWins.style.display == "block" && keyCodePart2 == "d") {
      finalResult.innerText = "sorry 出去再來";
      firstTimer.style.display = "none";
      clearTimeout(secondTime);
      secondTime = setTimeout(() => {
        rpsUserWins.style.display = "none";
        time.style.display = "block";
        timeDown();
        clearPart1();
        clearPart2();
      }, 1000);
    }

    // 以上為勝利時，以下為失敗時
    else if (rpsUserLoses.style.display == "block" && keyCodePart2 == "d") {
      finalResultSecond.innerText = "恭喜 準備進入下一輪";
      firstTimer.style.display = "none";
      clearTimeout(secondTime);
      secondTime = setTimeout(() => {
        rpsUserLoses.style.display = "none";
        time.style.display = "block";
        timeDown();
        clearPart1();
        clearPart2();
      }, 1000);
    } else if (rpsUserLoses.style.display == "block" && keyCodePart2 == "a") {
      finalResultSecond.innerText = "sorry 出去再來";
      firstTimer.style.display = "none";
      clearTimeout(secondTime);
      secondTime = setTimeout(() => {
        rpsUserLoses.style.display = "none";
        time.style.display = "block";
        timeDown();
        clearPart1();
        clearPart2();
      }, 1000);
    } else if (rpsUserDraw.style.display == "block") {
      document.removeEventListener("keypress", changekeyDownPart2);
    }
  });

  // 判斷猜拳輸贏後 該顯示哪個畫面

  if (result.innerText == "贏了 底子可以") {
    rps.style.display = "none";
    rpsUserWins.style.display = "block";

    // 進攻畫面邏輯

    part2Btn.addEventListener("click", function (e) {
      let iId = e.target.id;
      document.getElementById("attack").src = "./shame.png";
      userWinChoice.src = iId + ".png";
      if (iId == "a") {
        finalResult.innerText = "恭喜 準備進入下一輪";
        firstTimer.style.display = "none";
        clearTimeout(secondTime);
        secondTime = setTimeout(() => {
          rpsUserWins.style.display = "none";
          time.style.display = "block";
          timeDown();
          clearPart1();
          clearPart2();
        }, 1000);
      } else {
        finalResult.innerText = "sorry 出去再來";
        firstTimer.style.display = "none";
        clearTimeout(secondTime);
        secondTime = setTimeout(() => {
          rpsUserWins.style.display = "none";
          time.style.display = "block";
          timeDown();
          clearPart1();
          clearPart2();
        }, 1000);
      }
      // 都出完後需停止點擊事件
      part2Btn.style.pointerEvents = "none";
    });
  } else if (result.innerText == "輸了 底子不行") {
    rps.style.display = "none";
    rpsUserLoses.style.display = "block";
    // 防守畫面邏輯

    part2BtnLoses.addEventListener("click", function (e) {
      let iLoseId = e.target.id;
      document.getElementById("defence").src = "./hands.png";
      userLosesChoice.src = iLoseId + ".png";
      if (iLoseId == "d") {
        finalResultSecond.innerText = "恭喜 準備進入下一輪";
        firstTimer.style.display = "none";
        clearTimeout(secondTime);
        secondTime = setTimeout(() => {
          rpsUserLoses.style.display = "none";
          time.style.display = "block";
          timeDown();
          clearPart1();
          clearPart2();
        }, 1000);
      } else {
        finalResultSecond.innerText = "sorry 出去再來";
        firstTimer.style.display = "none";

        clearTimeout(secondTime);
        secondTime = setTimeout(() => {
          rpsUserLoses.style.display = "none";
          time.style.display = "block";
          timeDown();
          clearPart1();
          clearPart2();
        }, 1000);
      }
      // 都出完後需停止點擊事件
      part2BtnLoses.style.pointerEvents = "none";
    });
  } else if (result.innerText == "平手!") {
    rps.style.display = "none";
    rpsUserDraw.style.display = "block";
    finalResultDraw.innerText = "平手!";
    firstTimer.style.display = "none";
    clearTimeout(secondTime);
    secondTime = setTimeout(() => {
      rpsUserDraw.style.display = "none";
      time.style.display = "block";
      timeDown();
      clearPart1();
      clearPart2();
    }, 1000);
  }
}

function clearPart1() {
  firstTimerDown();

  // 如果不在第一關 則清除第一關資料
  document.getElementById("r").src = "r.png";
  document.getElementById("p").src = "p.png";
  document.getElementById("s").src = "s.png";
  document.getElementById("choice").src = "plz.png";
  document.getElementById("my-choice").src = "plz.png";
  document.getElementById("part1-btn").style.pointerEvents = "auto";
  document.getElementById("result").innerHTML = "請出拳";
  document.addEventListener("keydown", function changekeyDown(e) {
    let keyCode = e.key;

    if (rps.style.display === "block" && time.style.display === "none") {
      if (keyCode === "r" || keyCode === "p" || keyCode === "s") {
        document.getElementById("my-choice").src = keyCode + ".png";
        document.removeEventListener("keydown", changekeyDown);

        // 都出完後需停止點擊事件

        // 電腦出拳

        opponent = choices[Math.floor(Math.random() * 3)];
        document.getElementById("choice").src = opponent + ".png";

        clearTimeout(secondTime);
        secondTime = setTimeout(() => {
          rpsPart2();
        }, 1000);
      } else {
        // alert("請不要亂按 石頭 = r  剪刀 = s 布 = p");
      }

      // 判斷使用者出了什麼

      if (keyCode === "r") {
        document.getElementById("r").src = "./rock.png";

        // 使用者出拳

        if (keyCode === "r" && opponent === "r") {
          result.innerText = "平手!";
        } else if (keyCode === "r" && opponent === "p") {
          result.innerText = "輸了 底子不行";
        } else {
          result.innerText = "贏了 底子可以";
        }
      } else if (keyCode === "p") {
        document.getElementById("p").src = "./cloth.png";

        // 使用者出布

        if (keyCode === "p" && opponent === "p") {
          result.innerText = "平手!";
        } else if (keyCode === "p" && opponent === "s") {
          result.innerText = "輸了 底子不行";
        } else {
          result.innerText = "贏了 底子可以";
        }
      } else if (keyCode === "s") {
        document.getElementById("s").src = "./shears.png";

        // 使用者出剪刀

        if (keyCode === "s" && opponent === "s") {
          result.innerText = "平手!";
        } else if (keyCode === "s" && opponent === "r") {
          result.innerText = "輸了 底子不行";
        } else {
          result.innerText = "贏了 底子可以";
        }
      }
    }
  });
}

function clearPart2() {
  // 如果不在第二關 則清除第二關資料

  // 進攻
  part2ImgAttact.src = "/a.png";
  part2ImgDefence.src = "/d.png";
  userWinChoice.src = "plz.png";
  document.getElementById("attack").src = "plz.png";
  finalResult.innerHTML = "請選擇";

  // 防守

  document.getElementById("defence").src = "plz.png";
  userLosesChoice.src = "plz.png";
  finalResultSecond.innerHTML = "請選擇";

  // 共用
  part2Btn.style.pointerEvents = "auto";
  part2BtnLoses.style.pointerEvents = "auto";
}
