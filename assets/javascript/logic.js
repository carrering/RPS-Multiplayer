// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)
var config = {
    apiKey: "AIzaSyA93eGC8XVYhXUnEUoU7v5ICK34G6A1kAQ",
    authDomain: "carrering-first-project.firebaseapp.com",
    databaseURL: "https://carrering-first-project.firebaseio.com",
    projectId: "carrering-first-project",
    storageBucket: "",
    messagingSenderId: "305269109643"
  }
  firebase.initializeApp(config)
  
// Assign the reference to the database to a variable named 'database'
// var database = ...

var db = firebase.database()


var name = "";
var role = "";
var startDate = "01/01/2000";
var monthlyRate = 0;

$("#add-employee").on("click", function(event){
    event.preventDefault();

    name = $("#name-input").val().trim()
    role = $("#role-input").val().trim()
    startDate = $("#start-input").val()
    monthlyRate = parseInt($("#rate-input").val())

    console.log(name)
    console.log(role)
    console.log(startDate)
    console.log(monthlyRate)

    db.ref().push({
      name: name,
      role: role,
      startDate: startDate,
      monthlyRate: monthlyRate,
      dateAdded: firebase.database.ServerValue.TIMESTAMP  
    })
})


var databasePush = []


db.ref().orderByChild("dateAdded").on("child_added", function(childSnapshot) {

var empStartPretty = moment.unix(empStart).format("MM/DD/YY")

var empMonths = moment()

// var tr = $(`<tr data-key=${childSnapshot.key}>`)
// tr.append($('<td>').text(empName))

    var employeeRow = $("<div>")
    employeeRow.attr("class","row employee-data-row")
    var nameCol = $("<div>")
    nameCol.attr("class","col-md-2 employee-name-column")
    nameCol.text(childSnapshot.val().name)
    var roleCol = $("<div>")
    roleCol.attr("class","col-md-2 employee-role-column")
    roleCol.text(childSnapshot.val().role)
    var startCol = $("<div>")
    startCol.attr("class","col-md-2 employee-start-column")
    startCol.text(childSnapshot.val().startDate)
    var monthsBilled = 100
    var monthsCol = $("<div>")
    monthsCol.attr("class","col-md-2 employee-billed-column")
    monthsCol.text(monthsBilled)
    var rateCol = $("<div>")
    rateCol.attr("class","col-md-2 employee-rate-column")
    rateCol.text(childSnapshot.val().monthlyRate)
    var totalBilled = childSnapshot.val().monthlyRate * monthsBilled
    var totalCol = $("<div>")
    totalCol.attr("class","col-md-2 employee-total-column")
    totalCol.text(totalBilled)
    employeeRow.append(nameCol)
    employeeRow.append(roleCol)
    employeeRow.append(startCol)
    employeeRow.append(monthsCol)
    employeeRow.append(rateCol)
    employeeRow.append(totalCol)
    $("#employee-header-row").append(employeeRow)
    console.log(childSnapshot.val().name)
}, function(errorObject){
    console.log("got an error")
})




// Initial Values
// var initialBid = 0;
// var initialBidder = "No one :-(";
// var highPrice = initialBid;
// var highBidder = initialBidder;

// db.ref().push({
//     initialBid: initialBid,
//     initialBidder: initialBidder,
//     highPrice: initialBid,
//     highBidder: initialBidder,
//     dateAdded: firebase.database.ServerValue.TIMESTAMP
// })


//db.ref(/members).push


// db.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){

// })
// --------------------------------------------------------------

//  At the page load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.

// Capture Button Click
// $("#submit-bid").on("click", function() {
//     // Don't refresh the page!
//     event.preventDefault();
//     console.log("highPrice:",highPrice)

//     var currentBidder = $("#bidder-name").val().trim()
//     var currentPrice = parseFloat($("#bidder-price").val().trim())

//     if(currentPrice > highPrice){
//         $("#your-price").html("You are winning!")
//         highPrice = currentPrice
//         highBidder = currentBidder
//         db.ref().set({
//             initialBid: initialBid,
//             initialBidder: initialBidder,
//             highPrice: highPrice,
//             highBidder: highBidder
//         })
//     }
//     else{
//         $("#your-price").html("you are a cheapskate!")
//         console.log("you are a cheapskate!")
//     }


// })




// If Firebase has a highPrice and highBidder stored (first case)


// Set the variables for highBidder/highPrice equal to the stored values in firebase.
// highPrice = ...
// highBidder = ...
// db.ref().on("value", function(snapshot){
//     var val = snapshot.val()
//     if (!snapshot.val()) {
//       return
//     }
//     if (val){
//         highPrice = parseInt(val.highPrice)
//         highBidder = val.highBidder
//     }
//     $("#highest-bidder").text(val.highBidder)
//     $("#highest-price").text(val.highPrice)
//   })

// Change the HTML to reflect the stored values


// Print the data to the console.


// Else Firebase doesn't have a highPrice/highBidder, so use the initial local values.


// Change the HTML to reflect the initial values


// Print the data to the console.




// --------------------------------------------------------------

// Whenever a user clicks the submit-bid button

// prevent form from submitting with event.preventDefault() or returning false

// Get the input values


// Log the Bidder and Price (Even if not the highest)


// If Then statements to compare against previous high bidder


// Alert that they are High Bidder


// Save the new price in Firebase


// Log the new High Price


// Store the new high price and bidder name as a local variable (could have also used the firebase variable)


// Change the HTML to reflect the new high price and bidder

// Else tell user their bid was too low via alert