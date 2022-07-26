let loc = document.getElementById("location");
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let iconfile;
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", (e)=>{
  e.preventDefault();
  getWeather(searchInput.value);
  
  searchInput.value="";
});

const getWeather=async (city)=>{
  try{
    const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4df92db9f059ab57536e726ba10a7a25`, {mode:"cors"});
  

  const weatherData=await response.json();
  const{name}=weatherData;
  const{feels_like}=weatherData.main;
  const{id,main}=weatherData.weather[0];

  loc.textContent=name;
  climate.textContent=main;
  tempvalue.textContent=Math.round(feels_like-273);

  if( id>=200 && id<300){
    tempicon.src="./images/thunderstorm.png";
  } 
  else if(id>=300 && id<500){
    tempicon.src="./images/drizzle.png";
  } 
  else if(id>=500 && id<600){
    tempicon.src="./images/raining.png";
  } 
  else if(id>=600 && id<700){
    tempicon.src="./images/snow.png";
  } 
  else if(id>=700 && id<800){
    tempicon.src="./images/atmosphere.png";
  } 
  else if(id==800){
    tempicon.src="./images/cloud_sun.png";
  } 
  else if(id>800){
    tempicon.src="./images/clouds.png";
  }
//

//
}

catch(error){
  alert("City not found");
}

// new adding

// new added
};

// window.addEventListener("load", () => {
//   let long;
//   let lat;

//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition((position) => {
//       long = position.coords.longitude;
//       lat = position.coords.latitude;

//       const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=4df92db9f059ab57536e726ba10a7a25`;

//       fetch(api).then((response)=>{
//         return response.json();
//       })
//       .then((data) =>{
//         const{name}=data;
//         const{feels_like}=data.main;
//         const{id,main}=data.weather[0];

//         loc.textContent=name;
//         climate.textContent=main;
//         tempvalue.textContent=Math.round(feels_like-273);

//         if( id>=200 && id<300){
//           tempicon.src="./images/thunderstorm.png";
//         } 
//         else if(id>=300 && id<500){
//           tempicon.src="./images/drizzle.png";
//         } 
//         else if(id>=500 && id<600){
//           tempicon.src="./images/raining.png";
//         } 
//         else if(id>=600 && id<700){
//           tempicon.src="./images/snow.png";
//         } 
//         else if(id>=700 && id<800){
//           tempicon.src="./images/atmosphere.png";
//         } 
//         else if(id==800){
//           tempicon.src="./images/cloud_sun.png";
//         } 
//         else if(id>800){
//           tempicon.src="./images/clouds.png";
//         }
        
        
//         console.log(data);
//       })
//     });
//   }
// });

//new
function GetInfo() {

  // var newName = document.getElementById("search-input");
  // var cityName = document.getElementById("cityName");
  // cityName.innerHTML = "--"+newName.value+"--";

fetch('https://api.openweathermap.org/data/2.5/forecast?q='+searchInput.value+'&appid=4df92db9f059ab57536e726ba10a7a25')
.then(response => response.json())
.then(data => {

  //Getting the min and max values for each day
  for(i = 0; i<5; i++){
      document.getElementById("day" + (i+1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min - 273.15).toFixed(1)+ "°";
      //Number(1.3450001).toFixed(2); // 1.35
  }

  for(i = 0; i<5; i++){
      document.getElementById("day" + (i+1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max - 273.15).toFixed(2) + "°";
  }
  //------------------------------------------------------------

  //Getting Weather Icons
   for(i = 0; i<5; i++){
      document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+
      data.list[i].weather[0].icon
      +".png";
  }
  //------------------------------------------------------------
  console.log(data)


})

.catch(err => alert("Something Went Wrong: Try Checking Your Internet Coneciton"))
}

function DefaultScreen(){
  document.getElementById("search-input").defaultValue = "Bengaluru";
  GetInfo();
}


//Getting and displaying the text for the upcoming five days of the week
var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

//Function to get the correct integer for the index of the days array
function CheckDay(day){
  if(day + d.getDay() > 6){
      return day + d.getDay() - 7;
  }
  else{
      return day + d.getDay();
  }
}

  for(i = 0; i<5; i++){
      document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i)];
  }
