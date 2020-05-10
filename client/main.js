(function() {

  document.getElementById("button").addEventListener("click", lookupQuery);


  // The mega function that does it all when user clicks the submit button
  function lookupQuery() {

  // clears the previous lookup of tweets
  clearPreviousTweets()

  // Whatever value the user selects from dropdown menu
  var searchTerm = document.getElementById("search-term").value

   // ===============================
   // display search term
   // ===============================
   // function displaySearchTerm(){
   //   document.getElementById('search-term-description').innerHTML = searchTerm
   //   // showResultParagraph();
   // }
   // displaySearchTerm();



  //===============================
  // The axios call to the server
  //===============================
  // using the user's inputted query
  function axiosCall(searchTerm){

    console.log("Main.js: The search-term is:", searchTerm)

    // When in development:
    axios.get(`http://localhost:3000/tweets/${searchTerm}`)

    // When in production
    // axios.get(`https://nofrillztwitter.herokuapp.com/tweets/${searchTerm}`)

    .then(function (response) {

      console.log("the response is:", response);

      //here in the promise, we display the tweets
      displayTweets(response);

    })
    .catch(function (error) {
      console.log(error);
    });
  }
  axiosCall(searchTerm);


  // ===============================
  // clears the list of tweets
  // ===============================
  function clearPreviousTweets() {
    // Removes an element from the document
    var tweetsList = document.getElementById('twitter-feed');

    // As long as <ul> has a child node, remove it
   while (tweetsList.hasChildNodes()) {
     tweetsList.removeChild(tweetsList.firstChild);
   }

  }



  // ===============================
  // display a list of tweets
  // ===============================
  function displayTweets(response){

    // console.log(`response.data[0].text:`, response.data[0].text)

    for (var i = 0; i < response.data.length; i++) {
      console.log("hihihi")


      function listSingleTweet(element) {
        return document.createElement(element);
      }

      function append(parent, el) {
        return parent.appendChild(el);
      }

      var ul = document.getElementById('twitter-feed');
      var li = listSingleTweet('li');
      var span = listSingleTweet('span');

      var tweetBody = response.data[i].text


      // if there are tweets
      if (tweetBody.includes(`${searchTerm}`)) {
        span.innerHTML = `${response.data[i].text}`

        append(li, span);
        append(ul, li);

        }
      }

   }



}

}
)();
