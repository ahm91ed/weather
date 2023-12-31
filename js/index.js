
// ========== All inputs ==========

var weatherForecastData = {}  ;

var cityName = document.getElementById("cityName") ;

var temp = document.getElementById("temp") ;

var tempImg = document.getElementById ("tempImg") ;

var text = document.getElementById ( "text" ) ;

var humidity = document.getElementById("humidity") ;

var wind_kph = document.getElementById ("wind_kph") ;

var wind_dir = document.getElementById ("wind_dir") ;

var dayName = document.getElementById ("dayName") ;

var dayNumber = document.getElementById("dayNumber") ;

var monthName = document.getElementById ("monthName") ;

// ===============================================================================

var inputId = document.getElementById("inputId") ;

// ==============================================================================

var day2_3 = document.getElementsByClassName ("day2_3") ;

var dayNumber2_3 = document.getElementsByClassName(" dayNumber2_3 ") ;

var dayMonth2_3 = document.getElementsByClassName("dayMonth2_3") ;

console.log ( dayMonth2_3 ) ;


var tempImg2_3 = document.getElementsByClassName("tempImg2_3") ;

var maxtemp2_3 = document.getElementsByClassName("maxtemp2_3") ;

var mintemp2_3 = document.getElementsByClassName("mintemp2_3") ;

var text2_3 = document.getElementsByClassName("text2_3") ;

// ===================================================================================






// ===== function to get data from API =====

async function getWeatherData (country){


var response =  await fetch( `https://api.weatherapi.com/v1/forecast.json?key=76874facb8ea4e12b5394846232812&q=${country}&days=3` ) ;
   
 var weatherData =  await response.json() ;

 weatherForecastData = weatherData ;

 return  weatherForecastData  ;


};

  


// ===== function to display weather forecast data =====

function displayWeather (){


  var todayDay = new Date() ;

  dayName.innerHTML = todayDay.toLocaleDateString ( "en-us" , { weekday : "long"  }    ) ;

  dayNumber.innerHTML = todayDay.getDate() ;

  monthName.innerHTML = todayDay.toLocaleDateString( "en-us" , { month : "long" }  )


    cityName.innerHTML = weatherForecastData.location.name  ;

    temp.innerHTML = weatherForecastData.current.temp_c ;

    temp.innerHTML += `<span class="temp-span "><sup>o</sup> C </span>` ;



    tempImg.setAttribute ( "src" , weatherForecastData.current.condition.icon) ;

    text.innerHTML = weatherForecastData.current.condition.text ;

    humidity.innerHTML = weatherForecastData.current.humidity + '%' ;

    wind_kph.innerHTML = weatherForecastData.current.wind_kph + 'km/h';

    wind_dir.innerHTML = weatherForecastData.current.wind_dir ;



    

 




}


// ===== function to display weather forecast data =====

function getSecondAndThirdDay ()
{

  for ( var i = 0 ; i < 2 ;  i ++ ){

    var tomorrowDay = new Date (weatherForecastData.forecast.forecastday[i+1].date) ;
    
    day2_3[i].innerHTML = tomorrowDay.toLocaleDateString( "en-us" , {weekday : "long"} ) ;

    dayNumber2_3[i].innerHTML = tomorrowDay.getDate() ;

    dayMonth2_3[i].innerHTML = tomorrowDay.toLocaleDateString ( "en-us" , {month : "long"} ) ;



    maxtemp2_3[i].innerHTML = weatherForecastData.forecast.forecastday[i+1].day.maxtemp_c ;

    maxtemp2_3[i].innerHTML += `<span class="temp-span "><sup>o</sup> C </span>` ;

    mintemp2_3[i].innerHTML = weatherForecastData.forecast.forecastday[i+1].day.mintemp_c ;

    mintemp2_3[i].innerHTML += `<span class="temp-span "><sup>o</sup> </span>` ;

    tempImg2_3[i].setAttribute ( "src" , weatherForecastData.forecast.forecastday[i+1].day.condition.icon ) ;

    text2_3[i].innerHTML = weatherForecastData.forecast.forecastday[i+1].day.condition.text ;



  }


}






// ==== showing the final result =====



async function showFinalData (country = "ghaza")
{

  weatherForecastData = await getWeatherData (country) ;

  displayWeather () ;

  getSecondAndThirdDay ();

 


}
showFinalData () ;





// ==== add event when input search =====

inputId.addEventListener ( "input" ,  function (e) {


  x = e.target.value ;

  showFinalData (x) ;



})  ;