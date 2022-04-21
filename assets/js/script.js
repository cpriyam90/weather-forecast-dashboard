// *CITATIONS/CREDITS BELOW*
// 1.Took assistance from my tutor Abdullah to think of logic and learn how to use API endpoints. With his help, I was able to understand and learn the logic and complete my assignment
// 2.Followed directions from my instructor Diego on using API endpoints and how to have my functions flow
// 3.Classmate Dimos helped me understand how to display weather icons based on information received from endpoint

//Define global variables
var input = document.getElementById("query")
var searchBtn = document.getElementById("searchBtn")

//Event listener added to search button display weather forecast
searchBtn.addEventListener("click", function(event) {
   event.preventDefault () 
   getLatLon(input.value)
   
})

//api key from weatherapi
var apiKey = "aca0281335faae7fed82a24be5cfe012"

//get api data for lat/lon 
function getLatLon (city) {
    var baseUrl = "https://api.openweathermap.org/data/2.5/weather?q="
    var restUrl ="&appid="
    fetch(baseUrl+city+restUrl+apiKey)
        .then(function (response){
            response.json()
            .then(function(data){
            })
        })
}
