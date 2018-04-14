$( document ).ready(function() {
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

// Reset users
var userID = 1


var myGame = new game(1,"Player 1","",0,0,2,"Player 2", "",0,0)

var myChat = new chat("Chatbot","Welcome to RPS-Chat!")

// checkPlayerState(myGame.name)

updateUser(1,"Player 1",0,0,"")
updateUser(2,"Player 2",0,0,"")
gameData(1,0)
//create a player object
function game(id1, name1, rps1, win1, loss1, id2, name2, rps2, win2, loss2){
  this.id1 = id1
  this.name1 = name1
  this.rps1 = rps1
  this.win1 = win1
  this.loss1 = loss1
  this.id2 = id2
  this.name2 = name2
  this.rps2 = rps2
  this.win2 = win2
  this.loss2 = loss2
}


//create chat object
function chat(name, message){
  this.name = name
  this.message = message
}



// checkPlayerState()
// console.log("checking player state:")

$(document).on("click", "#add-message", function() { 
  event.preventDefault();
  //  getUser()
  // checkPlayerTurn()
  //playTheGame()

  $("#textArea").append(myChat.name + ":&nbsp;" + myChat.message + "<br>")
    
})


$(document).on("click", "#add-player", function() { 
    event.preventDefault();
    var name = $("#name-input").val().trim()

    //need to see if player 1 is taken or not.



    var myChat = new chat(1,[""])


    

    // $(".add-player").hide()
    // console.log(db.ref('users'))

    // console.log(name)
    // console.log(numberWins)
    // console.log(numberLosses)
    
    //writeUserData(name,rpsChosen,numberWins,numberLosses)
    checkPlayerState(name)
    gameData(1,0)
    // db.ref().push({
    //   name: name,
    //   playerChosen: playerChosen,
    //   rpsChosen: rpsChosen,
    //   numberWins: numberWins,
    //   numberLosses:numberLosses,
    //   dateAdded: firebase.database.ServerValue.TIMESTAMP  
    // })
})
// End Add Player button event handler



function checkPlayerState(newName){//this function is called to see if player 1 or player 2 is active
  var rpsChosen = ""
  var numberWins = 0
  var numberLosses = 0
  var checkP1 = 0
  
  myGame.name = newName
  myGame.win = numberWins
  myGame.loss = numberLosses

  // if(newName==="New Player"){
  //   $(".add-player").show()
  // }

  var userRef = db.ref("users/1").child("name")


//lets check player 1



  userRef.once("value", function(snapshot){
    var pName = snapshot.val()
    
    console.log("cPS: ",pName)  
      if(pName === "Player 1"){//oh nobody is player 1 so return 1
        myGame.id1 = 1
        myGame.name1 = newName
        $("#player1-name").html(name)
        writeUserData(1,newName,0,0,"")
        $(".add-player").hide()
        checkP1=1
        }
      else{
        //Player 1 is assigned. you are player two
        checkP1=2
      }
        
        gameData(2,0)
    })  

    console.log(checkP1)

    if(checkP1===2){
    $("#player2-name").html(name)
     writeUserData(2,newName,0,0,"")
     $(".add-player").hide()
    }

  }




function writeUserData(id, name, rpsChosen, numberWins, numberLosses) {
  var playersRef = db.ref("users/")  
  if(id===1){
    playersRef.update({
      1:{
        name: name,
        numberWins: numberWins,
        numberLosses: numberLosses,
        rpsChosen: "",
        dateAdded: firebase.database.ServerValue.TIMESTAMP    
  
      }
                 })
  }// end if
  else if(id===2){
    console.log("hey im writing for p2 now")
    playersRef.update({
      2:{
        name: name,
        numberWins: numberWins,
        numberLosses: numberLosses,
        rpsChosen: "",
        dateAdded: firebase.database.ServerValue.TIMESTAMP        
      }
                 })
  }// end else if    

  }

  function gameData(turn,whowon) {
    var turnRef = db.ref("game/")      
    turnRef.set({
      1:{
        turn: turn,
        whowon: whowon,
        dateAdded: firebase.database.ServerValue.TIMESTAMP    
  
        }
      })
    }
  

  function updateUser(userid,name,numberWins,numberLosses,rpsChosen){
    if(userid === 1){
      var p1Ref = db.ref("users/1")
        p1Ref.update ({
        "name": name,
        "numberWins": numberWins,
        "numberLosses": numberLosses,
        "rpsChosen":rpsChosen,
        dateAdded: firebase.database.ServerValue.TIMESTAMP  
        })
    }
    else if(userid === 2){
      var p2Ref = db.ref("users/2")
      p2Ref.update ({
      "name": name,
      "numberWins": numberWins,
      "numberLosses": numberLosses,
      "rpsChosen":rpsChosen,
      dateAdded: firebase.database.ServerValue.TIMESTAMP  
      })
    }
  }

  // PLAYER 1 SELECTS RPS
  $(document).on("click", ".p1rps", function() {  
    var state = $(this).attr("data-name")
    console.log("name:",state)
    var currentTurn
    var gameRef = db.ref("game/1").child("turn")
    gameRef.once("value", function(snapshot){
    currentTurn = snapshot.val()   
    console.log("OO1:",currentTurn)  
      if(currentTurn === 1){//player 1 turn
        $("#player1-rps").html("<h3>"+state+"</h3>")
        myGame.rps1=state
        var p1Ref = db.ref("users/1")
        console.log("iamfiring")
        p1Ref.update ({
        "rpsChosen": state
        })
        gameData(2,0)
      }
      console.log("P1snapshot turn:",currentTurn)
    })  
  })
  
  // PLAYER 2 SELECTS RPS
  $(document).on("click", ".p2rps", function() {  
    var state = $(this).attr("data-name") 
    console.log("name:",state)
    var currentTurn
    var gameRef = db.ref("game/1").child("turn")
    gameRef.once("value", function(snapshot){
    currentTurn = snapshot.val()     
    console.log("OO2:",currentTurn)  
      if(currentTurn === 2){//player 2 turn
        myGame.rps2=state
        $("#player2-rps").html("<h3>"+state+"</h3>")
        var p2Ref = db.ref("users/2")
        p2Ref.update ({
        "rpsChosen": state
        })
        playTheGame()
        gameData(1,0)
      }
      console.log("P2snapshot turn:",currentTurn)
    }) 
  })
  



db.ref().on('value', function(snapshot) {
  if (!snapshot.val()) {
    return
  }

myGame.name1 = snapshot.child("users").child("1").val().name
myGame.win1 = snapshot.child("users").child("1").val().numberWins
myGame.loss1 = snapshot.child("users").child("1").val().numberLosses
myGame.rps1 = snapshot.child("users").child("1").val().rpsChosen

myGame.name2 = snapshot.child("users").child("2").val().name
myGame.win2 = snapshot.child("users").child("2").val().numberWins
myGame.loss2 = snapshot.child("users").child("2").val().numberLosses
myGame.rps2 = snapshot.child("users").child("2").val().rpsChosen

var whowon = snapshot.child("game").child("1").val().whowon

if(whowon===1){
  $("#results").html("Player 1 WINS!!!")
}
else if(whowon===2){
  $("#results").html("Player 2 WINS!!!")
}
else if(whowon===3){
  $("#results").html("Its a TIE!!!")
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



// db.ref().orderByChild("dateAdded").on("child_added", function(childSnapshot) {


//     var myName = childSnapshot.val().name
//     console.log("child name:",myName)

// })


// function to log on to and create player 1
// if player 1 does not say player 1 then this will be player 2.
// if it says player 1 or doesn't exist create player 1 with name







function playTheGame(){

  if(myGame.rps1===myGame.rps2){
    //tie
    $("#results").html("IT'S A TIE!!!")
  }
  else if(myGame.rps1==="paper" && myGame.rps2==="rock"){

    var gRef = db.ref("turn/1")
    p2Ref.update ({
    "whowon":1
    })


    
  }
  else if(myGame.rps1==="paper" && myGame.rps2==="scissors"){
    $("#results").html("Player 2 WINS!!!")
  }
  else if(myGame.rps1==="scissors" && myGame.rps2==="rock"){
    $("#results").html("Player 2 WINS!!!")
  }
  else if(myGame.rps1==="scissors" && myGame.rps2==="paper"){
    $("#results").html("Player 1 WINS!!!")
  }
  else if(myGame.rps1==="rock" && myGame.rps2==="scissors"){
    $("#results").html("Player 1 WINS!!!")
  }
  else if(myGame.rps1==="rock" && myGame.rps2==="paper"){
    $("#results").html("Player 2 WINS!!!")
  }
  // var winRef = db.ref().child("users").child("1").child('numberWins');

  // winRef.transaction(function(currentNumberWins) {
  //    return currentNumberWins + 1;
  // })

}






// function checkPlayerTurn(){

//   var userRef = db.ref("users/1").child("name")
//   userRef.once("value", function(snapshot){
//     var currentTurn = snapshot.val()     
//       if(currentTurn === 1){//player 1 turn
//         $("#player1-rps").html("<h3>"+state+"</h3>")
//         var p1Ref = db.ref("users/1")
//         p1Ref.update ({
//         "rpsChosen": state
//         })
//         gameData(2)
//       }
//       console.log("P1snapshot xxx turn:",currentTurn)
//     })  


  
//   var playersRef = db.ref("users/")
//   // var player1name = playersRef[1].name 
//   // var player2name = db.ref("users/").child("2").val().name 
//   //  $("#tester").html=player1name
//   console.log(playersRef)
  
// }


})