//get data
var friendData = require("../data/friends");

module.exports = function(app) {

  app.get("/api/friends", function (req, res) {

    res.json(friendData);
  });

  app.post("/api/friends", function (req, res) {

    //new user input store
    var input = req.body;

    var inputScore = input.scores;

    //friend match obj
    var friendMatch = {
      name: "",
      photo: "",
      diff: 400
    };


    var incompScore = 0;

    for (var i = 0; i < friendData.length; i++) {
        incompScore = 0;

        for (var j = 0; j < friendData.length; j++) {
          incompScore += Math.abs(parseInt(inputScore[j]) - parseInt(friendData[i].scores[j]));

          if (incompScore <= friendMatch.diff) {
            friendMatch.name = friendData[i].name;
            friendMatch.photo = friendData[i].photo;
            friendMatch.diff = incompScore;
          }
        }
    }

     friendData.push(input);


     //find best friend match
    res.json(friendMatch);

  });

};



// var qResponses =
//   console.log(input);
//
// //array for userInput
// //need to add up values in array and get a Math.abs value to compare again friendData scores
// var userMatch = [];
// //placeholder for friend scores sum?
// var friendMatchSum = [];
//
// var friendMatchData = friendData.map(a => a.scores);
// console.log(friendMatchData);
//
// //check for user input on form, push to userMatch array
// for (var i = 0; i < input.scores.length; i++) {
//
//   var veryLikeInput = input.scores[i] === "5 (Strongly Agree)";
//   var noLikeInput = input.scores[i] === "1 (Strongly Disagree)";
//   var notSithInput = parseInt(input.scores[i]);
//   var checkInput = veryLikeInput ? input.scores[i] === 5 : noLikeInput ? input.scores[i] === 1 : notSithInput;
//
//   userMatch.push(checkInput);
//
// }
// //calculate user score total -- use this to compare against array of friend scores
// console.log(userMatch);
//
// var userMatchSum = userMatch => userMatch.reduce((a,b) => a + b, 0);
// console.log(userMatchSum());
// //calculate friends score total
// friendMatchData.forEach(function(val) {
//   console.log("wtf is val?" + val);
// });