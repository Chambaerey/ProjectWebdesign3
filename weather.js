var lat;
var lon;
var weather = new Object;
var containerToday = "#Today";
var containerTomorrow = "#Tomorrow";

$(document).ready(function () {
    //console.log("DEBUG MESSAGE - In document.ready function"); //for reviewing
    $("#tabs").tabs();
    GetPositionGeolocation();
});
function GetPositionGeolocation() {
    //console.log("DEBUG MESSAGE - In getPositionGeolocation function"); //for reviewing
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(GetSucces, GetFail);
    }
    else {
        console.error("ERROR - geolocation is not supported in this browser, IP location will be used");
        $(containerToday).append("<p>ERROR: Geolocation not supported, IP location will be used</p>");
        $(containerTomorrow).append("<p>ERROR: Geolocation not supported, IP location will be used</p>");
        GetPositionIP()
    }
}
function GetSucces(position) {
    //console.log("DEBUG MESSAGE - In Geolocation succes function"); //for reviewing
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    GetWeather(2);
};
function GetFail(error) {
    //console.log("DEBUG MESSAGE - In Geolocation Fail function"); //for reviewing
    if (navigator.userAgent.toLowerCase().indexOf('chrome') && document.location.hostname == "") {
        console.warn("chrome blocks geolocation for local files.");
    }
    console.error("ERROR - Geolocation Failed: " + error.message + ", IP location will be used");
    $(containerToday).append("<p>ERROR: " + error.message + ", IP location will be used</p>");
    $(containerTomorrow).append("<p>ERROR: " + error.message + ", IP location will be used</p>");
    GetPositionIP()
}



function GetWeather(days) {
    //console.log("DEBUG MESSAGE - In GetWeather function"); //for reviewing
    var wString = "http://api.openweathermap.org/data/2.5/forecast/daily?lat=" + lat + "&lon=" + lon + "&mode=json&cnt=" + days;
    $.ajax({
        url: wString,
        dataType: 'jsonp',
        success: function (json) {
            //generic info
            weather.city = json.city.name;
            //today
            weather.todayClouds = json.list[0].clouds;
            weather.todayId = json.list[0].weather[0].id;
            weather.todayDescription = json.list[0].weather[0].description;
            weather.todayTemp = Math.round(json.list[0].temp.day - 273, 15);
            weather.todayHumidity = json.list[0].humidity;
            weather.todayWindDeg = json.list[0].deg;
            weather.todayWindSpeed = (Math.round((json.list[0].speed * 1.60934) * 100) / 100)
            //tomorrow
            weather.tomoClouds = json.list[1].clouds;
            weather.tomoId = json.list[1].weather[0].id;
            weather.tomoDescription = json.list[1].weather[0].description;
            weather.tomoTemp = Math.round(json.list[1].temp.day - 273, 15);
            weather.tomoHumidity = json.list[1].humidity;
            weather.tomoWindDeg = json.list[1].deg;
            weather.tomoWindSpeed = (Math.round((json.list[1].speed * 1.60934) * 100) / 100)
            //appending in html
            //console.dir(weather); //for reviewing
            AppendText();
        }
    });

}

function AppendText() {
    //console.log("DEBUG MESSAGE - In Appendtext function"); //for reviewing
    weatherStringToday = GetBackground(weather.todayId);
    weatherStringTomo = GetBackground(weather.tomoId);
    $(containerToday).css('background-image', 'url(' + weatherStringToday + ')');
    $(containerToday).css('background-size', '100%');
    $(containerToday).append("<p>Location: " + weather.city
                            + "</br>temperature: " + weather.todayTemp + " degrees Celsius"
                            + "</br>clouds: " + weather.todayClouds + "% [" + weather.todayDescription + "]"
                            + "</br>humidity: " + weather.todayHumidity + "%"
                            + "</br>windspeeds: " + weather.todayWindSpeed + " km/h"
                            + "</br>wind direction: " + weather.todayWindDeg + " degrees [" + GetWindDir(weather.todayWindDeg) + "]"
                            + "</p>");
    $(containerTomorrow).css('background-image', 'url(' + weatherStringToday + ')');
    $(containerTomorrow).css('background-size', '100%');
    $(containerTomorrow).append("<p>Location: " + weather.city
                            + "</br>temperature: " + weather.tomoTemp + " degrees Celsius"
                            + "</br>clouds: " + weather.tomoClouds + "% [" + weather.tomoDescription + "]"
                            + "</br>humidity: " + weather.tomoHumidity + "%"
                            + "</br>windspeeds: " + weather.tomoWindSpeed + " km/h"
                            + "</br>wind direction: " + weather.tomoWindDeg + " degrees [" + GetWindDir(weather.tomoWindDeg) + "]"
                            + "</p>");
}

function GetBackground(id) {
    //console.log("DEBUG MESSAGE - In GetBackground function"); //for reviewing
    var background;
    if ((id >= 200) && (id < 300)) {
        background = "./img/Storm.jpg";
    }
    if ((id >= 300) && (id < 500)) {
        background = "./img/Drizzle.jpg";
    }
    if ((id >= 500) && (id < 600)) {
        background = "./img/Rain.jpg";
    }
    if ((id >= 600) && (id < 700)) {
        background = "./img/Snow.jpg";
    }
    if ((id >= 700) && (id < 800)) {
        background = "./img/Mist.jpg";
    }
    if ((id >= 802) && (id < 805)) {
        background = "./img/Overcast.jpg";
    }
    else {
        background = "./img/Sky.jpg";
    }
    return background
}
function GetWindDir(deg) {
    //console.log("DEBUG MESSAGE - In GetWindRichting function"); //for reviewing
    if ((deg > 337) && (deg <= 22)) {
        return "North"
    }
    if ((deg > 22) && (deg <= 67)) {
        return "North-East"
    }
    if ((deg > 67) && (deg <= 112)) {
        return "East"
    }
    if ((deg > 112) && (deg <= 157)) {
        return "South-East"
    }
    if ((deg > 157) && (deg <= 202)) {
        return "South"
    }
    if ((deg > 202) && (deg <= 247)) {
        return "South-West"
    }
    if ((deg > 247) && (deg <= 292)) {
        return "West"
    }
    if ((deg > 292) && (deg <= 337)) {
        return "North-West"
    }
}

//geolocation via IP
function GetPositionIP() {
    console.log("DEBUG MESSAGE - In GetPositionViaIP function");
    var wString = "http://freegeoip.net/json/";
    $.ajax({
        url: wString,
        dataType: 'jsonp',
        success: function (json) {
            lat = json.latitude;
            lon = json.longitude;
            GetWeather(2)
        }
    });

}