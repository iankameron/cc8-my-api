const {names, centers} = require("./names");

const skillScoreMap = {
  0: [15,15,15,15,15,10,5,5,3,2], // beginner
  1: [5,5,10,10,15,20,10,10,10,5],
  2: [2,0,0,2,2,5,8,15,25,25,16],
  3: [1,1,1,1,2,2,4,5,20,37,26],
  4: [0,0,0,0,1,1,2,4,15,30,47]  // experienced
}

const createScoreThresholds = (array) => {
  let outputArray = [];
  let currentTotal = 0;
  for (let i = 0; i < array.length; i++) {
    currentTotal += array[i];
    outputArray.push(currentTotal);
  }
  return outputArray;
}

const createRandomScore = (skillLevel, pinsThere) => {
  const randomNumber = Math.floor((Math.random()*101));
  const thresholdMap = createScoreThresholds(skillScoreMap[skillLevel]);
  for (let i = 0; i < thresholdMap.length; i++) {
    if (randomNumber <= thresholdMap[i]) {
      let score = Math.ceil(pinsThere * i / 10 );
      return score;
    }
  }
};

const createFrame = (frameNumber, skillLevel, fill) => {
  let frame = "";
  let firstThrow = createRandomScore(skillLevel,10);
  if (firstThrow === 10) {
    frame = "S";
    if (frameNumber === 10) {
      if (fill === undefined) {
        frame += createFrame(10, skillLevel, 2);
        return frame;
      }
      else if (fill === 2) {
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
        frame += createFrame(10,1,1);
      }
    }
  }  
  return frame;
}

const createGame = (skillLevel) => {
  game = "";
  for (let i = 1; i <= 10; i++) {
    game += createFrame(i, skillLevel);
  }
  return game;
}

const getScore = (scoreSheet) => {
  const scoreToPointsMap = {0: 0,  1: 1,  2: 2,  3: 3,  4: 4,  5: 5,  6: 6,  7: 7,  8: 8,  9: 9,  "P": 10,  "S": 10};
  return scoreToPointsMap[scoreSheet];
}

const calculateScore = (game) => {
  let totalScore = 0;
  let scoreValue = null;
  let frameNumber = 1;
  let i = 0;
  while (frameNumber < 11){
    scoreValue = getScore(game[i]);
    if (scoreValue < 10) {
      if (game[i+1] !== "P") {
        totalScore += scoreValue;
        totalScore += getScore(game[i+1]);
      } else {
        totalScore += 10; // add 10 for spare
        totalScore += getScore(game[i+2]); // add first ball after spare
      }
      i += 2; 
    }
    else  { // Strike case
      totalScore += 10;
      if (game[i + 2] === "P") {
        totalScore += 10
      } else {
        totalScore += getScore(game[i + 1]);
        totalScore += getScore(game[i + 2]);
      }
      i += 1;
    }
    frameNumber ++;
  }
  return totalScore;
}

// TESTING
console.log(createScoreThresholds(skillScoreMap[0]));
console.log(createScoreThresholds(skillScoreMap[1]));
console.log(createScoreThresholds(skillScoreMap[2]));
console.log(createScoreThresholds(skillScoreMap[3]));
console.log(createScoreThresholds(skillScoreMap[4]));

console.log(createGame(0));
console.log(createGame(1));
console.log(createGame(2));
console.log(createGame(3));
console.log(createGame(4));

console.log(calculateScore(createGame(0)));
console.log(calculateScore(createGame(1)));
console.log(calculateScore(createGame(2)));
console.log(calculateScore(createGame(3)));
console.log(calculateScore(createGame(4)));

console.log("102",calculateScore("8171817P81729090S51".toUpperCase()));
console.log("183",calculateScore("7ps8p728ps9p8ps8p9".toUpperCase()));
console.log("143",calculateScore(["0","0","S","7","0","8","0","6","0","8","P","S","S","7","P","S","8","0"]));
console.log("196",calculateScore(["S","9","P","S","S","8","P","7","1","S","S","7","P","9","P","7"]));

// Test average 1st ball, 2nd ball, and frame scores for a given skill level
const createSeriesAndAverage = (numOfTimes, skillLevel)  => {
  let scoreSeriesFirst = [];
  let scoreSeriesSecond = [];
  let scoreSeriesTotal = [];
  let gameSeries = [];
  let strikes = 0;
  let spares = 0;
  let marks = 0;
  for (let i = 1; i <= numOfTimes; i++) {
    let firstThrow = createRandomScore(skillLevel,10);
    let secondThrow = createRandomScore(skillLevel, 10 - firstThrow);
    let total = firstThrow + secondThrow;
    scoreSeriesFirst.push(firstThrow);
    scoreSeriesSecond.push(secondThrow);
    scoreSeriesTotal.push(total);
    gameSeries.push(calculateScore(createGame(skillLevel)));
    if (gameSeries[gameSeries.length-1] === 300) console.log("300");
    if (firstThrow === 10) {strikes++}
    if (total === 10) {marks++}
    if (total === 10 && secondThrow !== 0 ) {spares++}
  }
  let averageScoreFirst = scoreSeriesFirst.reduce((a,b) => a+b) / scoreSeriesFirst.length;
  let averageScoreSecond = scoreSeriesSecond.reduce((a,b) => a+b) / scoreSeriesSecond.length;
  let averageScoreTotal = scoreSeriesTotal.reduce((a,b) => a+b) / scoreSeriesTotal.length;
  let highGame = gameSeries.reduce((a,b)=> a>b?a:b);
  let lowGame = gameSeries.reduce((a,b)=> a<b?a:b);
  let averageGame =   gameSeries.reduce((a,b)=> a+b) / scoreSeriesTotal.length;
  console.log(averageScoreFirst, averageScoreSecond, averageScoreTotal);
  console.log(marks, strikes,spares);
  console.log(lowGame,averageGame,highGame)
}

// createSeriesAndAverage(1000, 4);
