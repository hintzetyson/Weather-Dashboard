// array to hold the searched cities 
var cities = [];
// var to grab the date 
var day = new Date().toDateString();
//vars to grab city lat and lon out of local storage 
var cityLS = localStorage.getItem("Searched City")
var lonLS = localStorage.getItem("lon")
var latLS = localStorage.getItem("lat")

var city = $('#city-input').val().trim();

// standard API 
var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=dc726fd3d02ce0beabb35f8feeef04c7';

console.log(queryURL)


$('#searchCity').on('click', function (event) {

    var city = $('#city-input').val().trim();

// standard API 
var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=dc726fd3d02ce0beabb35f8feeef04c7';

event.preventDefault();

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
    //adds a button to the recently searched
    function recentlySearched() {
        $("#buttons-view").empty();

        for (var i = 0; i < cities.length; i++) {
            var button = $('<button>');
            //adds the bootstrap class being used for the buttons 
            button.addClass("btn btn-outline-info my-2 my-lg-0");
            button.attr("data-name", cities[i]);
            button.text(cities[i])
            $('#buttons-view').append(button)
        }
    }

    // $('#searchCity').on('click', function (event) {
        // event.preventDefault();
        // //grabs the city from the input 
        var city = $('#city-input').val().trim();
        //adds the searched city to the empty array of cities 
        cities.push(city);
        recentlySearched();

        localStorage.setItem("Searched City", city);
        console.log(city);
        console.log(lon)
        console.log(lat)
        // puts the lat and lon into local storage when a city is searched 
        localStorage.setItem("lon", lon)
        localStorage.setItem("lat", lat)
    // });
    console.log(city)

    // API used for UV index and 5 day forecast
    
    
    var queryURLTwo = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=dc726fd3d02ce0beabb35f8feeef04c7`
    
    $.ajax({
        url: queryURLTwo,
        method: 'GET'
    }).then(function (response) {
        console.log(response)
        
        $(".UVIndex").text("UV Index: " + response.current.uvi.toFixed(1));
        //variable to hold the response for main weather
        var weatherMain0 = response.current.weather[0].main;
        // this changes to an appropriate image
        if (weatherMain0 === "Clear") {
            $(".iconCurrent").attr("src", "assets/sun-128.png")
        }
        else if (weatherMain0 === "Drizzle", "Clouds") {
            $(".iconCurrent").attr("src", "assets/cloudy-128.png")
        }
        else if (weatherMain0 === "Rain") {
            $(".iconCurrent").attr("src", "assets/rain-cloud-128.png")
    }
    else if (weatherMain0 === "Snow") {
        $(".iconCurrent").attr("src", "assets/snow-128.png")
    }
    else if (weatherMain0 === "Thunderstorm") {
        $(".iconCurrent").attr("src", "assets/flash-cloud-128.png")
    }
    else {
        $(".iconCurrent").attr("src", "assets/rainbow-128.png")
    }
    
    // 1st forecast
    var dt1 = new Date(response.daily[1].dt * 1000);
    dt1 = moment(dt1).format("MM/DD/YYYY")
    $(".date1").text(dt1)
    var tempF1 = (response.daily[1].temp.day - 273.15) * 1.80 + 32;
    $(".tempF1").text("Temperature (F): " + tempF1.toFixed(0));
    var tempC1 = (response.daily[1].temp.day - 273.15);
    $(".tempC1").text("Temperature (C): " + tempC1.toFixed(0));
    var windMPH1 = (response.daily[1].wind_speed * 2.237)
    $(".wind1").text("Wind Speed: " + windMPH1.toFixed(0) + " Mph");
    $(".humidity1").text("Humidity: " + response.daily[1].humidity + "%");
    $(".UVIndex1").text("UV Index: " + response.daily[1].uvi.toFixed(1))
    
    var weatherMain1 = response.daily[1].weather[0].main;
    
    if (weatherMain1 === "Clear") {
        $(".icon1").attr("src", "assets/sun-128.png")
    }
    else if (weatherMain1 === "Drizzle", "Clouds") {
        $(".icon1").attr("src", "assets/cloudy-128.png")
    }
    else if (weatherMain1 === "Rain") {
        $(".icon1").attr("src", "assets/rain-cloud-128.png")
    }
    else if (weatherMain1 === "Snow") {
        $(".icon1").attr("src", "assets/snow-128.png")
    }
    else if (weatherMain1 === "Thunderstorm") {
        $(".icon1").attr("src", "assets/flash-cloud-128.png")
    }
    
    //------------------------------------------------------------------------------------------
    
    //------------------------------------------------------------------------------------------
    // 2/5 forecast 
    var dt2 = new Date(response.daily[2].dt * 1000);
    dt2 = moment(dt2).format("MM/DD/YYYY")
    $(".date2").text(dt2)
    var tempF2 = (response.daily[2].temp.day - 273.15) * 1.80 + 32;
    $(".tempF2").text("Temperature (F): " + tempF2.toFixed(0));
    var tempC2 = (response.daily[2].temp.day - 273.15);
    $(".tempC2").text("Temperature (C): " + tempC2.toFixed(0));
    var windMPH1 = (response.daily[2].wind_speed * 2.237)
    $(".wind2").text("Wind Speed: " + windMPH1.toFixed(0) + " Mph");
    $(".humidity2").text("Humidity: " + response.daily[2].humidity + "%");
    $(".UVIndex2").text("UV Index: " + response.daily[2].uvi.toFixed(1))
    
    var weatherMain2 = response.daily[2].weather[0].main;
    
    if (weatherMain2 === "Clear") {
        $(".icon2").attr("src", "assets/sun-128.png")
    }
    else if (weatherMain2 === "Clouds") {
        $(".icon2").attr("src", "assets/cloudy-128.png")
    }
    else if (weatherMain2 === "Rain") {
        $(".icon2").attr("src", "assets/rain-cloud-128.png")
    }
    else if (weatherMain2 === "Snow") {
        $(".icon2").attr("src", "assets/snow-128.png")
    }
    else if (weatherMain2 === "Thunderstorm") {
        $(".icon2").attr("src", "assets/flash-cloud-128.png")
    }
    
    //------------------------------------------------------------------------------------------
    
    //------------------------------------------------------------------------------------------
    // 3/5 forecast 
    var dt3 = new Date(response.daily[3].dt * 1000);
    dt3 = moment(dt3).format("MM/DD/YYYY")
    $(".date3").text(dt3)
    var tempF3 = (response.daily[3].temp.day - 273.15) * 1.80 + 32;
    $(".tempF3").text("Temperature (F): " + tempF3.toFixed(0));
    var tempC3 = (response.daily[3].temp.day - 273.15);
    $(".tempC3").text("Temperature (C): " + tempC3.toFixed(0));
    var windMPH3 = (response.daily[3].wind_speed * 2.237)
    $(".wind3").text("Wind Speed: " + windMPH3.toFixed(1) + " Mph");
    $(".humidity3").text("Humidity: " + response.daily[3].humidity + "%");
    $(".UVIndex3").text("UV Index: " + response.daily[3].uvi.toFixed(1))
    
    var weatherMain3 = response.daily[3].weather[0].main;
    
    if (weatherMain3 === "Clear") {
        $(".icon3").attr("src", "assets/sun-128.png")
    }
    else if (weatherMain3 === "Clouds") {
        $(".icon3").attr("src", "assets/cloudy-128.png")
    }
    else if (weatherMain3 === "Rain") {
        $(".icon3").attr("src", "assets/rain-cloud-128.png")
    }
    else if (weatherMain3 === "Snow") {
        $(".icon3").attr("src", "assets/snow-128.png")
    }
    else if (weatherMain3 === "Thunderstorm") {
        $(".icon3").attr("src", "assets/flash-cloud-128.png")
    }
    
    //------------------------------------------------------------------------------------------
    
    //------------------------------------------------------------------------------------------
    // 4/5 forecast 
    var dt4 = new Date(response.daily[4].dt * 1000);
    dt4 = moment(dt4).format("MM/DD/YYYY")
    $(".date4").text(dt4)
    var tempF4 = (response.daily[4].temp.day - 273.15) * 1.80 + 32;
    $(".tempF4").text("Temperature (F): " + tempF4.toFixed(0));
    var tempC4 = (response.daily[4].temp.day - 273.15);
    $(".tempC4").text("Temperature (C): " + tempC4.toFixed(0));
    var windMPH4 = (response.daily[4].wind_speed * 2.237)
    $(".wind4").text("Wind Speed: " + windMPH4.toFixed(1) + " Mph");
    $(".humidity4").text("Humidity: " + response.daily[4].humidity + "%");
    $(".UVIndex4").text("UV Index: " + response.daily[4].uvi.toFixed(1))
    
    var weatherMain4 = response.daily[4].weather[0].main;
    
    if (weatherMain4 === "Clear") {
        $(".icon4").attr("src", "assets/sun-128.png")
    }
    else if (weatherMain4 === "Clouds") {
        $(".icon4").attr("src", "assets/cloudy-128.png")
    }
    else if (weatherMain4 === "Rain") {
        $(".icon4").attr("src", "assets/rain-cloud-128.png")
    }
    else if (weatherMain4 === "Snow") {
        $(".icon4").attr("src", "assets/snow-128.png")
    }
    else if (weatherMain4 === "Thunderstorm") {
        $(".icon4").attr("src", "assets/flash-cloud-128.png")
    }
    
    //------------------------------------------------------------------------------------------
    
    //------------------------------------------------------------------------------------------
    // 5/5 forecast 
    var dt5 = new Date(response.daily[5].dt * 1000);
    dt5 = moment(dt5).format("MM/DD/YYYY")
    $(".date5").text(dt5)
    var tempF5 = (response.daily[5].temp.day - 273.15) * 1.80 + 32;
    $(".tempF5").text("Temperature (F): " + tempF5.toFixed(0));
    var tempC5 = (response.daily[5].temp.day - 273.15);
    $(".tempC5").text("Temperature (C): " + tempC5.toFixed(0));
    var windMPH5 = (response.daily[4].wind_speed * 2.237)
    $(".wind5").text("Wind Speed: " + windMPH5.toFixed(1) + " Mph");
    $(".humidity5").text("Humidity: " + response.daily[5].humidity + "%");
    $(".UVIndex5").text("UV Index: " + response.daily[5].uvi.toFixed(1))
    
    var weatherMain5 = response.daily[5].weather[0].main;
    
    if (weatherMain5 === "Clear") {
        $(".icon5").attr("src", "assets/sun-128.png")
    }
    else if (weatherMain5 === "Clouds") {
        $(".icon5").attr("src", "assets/cloudy-128.png")
    }
    else if (weatherMain5 === "Rain") {
        $(".icon5").attr("src", "assets/rain-cloud-128.png")
    }
    else if (weatherMain5 === "Snow") {
        $(".icon5").attr("src", "assets/snow-128.png")
    }
    else if (weatherMain5 === "Thunderstorm") {
        $(".icon5").attr("src", "assets/flash-cloud-128.png")
    }
    
})})});

