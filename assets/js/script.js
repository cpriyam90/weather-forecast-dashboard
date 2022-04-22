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
                currentWeather(data.coord.lat,data.coord.lon)
                getDaily(data.coord.lat,data.coord.lon)
            })
        })
}

//create a function to display daily weather for city input by user
function currentWeather(lat,lon) {
    var baseUrl ="https://api.openweathermap.org/data/2.5/onecall?"
    var getLat ="lat=" + lat
    var getLon ="&lon=" + lon
    var restUrl ="&exclude=minutely,hourly,daily,alerts&units=imperial&appid="
    fetch(baseUrl+getLat+getLon+restUrl+apiKey)
        .then(function (response){
            response.json()
            .then(function(data){
                console.log(data)
                displayCurrentDay (data)
                CurrentDate ()
                
            })
    }) 

}

//Display weather for city pulled from api in weather card
function displayCurrentDay (data) {
    var cityName = document.querySelector(".city")
    cityName.innerText = input.value;
    var currentWeatherIconEl = $("#current-icon")
    currentWeatherIconEl.attr("src", "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png")
    var cityTemp = document.querySelector(".city-temp")
    var cityWind = document.querySelector(".city-wind")
    var cityHumidity = document.querySelector(".city-humidity")
    var cityUv = document.querySelector(".city-uv")
    cityTemp.textContent = "Temp: " + data.current.temp + "F"
    cityWind.textContent = "Wind Speed: " + data.current.wind_speed + "MPH"
    cityHumidity.textContent = "Humidity: " + data.current.humidity + "%"
    cityUv.textContent = "UV Index: " + data.current.uvi
    if (cityUv < 1) {
        cityUv.style.color = "Green"
    } else {
        cityUv.style.color = "Red"
    }
    input.value = ""
    
}

//function to display daily date
var CurrentDate = function() {
    var date = document.getElementById("date")
    var dateString = moment().format("MMM Do YY")
    console.log(dateString)
    date.innerText = dateString;
}

//function to display weekly forecast
var getDaily = function(lat,lon) {
    var baseUrl ="https://api.openweathermap.org/data/2.5/onecall?"
    var getLat ="lat=" + lat
    var getLon ="&lon=" + lon
    var restUrl ="&exclude=minutely,hourly,alerts&units=imperial&appid="
    fetch(baseUrl+getLat+getLon+restUrl+apiKey)
        .then(function (response){
            response.json()
            .then(function(data){
            console.log(data.daily)
            showForecast(data.daily)
        
        })
    })
}

//function to display weekly forecast to user in forecast card
var forecastContainer = document.querySelector('.dailyForecast')
var showForecast = function(data) {
    forecastContainer.innerHTML = ""
    for (var i = 1; i < data.length; ++i){
        const dayCard = document.createElement("div")
        dayCard.classList.add("forecastCard", "col-lg-2", "col-4")
        

        var date = document.createElement("h4")
        date.classList.add("weeklyDate")
        var dateString = moment.unix(data[i].dt).format("MM/DD/YYYY")
        date.textContent = dateString 
        dayCard.appendChild(date)
        //forecast cards will hold temp, wind, humidity, and weather icon
        //weekly temperature element
        var temp = document.createElement('div')
        temp.classList.add("weekly-forecast", "temp")
        temp.textContent = "Temp: " + data[i].temp.day + "F"
        dayCard.appendChild(temp)
        //image icon element
        var imgUrl = "https://openweathermap.org/img/wn/" + data[i].weather[0].icon + ".png"
        var img = document.createElement("img")
        img.setAttribute("src", imgUrl)
        dayCard.appendChild(img)
        //wind element
        var wind = document.createElement('div')
        wind.classList.add("weekly-forecast", 'wind')
        wind.textContent = "Wind: " + data[i].wind_speed + "MPH"
        dayCard.appendChild(wind)
        //humidity element
        var humidity = document.createElement('div')
        humidity.classList.add("weekly-forecast", "humidity")
        humidity.textContent = "Humidity: " + data[i].humidity + "%"
        dayCard.appendChild(humidity)
        
        forecastContainer.appendChild(dayCard)
        
    }
}