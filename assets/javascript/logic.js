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

var userID = 1

//create a player object
function game(id, name, win, loss){
  this.id = id
  this.name = name
  this.win = win
  this.loss = loss
}


//create chat object
function chat(id, message){
  this.id = id
  this.message = message
}

var myGame = new game(1,"Test Bot",0,0)

var myChat = new chat(1,[""])


$( document ).ready(function() {
  console.log( "ready!" );

    // var name = "Player 1"
    // var rpsChosen = ""
    // var numberWins = 0
    // var numberLosses = 0
    
    // writeUserData(name,rpsChosen,numberWins,numberLosses)

})

$("#add-message").on("click", function(event){
  //  getUser()
  checkPlayer2()
  //playTheGame()
    
})



$("#add-player").on("click", function(event){
    event.preventDefault();

    var name = $("#name-input").val().trim()
    var rpsChosen = ""
    var numberWins = 0
    var numberLosses = 0


    myGame.id = 1
    myGame.name = name
    myGame.win = numberWins
    myGame.loss = numberLosses
    new game(1,"Test Bot",0,0)

    var myChat = new chat(1,[""])


    $("#player1-name").html(name)

    $(".add-player").hide()
    console.log(db.ref('users'))

    console.log(name)
    console.log(numberWins)
    console.log(numberLosses)
    
    writeUserData(name,rpsChosen,numberWins,numberLosses)
    

    // db.ref().push({
    //   name: name,
    //   playerChosen: playerChosen,
    //   rpsChosen: rpsChosen,
    //   numberWins: numberWins,
    //   numberLosses:numberLosses,
    //   dateAdded: firebase.database.ServerValue.TIMESTAMP  
    // })
})

function checkPlayer2(){

  var playersRef = db.ref("users/")
  // var player1name = playersRef[1].name 
  // var player2name = db.ref("users/").child("2").val().name 
  //  $("#tester").html=player1name
  console.log(playersRef)
  
}

function writeUserData(name, rpsChosen, numberWins, numberLosses) {
  var playersRef = db.ref("users/")      
  playersRef.set({
    1:{
      name: name,
      numberWins: numberWins,
      numberLosses: numberLosses,
      rpsChosen: "",
      dateAdded: firebase.database.ServerValue.TIMESTAMP    

    },
    2:{
      name: "Player 2",
      numberWins: 0,
      numberLosses: 0,
      rpsChosen: "",
      dateAdded: firebase.database.ServerValue.TIMESTAMP    
  
    }
               })
  }

  function gameData(turn) {
    var turnRef = db.ref("game/")      
    turnRef.set({
      1:{
        turn: turn,
        dateAdded: firebase.database.ServerValue.TIMESTAMP    
  
        }
      })
    }
  

  function updateUser(userid,name,numberWins,numberLosses,rpsChosen){

    var playersRef = db.ref("users/")

    if(userid === 1){
      playersRef.push({
        1:{
          name: name,
          numberWins: numberWins,
          numberLosses: numberLosses,
          rpsChosen: rpsChosen
        }
    })
  }
  else if(userid === 2){
    playersRef.push({
      2:{
        name: name,
        numberWins: numberWins,
        numberLosses: numberLosses,
        rpsChosen: rpsChosen
      }
    })
  }
  

    // var userId = firebase.auth().currentUser.uid;
    // return db.ref('/users/' + userId).once('value').then(function(snapshot) {
    //   var username = (snapshot.val() && snapshot.val().name) || 'Anonymous';
    //   console.log('my username is:',username)
    // });
  }


  $(document).on("click", ".p1rps", function() {
  
    var state = $(this).attr("data-name")
    console.log("name:",state)
    var currentTurn
    var gameRef = db.ref("game/1").child("turn")
    gameRef.once("value", function(snapshot){

      currentTurn = snapshot.val()
      
      
      if(currentTurn === 1){//player 1 turn
        $("#player1-rps").html("<h3>"+state+"</h3>")
        var p1Ref = db.ref("users/1")
        p1Ref.update ({
        "rpsChosen": state
        })
        gameData(2)
      }
      console.log("P1snapshot turn:",currentTurn)

    })

   
    
  
  })
  

  $(document).on("click", ".p2rps", function() {
  
    var state = $(this).attr("data-name") 
    console.log("name:",state)
    var currentTurn
    var gameRef = db.ref("game/1").child("turn")
    gameRef.once("value", function(snapshot){

      currentTurn = snapshot.val()
     
      
      if(currentTurn === 2){//player 1 turn
        $("#player2-rps").html("<h3>"+state+"</h3>")
        var p2Ref = db.ref("users/2")
        p2Ref.update ({
        "rpsChosen": state
        })
        gameData(1)
      }

      console.log("P2snapshot turn:",currentTurn)
    })

  
  })
  

// db.ref().orderByChild("dateAdded").on("child_added", function(childSnapshot) {


//     var myName = childSnapshot.val().name
//     console.log("child name:",myName)

// })


// function to log on to and create player 1
// if player 1 does not say player 1 then this will be player 2.
// if it says player 1 or doesn't exist create player 1 with name







// function playTheGame(){
//   var winRef = db.ref().child("users").child("1").child('numberWins');

//   winRef.transaction(function(currentNumberWins) {
//      return currentNumberWins + 1;
//   })

// }


db.ref().on('value', function(snapshot) {
  if (!snapshot.val()) {
    return
  }

  $('#player1-name').text( snapshot.child("users").child("1").val().name )
  $("#player1-win-count").text( snapshot.child("users").child("1").val().numberWins)
  $("#player1-loss-count").text( snapshot.child("users").child("1").val().numberLosses)

  $('#player2-name').text( snapshot.child("users").child("2").val().name )
  $("#player2-win-count").text( snapshot.child("users").child("2").val().numberWins)
  $("#player2-loss-count").text( snapshot.child("users").child("2").val().numberLosses)
  // console.log(snapshot.val())
},
function(error) {
  console.error('Firebase error: ', error)

})



// checkPlayer2()

