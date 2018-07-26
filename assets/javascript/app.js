var config = {
	apiKey: "AIzaSyAbtTzFW1GIWd-2BJI9gkzjz5UnVl4Kxkw",
	authDomain: "train-scheduler-56648.firebaseapp.com",
	databaseURL: "https://train-scheduler-56648.firebaseio.com",
	projectId: "train-scheduler-56648",
	storageBucket: "",
	messagingSenderId: "637590030916"
};
firebase.initializeApp(config);
  var database = firebase.database();
  $('#addTrainBtn').on("click", function() {

	var trainName = $("#trainNameInput").val().trim();
	var destination = $("#destinationInput").val().trim();
	var firstTrain = moment($("#timeInput").val().trim(), "HH:mm").format("HH:mm");
	var frequency = $("#frequencyInput").val().trim();

	var newTrain = {
		name: trainName,
		place: destination,
		ftrain: firstTrain,
		freq: frequency
		}
		
	database.ref().push(newTrain);
	console.log(newTrain.name);

	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#timeInput").val("");
	$("#frequencyInput").val("");

	return false;
	});
	
  database.ref().on("child_added", function(childSnapshot) {
	console.log(childSnapshot.val());

	var trainName = childSnapshot.val().name;
	var destination = childSnapshot.val().place;
	var firstTrain = childSnapshot.val().ftrain;
	var frequency = childSnapshot.val().freq;

	var firstTimeConverted = moment(firstTrain, "HH:mm");
	console.log(firstTimeConverted);
	var currentTime = moment().format("HH:mm");
	console.log("CURRENT TIME: " + currentTime);

	var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
	console.log(firstTrain);
	console.log("Difference in Time: " + timeDiff);

	var timeRemainder = timeDiff % frequency;
	console.log(timeRemainder);

	var minToTrain = frequency - timeRemainder;

	var nxTrain = moment().add(minToTrain, "minutes").format("HH:mm");
	$("#trainTable>tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + nxTrain + "</td><td>" + frequency + "</td><td>" + minToTrain + "</td></tr>");
  });