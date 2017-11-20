
  var config = {
    apiKey: "AIzaSyBw63r9Q8efU9XpDP2BmZhJc93OI2h1RtA",
    authDomain: "train-activity-f8823.firebaseapp.com",
    databaseURL: "https://train-activity-f8823.firebaseio.com",
    projectId: "train-activity-f8823",
    storageBucket: "train-activity-f8823.appspot.com",
    messagingSenderId: "708650196598"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var trainStart = moment($("#start-input").val().trim(), "HH:mm").format("X");
  var trainRate = $("#rate-input").val().trim();


var trains = {
  name: trainName,
  type: destination,
  start: trainStart,
  rate: trainRate
};

database.ref().push(trains);

console.log(trains.name);
console.log(trains.type);
console.log(trains.start);
console.log(trains.rate);

$("#train-name-input").val("");
$("#destination-input").val("");
$("#start-input").val("");
$("#rate-input").val("");

});

database.ref().on("child_added", function (childSnapshot, prevChildKey) {



  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().type;
  var trainStart = childSnapshot.val().start;
  var trainRate = childSnapshot.val().rate;

var fixTrainStart = moment(trainStart, "HH:mm").subtract(1, "years");

var currentTime = moment();

var diffTime = moment().diff(moment(fixTrainStart), "minutes");

var trainRemainder = diffTime % trainRate;

var trainMinutesAway = trainRate - trainRemainder;

var nextArrival = moment().add(trainMinutesAway, "minutes");

var nextTrainConverted = moment(nextArrival).format("HH:mm");


console.log(trainMinutesAway);






  $("#train-table > tbody").append("<tr>" + "<td>" + trainName + "</td>" + "<td>" + destination + 
    "</td>" + "<td>" + trainRate + "</td>" + "<td>" + nextTrainConverted + "</td>" + "<td>" + trainMinutesAway + "</td>" + "</tr>");




});