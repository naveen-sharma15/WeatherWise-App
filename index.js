const userTab=document.querySelector("[data-userWeather]")
const searchTab=document.querySelector("[data-searchWeather]")
const userContainer=document.querySelector('.weather-container')
const grantAcessContainer=document.querySelector(".grant-location-container")
const searchForm=document.querySelector("[data-searchForm]") 
const loadingScreen=document.querySelector(".loading-container")
const userinfoContainer=document.querySelector(".user-info-container") 


let oldTab=userTab;

// const API_KEY="de34690c6a2b41fa9c4ede157ca25c60";
const API_KEY = "168771779c71f3d64106d8a88376808a";
oldTab.classList.add("current-tab");
getfromSessionstorage();
//ek kam pending hai


function switchTab(newTab)
{
   if(oldTab!=newTab)
   {
    oldTab.classList.remove("current-tab");
    oldTab=newTab;
    oldTab.classList.add("current-tab");

    if(!searchForm.classList.contains("active"))
    {
        userinfoContainer.classList.remove("active");
        grantAcessContainer.classList.remove("active");
        searchForm.classList.add("active");
    }
    else
    {
        //main phele search wale tab tha ab your waether visbke karna hai
        searchForm.classList.remove("active");
        userinfoContainer.classList.remove("active");
        getfromSessionstorage();
    }
   }
}

userTab.addEventListener("click",()=>{
    //pass clicked tab as input
    switchTab(userTab);
});

searchTab.addEventListener("click",()=>{
    switchTab(searchTab);
});

//check if coordinaate is already present in session storge
function getfromSessionstorage()
{
  const localCoordinate=sessionStorage.getItem("user-coordinate");
  if(!localCoordinate)
  {
    //agar local coordinate nhi mile
    grantAcessContainer.classList.add("active");
  }
  else{
    const coordinaate=JSON.parse(localCoordinate);
    fetchUserweatherinfo(coordinaate);
  }
}

async function fetchUserweatherinfo(coordinaate)
{
    const{lat,lon}=coordinaate;
    //make grant container invisibe
    grantAcessContainer.classList.remove("active");
    loadingScreen.classList.add("active");
    //api calling
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);

        const data = await response.json();
         loadingScreen.classList.remove("active");
         userinfoContainer.classList.add("active");
         renderWeatherinfo(data);

    }
    catch(err)
    {
        loadingScreen.classList.remove("active");
      console.log("error found")
    }
}

function renderWeatherinfo(weatherInfo)
{
    //firstly we have to fecth the element
    const cityName=document.querySelector("[data-cityName]");
    const countryFlag=document.querySelector("[data-countryIcon]");
    const desc=document.querySelector("[data-weaterDesc]");
    const weatherIcon=document.querySelector("[data-weatherIcon]");
    const temp=document.querySelector("[data-temp]");
    const windspeed=document.querySelector("[data-windSpeed]");
    const humidity=document.querySelector("[data-humidity]");
    const cloudiness=document.querySelector("[cloudiness]");

    //fetch values from weather 
    cityName.innerText = weatherInfo?.name;
    countryFlag.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp.toFixed(2)} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed.toFixed(2)} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity.toFixed(2)} %`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all.toFixed(2)} %`;

}
 
function getLocation()
{
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showPostion)
    }
    else
    {
        //show an alert for no geolaction
    }
}
function showPostion(position)
{
    const usercoordinate=
    {
        lat:position.coords.latitude,
        lon:position.coords.longitude
    }
    sessionStorage.setItem("user-coordinate",JSON.stringify(usercoordinate));
    fetchUserweatherinfo(usercoordinate);   
   

}

const grantAccessbutton=document.querySelector("[data-grantAccess]");
grantAccessbutton.addEventListener("click",getLocation);





const searchInput = document.querySelector('[data-searchInput]');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (searchInput.value === "") {
        return;
    }
    // console.log(searchInput.value);
    fetchSearchWeatherInfo(searchInput.value);
    searchInput.value = "";
});


async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active");
    userinfoContainer.classList.remove("active");
   grantAcessContainer.classList.remove("acitve");
   
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

        const data = await response.json();
        loadingScreen.classList.remove('active');
        userinfoContainer.classList.add("active")
        renderWeatherinfo(data);
    }
    catch (err) {
        
    }
}










// console.log('hello jee naveen')
// // const API_KEY="de34690c6a2b41fa9c4ede157ca25c60"
// async function showWeather()
// {
//     try{
//         let city="kolkata";
    

//         const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=de34690c6a2b41fa9c4ede157ca25c60&units=metric`);
//         const data  = await response.json();
//         console.log("weather data :-> ",data);
//         let newpara=document.createElement('p');
    
//         newpara.textContent= `${data?.main?.temp.toFixed(2)} °C`
//         document.body.appendChild(newpara);
//     }
//     catch(err)
//     {
//      //handel self
//      console.log('error had been found');
//     }
  
// }

// function getLocation()
// {
//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(showPostion);
//     }
//     else
//     {
//         console.log('no geolocation supported');
//     }
// }
// function showPostion(position)
// {
//     let lat=position.coords.latitude
//     let lon=position.coords.longitude

//     console.log(lat);
//     console.log(lon);
// }