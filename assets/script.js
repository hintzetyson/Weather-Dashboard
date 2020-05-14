// array to hold the searched cities 
var cities = [];
// var to grab the date 
var day = new Date().toDateString();
//vars to grab city lat and lon out of local storage 
var cityLS = localStorage.getItem("Searched City")
var lonLS = localStorage.getItem("lon")
var latLS = localStorage.getItem("lat")

// standard API 
var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + "kaysville" + '&appid=dc726fd3d02ce0beabb35f8feeef04c7';

$.ajax({
    url: queryURL,
    method: 'GET'
}).then(function (response) {
    console.log(response)

    //vars to hold the longitude and latitude to be used 
    var lon = response.coord.lon
    var lat = response.coord.lat
    $('.city').html("<h1>" + "City: " + response.name + "</h1>");
    //convert to MPH
    var windMPH = (response.wind.speed * 2.237);

    $(".wind").text("Wind Speed: " + windMPH.toFixed(1) + " Miles per Hour");
    $(".humidity").text("Humidity: " + response.main.humidity + "%");
    //var to store conversion from kelvin to fahrenheit 
    var tempF = (response.main.temp - 273.15) * 1.80 + 32;
    //displays the current temp in fahrenheit
    $(".tempF").text("Current Temperature (F): " + tempF.toFixed(0));
    //var to store conversion from kelvin to celsius 
    var tempC = (response.main.temp - 273.15);
    $(".tempC").text("Current Temperature (C): " + tempC.toFixed(0));
    $(".date").text("Date: " + day);