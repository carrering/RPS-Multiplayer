var arrayCars = ["mustang","m3","porsche", "gt3", "ferrari", "f40", "ford", "model t"]

// create some buttons
function renderButton(){
    

    // first clear all the buttons
    $(".buttons-view").empty()
    
    for(i=0;i<arrayCars.length;i++){
        // make a button
        var newButton = $("<button>")
        // add a cars class
        newButton.addClass("cars")
        // make a data- attribute with the cars name
        newButton.attr("data-name",arrayCars[i])
        // create the button text
        newButton.text(arrayCars[i])
        // append this to the div holding all the buttons
        $(".buttons-view").append(newButton)


    }


}// end of function renderButton

// fuction to generate gifs of cars
function showMeTheCars(){

    // get the button clicked data- name
    var theCarIWant = $(this).attr("data-name")
    console.log(theCarIWant)
    // build the query url for giphy

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10&q="
    queryURL += theCarIWant





      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        $(".showmethegifs").empty()
        response.data.forEach(function(giphyObject){
          var img = $('<img>')
          var dataStill = giphyObject.images.fixed_height_still.url
          var dataAnimate = giphyObject.images.fixed_height.url
          var rating = giphyObject.rating
          var ratingTag = $('<div>')
          ratingTag.attr('class','rating')
          ratingTag.text(rating)         
          img.attr('src',dataAnimate)
          img.attr('class','giphy')
          img.attr('data-animate', dataAnimate)
          img.attr('data-still', dataStill)
          img.attr('data-state', 'animate')
          ratingTag.append(img)
          $(".showmethegifs").prepend(ratingTag)
        })
        console.log(response);
      });

}


// show me the buttons    
renderButton()


// Adding click event listeners to all elements with a class of "cars"
$(document).on("click", ".cars", showMeTheCars);


$(document).on("click", ".giphy", function() {
  
  var state = $(this).attr("data-state")

  console.log("giphy state:",state)
 
 if(state === 'still'){
   $(this).attr('src', $(this).attr('data-animate'))
   $(this).attr('data-state','animate')
 }
 else{
  $(this).attr('src', $(this).attr('data-still'))
   $(this).attr('data-state','still')       
 }

})




$("#add-gif").on("click", function() {

  // event.preventDefault() prevents submit button from trying to send a form.
        // Using a submit button instead of a regular button allows the user to hit
        // "Enter" instead of clicking the button if desired
        event.preventDefault();

  var newSearch = $("#gif-input").val().trim()
  var newButton = $("<button>")
  // add a cars class
  newButton.addClass("cars")
  // make a data- attribute with the cars name
  newButton.attr("data-name",newSearch)
  // create the button text
  newButton.text(newSearch)
  // append this to the div holding all the buttons
  $(".buttons-view").append(newButton)
})
