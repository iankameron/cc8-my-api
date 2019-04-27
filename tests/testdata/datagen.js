const fs = require("fs");
const { centers } = require("./centers");
const { names } = require("./names");
// const {
//   skillScoreMap,
//   createScoreThresholds,
//   createRandomScore,
//   createFrame,
//   createGame,
//   getScore,
//   calculateScore
// } = require("./util");

//console.log(createFrame);

const skillScoreMap = {
  0: [15, 15, 15, 15, 15, 10, 5, 5, 3, 2], // beginner
  1: [5, 5, 10, 10, 15, 20, 10, 10, 10, 5],
  2: [2, 0, 0, 2, 2, 5, 8, 15, 25, 25, 16],
  3: [1, 1, 1, 1, 2, 2, 4, 5, 20, 37, 26],
  4: [0, 0, 0, 0, 1, 1, 2, 4, 15, 30, 47] // experienced
};

// create member data
let allMembers = [];
let memberCounter = 1;
for (let center of centers) {
  for (let memberNum = 1; memberNum <= center.max_lanes * 4; memberNum++) {
    let nameSex = getRandomNameAndSex();
    allMembers.push({
      id: memberCounter,
      name: nameSex.name,
      centerId: center.id,
      skillLevel: 2 + Math.floor(3 * Math.random())
    });
    memberCounter++;
  }
}
fs.writeFileSync("./memberData.json", JSON.stringify(allMembers));

// create member lane games
let laneGames = [];
let laneGameCounter = 1;
let startDate = "2019-1-1";
let endDate = "2019-2-1";
let startDayNum = Date.parse(startDate);
let endDayNum = Date.parse(endDate) - 1;
let laneGameDateNum = null;

let laneGameDate = new Date();
// let startHour = 10 + Math.floor(Math.random() * (20 - 10));
// console.log(typeof startHour);
// laneGameDateNum = startDayNum + Math.random() * (endDayNum - startDayNum);
// laneGameDate.setTime(laneGameDateNum);
// laneGameDate.setHours(startHour);

// laneGameDate.setHours();
for (let center of centers) {
  for (
    let laneGameNum = 1;
    laneGameNum <= center.max_lanes * 2 * 30;
    laneGameNum++
  ) {
    let startHour = 10 + Math.floor(Math.random() * (20 - 10));
    laneGameDateNum = startDayNum + Math.random() * (endDayNum - startDayNum);
    laneGameDate = new Date();
    laneGameDate.setTime(laneGameDateNum);
    laneGameDate.setHours(startHour);
    let numOfBowlers = 1 + Math.floor(Math.random() * 4);
    laneGames.push({
      id: laneGameCounter,
      centerId: center.id,
      startTime: laneGameDate,
      numOfBowlers
    });
    laneGameCounter++;
  }
}
fs.writeFileSync("./laneGameData.json", JSON.stringify(laneGames));

// create actual game data for all member bowlers
let playerGames = [];
let numOfMembers = allMembers.length;
let playerGameCounter = 1;
for (let laneGame in laneGames) {
  // console.log("laneGame");
  for (let bowler = 1; bowler <= laneGames[laneGame].numOfBowlers; bowler++) {
    randMemberId = 1 + Math.floor(Math.random() * numOfMembers);
    randMember = allMembers.filter(member => (member.id = randMemberId))[0];
    // if (laneGame.id < 10) {
    //   console.log(laneGame.id, randMemberId);
    // }
    let scoreDetails = createGame(randMember.skillLevel);
    let finalScore = calculateScore(scoreDetails);
    playerGames.push({
      id: playerGameCounter,
      lane_game_id: laneGames[laneGame].id,
      memberId: randMemberId,
      finalScore,
      scoreDetails
    });
    playerGameCounter++;
  }
}

fs.writeFileSync("./playerGameData.json", JSON.stringify(playerGames));

function getRandomNameAndSex() {
  let randomInt = Math.floor(Math.random() * names.length);
  return names[randomInt];
}

function createScoreThresholds(array) {
  let outputArray = [];
  let currentTotal = 0;
  for (let i = 0; i < array.length; i++) {
    currentTotal += array[i];
    outputArray.push(currentTotal);
  }
  return outputArray;
}

function createRandomScore(skillLevel, pinsThere) {
  const randomNumber = Math.floor(Math.random() * 101);
  const thresholdMap = createScoreThresholds(skillScoreMap[skillLevel]);
  for (let i = 0; i < thresholdMap.length; i++) {
    if (randomNumber <= thresholdMap[i]) {
      let score = Math.ceil((pinsThere * i) / 10);
      return score;
    }
  }
}

function createFrame(frameNumber, skillLevel, fill) {
  let frame = "";
  let firstThrow = createRandomScore(skillLevel, 10);
  if (firstThrow === 10) {
    frame = "S";
    if (frameNumber === 10) {
      if (fill === undefined) {
        frame += createFrame(10, skillLevel, 2);
        return frame;
      } else if (fill === 2) {
        frame += createFrame(10, skillLevel, 1);
        return frame;
      }
      // do nothing for last fill ball case
    }
  } else {
    if (fill === 1) {
      frame += String(firstThrow);
      return frame; // stop processing if for a fill ball
    }
    let secondThrow = createRandomScore(skillLevel, 10 - firstThrow);
    let total = firstThrow + secondThrow;
    if (total !== 10) {
      frame = String(firstThrow) + String(secondThrow);
    } else {
      frame = String(firstThrow) + "P";
      if (frameNumber === 10 && fill === undefined) {
        frame += createFrame(10, 1, 1);
      }
    }
  }
  return frame;
}

function createGame(skillLevel) {
  let game = "";
  for (let i = 1; i <= 10; i++) {
    game += createFrame(i, skillLevel);
  }
  return game;
}

function getScore(scoreSheet) {
  const scoreToPointsMap = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    P: 10,
    S: 10
  };
  return scoreToPointsMap[scoreSheet];
}

function calculateScore(game) {
  let totalScore = 0;
  let scoreValue = null;
  let frameNumber = 1;
  let i = 0;
  while (frameNumber < 11) {
    scoreValue = getScore(game[i]);
    if (scoreValue < 10) {
      if (game[i + 1] !== "P") {
        totalScore += scoreValue;
        totalScore += getScore(game[i + 1]);
      } else {
        totalScore += 10; // add 10 for spare
        totalScore += getScore(game[i + 2]); // add first ball after spare
      }
      i += 2;
    } else {
      // Strike case
      totalScore += 10;
      if (game[i + 2] === "P") {
        totalScore += 10;
      } else {
        totalScore += getScore(game[i + 1]);
        totalScore += getScore(game[i + 2]);
      }
      i += 1;
    }
    frameNumber++;
  }
  return totalScore;
}
