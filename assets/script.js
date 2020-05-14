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