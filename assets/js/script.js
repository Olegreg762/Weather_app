$(function () {
let i = 0;
let event = "";
let city_name = "New York";

const api_key = window.config.api_key;
if(localStorage.getItem("#history_0") == null){
    $("#city").text(city_name)
}else{
    $("#history_0").text(localStorage.getItem("#history_0"))
    $("#city").text(localStorage.getItem("#history_0"))
}

    $("#search_btn").on("click", function(){
        // Records the text content of the div for the button press
        event = $(this).siblings("#city_input").val();
        city_name = event
        get_weather()
        $("#city").text(event)
        if(i == 0){
            $("#history_0").text(`${event}`)
            localStorage.setItem("#history_0",event);
            $("#history_0").removeClass("invisible").addClass("visible");
            i++
        }else{
            $(`#history_${i}`).text(`${event}`)
            localStorage.setItem(`#history_${i}`,event);
            $(`#history_${i}`).removeClass("invisible").addClass("visible");
            i++
            if(i>4){
                i = 0
            }
        }
        
    });

    function show_local(){
        const num_elements = 5
        for(let i = 0; i < num_elements; i++){
            $(`#history_${i}`).text(localStorage.getItem(`#history_${i}`))
            if(localStorage.getItem(`#history_${i}`) != null){
                $(`#history_${i}`).removeClass("invisible").addClass("visible");
                }
            }
        };

    $("#history").on("click", ".history_button", function(){
        let button_id = $(this).attr("id");
        let button_storage = localStorage.getItem(`#${button_id}`);
        $("#city").text(button_storage)
        city_name = button_storage
        get_weather()
    });

    show_local(); 


    function get_weather(){
        const weather_geo_url = `http://api.openweathermap.org/geo/1.0/direct?q=${city_name}&limit=1&appid=${api_key}`;
        fetch(weather_geo_url)
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                let lat = data[0].lat;
                let lon = data[0].lon;
                const weather_data_url = `https://api.openweathermap.org/data//2.5/forecast?units=imperial&lat=${lat}&lon=${lon}&appid=${api_key}`;
                fetch(weather_data_url)
                    .then(function(response){
                        return response.json();
                    })
                    .then(function(data){
                        for(let i =0, jd = 0; i<6; i++, jd += 8){
                            if(jd == 40){
                                jd--
                            }
                            $(`#icon_${i}`).attr("src", `http://openweathermap.org/img/w/${data.list[jd].weather[0].icon}.png`)
                            $(`#date_${i}`).text(`${dayjs(data.list[jd].dt_txt).format("MMM/DD/YYYY")}`)
                            console.log(dayjs(data.list[jd].dt_txt))
                            $(`#temp_${i}`).text(`Temp ${data.list[jd].main.temp}F`)
                            $(`#wind_${i}`).text(`Wind ${data.list[jd].wind.speed}MPH`)
                            $(`#humid_${i}`).text(`Humidity ${data.list[jd].main.humidity}%`)
                        }
            })
        })
    };

    get_weather();
});