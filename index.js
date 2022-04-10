const AppId = 'baad1d348916ffa8e9e7bc5c4c14a11c';

var icon ='https://openweathermap.org/img/wn/10d@2x.png'


function getLatLonByZipCode(){

    var ZipCode = document.getElementById("zipCode").value;
    console.log(ZipCode)
    if(ZipCode == ''){
        alert('Enter a Zip Code');
    }else{
        var url = 'https://api.openweathermap.org/geo/1.0/zip?zip='+ZipCode+'&appid='+AppId
        if (location.protocol === "http:"){
            url = 'http://api.openweathermap.org/geo/1.0/zip?zip='+ZipCode+'&appid='+AppId
        }
         fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)

            
           if(data.cod == '404'){ 
            alert(data.message);
           }else{
            document.getElementById('city').innerHTML = data.name;
            let lat = data.lat;
            let lon = data.lon;
            
            getWeatherReport(lat,lon);
           }
            
        });
    }
}


function getWeatherReport(lat,lon){
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&units=imperial&appid='+AppId)
    .then(response => response.json())
    .then(data => {
        if(data.cod == '404'){
            alert(data.message);
        }else{
            console.log(data);
            let currentDate = new Date(data.current.dt * 1000);
            var convertedDate = currentDate.toLocaleDateString('en-us', {
                weekday: 'long',
                day : 'numeric',
                month : 'long',
                year : 'numeric'
            });
            
            document.getElementById('currentDate').innerHTML = convertedDate; 
            let currentTemp = data.current.temp+' <span>&#8457;</span>';
            document.getElementById('currentTemp').innerHTML = currentTemp; 
            let currentCondition = data.current.weather[0]['description'];
            document.getElementById('currentContition').innerHTML = currentCondition; 
             //01d@2x.png
             console.log(data.current.weather[0]['icon'])
            document.getElementById('sunny').src = './icon/'+data.current.weather[0]['icon']+"@2x.png"; 
            document.getElementById('sunny').classList.add('showImage');
            let TempHiLo = '';
            let hourlyRecords = data.hourly;
            let minTemp = maxTemp = '';

            
            for (let i=0 ; i<8 ; i++){
                if(i == 0){
                    minTemp =  hourlyRecords[i]['temp'];
                }
                if(i == 7){
                    maxTemp = hourlyRecords[i]['temp'];
                }
            } 
            TempHiLo = +maxTemp+' <span>&#8457;</span>' + ' / '+minTemp+' <span>&#8457;</span>';
            document.getElementById('TempHiLow').innerHTML = TempHiLo; 

            
            getNextThreeDaysForeCast(data.daily);
        }        
    });
}

function getNextThreeDaysForeCast(dailyArray){

    let DayOne = dailyArray[0];
    let DayTwo = dailyArray[1];
    let DayThree = dailyArray[2];
    let currentDate = new Date(DayOne.dt * 1000);

    let dayOneTemp = dailyArray[0]['temp']['min'] +' <span>&#8457;</span> ' + '/'+ dailyArray[0]['temp']['max'] +' <span>&#8457;</span> ';
    let dayTwoTemp =  dailyArray[1]['temp']['min'] +' <span>&#8457;</span> '  +'/'+ dailyArray[1]['temp']['max'] +' <span>&#8457;</span> ';
    let dayThreeTemp = dailyArray[2]['temp']['min'] +' <span>&#8457;</span> '  +'/'+ dailyArray[2]['temp']['max'] +' <span>&#8457;</span> ';

    document.getElementById('dayOneTemp').innerHTML = dayOneTemp;
    document.getElementById('dayTwoTemp').innerHTML = dayTwoTemp;
    document.getElementById('dayThreeTemp').innerHTML = dayThreeTemp; 

    var convertedDate = currentDate.toLocaleDateString('en-us', {
        weekday: 'long'
    });
    document.getElementById('dayOneDate').innerHTML = convertedDate; 

    currentDate = new Date(DayTwo.dt * 1000);
    var convertedDate = currentDate.toLocaleDateString('en-us', {
        weekday: 'long'
    });
    document.getElementById('dayTwoDate').innerHTML = convertedDate ;

    currentDate = new Date(DayThree.dt * 1000);
    var convertedDate = currentDate.toLocaleDateString('en-us', {
        weekday: 'long'
    });
    document.getElementById('dayThreeDate').innerHTML = convertedDate  ;


console.log(DayOne.weather[0].description,DayTwo.weather[0].description,DayThree.weather[0].description)
        document.getElementById('dayOneCond').innerHTML = DayOne.weather[0].description;
        document.getElementById('dayTwoCond').innerHTML = DayTwo.weather[0].description;
        document.getElementById('dayThreeCond').innerHTML = DayThree.weather[0].description;

        
    document.getElementById('dayOneWeather').src = './icon/'+DayOne.weather[0].icon+"@2x.png"; 
    document.getElementById('dayTwoWeather').src = './icon/'+DayTwo.weather[0].icon+"@2x.png"; 
    document.getElementById('dayThreeWeather').src = './icon/'+DayThree.weather[0].icon+"@2x.png"; 

}