$(function () {

let date = dayjs();
let i = 0;
let event = "";
let city_name = "Topeka";
let state_code = "";
let country_code = ""

const api_key = window.config.api_key;
$("#city").text(city_name)
    $("#date").text(date.format("MMM/DD/YYYY"));

    $("#search_btn").on("click", function(){
        // Records the text content of the div for the button press
        event = $(this).siblings("#city_input").val();
        city_name = event
        get_weather()
        $("#city").text(event)
        if(i == 0){
            $(`#history_${i}`).text(`${event}`)
            localStorage.setItem(`#history_${i}`,event);
            $(`#history_${i}`).removeClass("invisible").addClass("visible");
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
        const weather_geo_url = `http://api.openweathermap.org/geo/1.0/direct?q=${city_name},${state_code},${country_code}&limit=1&appid=${api_key}`;
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
                        $("#icon_0").attr("src", `http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`)
                        $("#temp_0").text(`Temp ${data.list[0].main.temp}F`)
                        $("#wind_0").text(`Wind ${data.list[0].wind.speed}MPH`)
                        $("#humid_0").text(`Humidity ${data.list[0].main.humidity}%`)

                        $("#icon_1").attr("src", `http://openweathermap.org/img/w/${data.list[6].weather[0].icon}.png`)
                        $("#date_1").text(`${dayjs(data.list[6].dt_txt).format("MMM/DD/YYYY")}`)
                        $("#temp_1").text(`Temp ${data.list[6].main.temp}F`)
                        $("#wind_1").text(`Wind ${data.list[6].wind.speed}MPH`)
                        $("#humid_1").text(`Humidity ${data.list[6].main.humidity}%`)

                        $("#icon_2").attr("src", `http://openweathermap.org/img/w/${data.list[14].weather[0].icon}.png`)
                        $("#date_2").text(`${dayjs(data.list[14].dt_txt).format("MMM/DD/YYYY")}`)
                        $("#temp_2").text(`Temp ${data.list[14].main.temp}F`)
                        $("#wind_2").text(`Wind ${data.list[14].wind.speed}MPH`)
                        $("#humid_2").text(`Humidity ${data.list[14].main.humidity}%`)

                        $("#icon_3").attr("src", `http://openweathermap.org/img/w/${data.list[22].weather[0].icon}.png`)
                        $("#date_3").text(`${dayjs(data.list[22].dt_txt).format("MMM/DD/YYYY")}`)
                        $("#temp_3").text(`Temp ${data.list[22].main.temp}F`)
                        $("#wind_3").text(`Wind ${data.list[22].wind.speed}MPH`)
                        $("#humid_3").text(`Humidity ${data.list[22].main.humidity}%`)

                        $("#icon_4").attr("src", `http://openweathermap.org/img/w/${data.list[30].weather[0].icon}.png`)
                        $("#date_4").text(`${dayjs(data.list[30].dt_txt).format("MMM/DD/YYYY")}`)
                        $("#temp_4").text(`Temp ${data.list[30].main.temp}F`)
                        $("#wind_4").text(`Wind ${data.list[30].wind.speed}MPH`)
                        $("#humid_4").text(`Humidity ${data.list[30].main.humidity}%`)

                        $("#icon_5").attr("src", `http://openweathermap.org/img/w/${data.list[38].weather[0].icon}.png`)
                        $("#date_5").text(`${dayjs(data.list[38].dt_txt).format("MMM/DD/YYYY")}`)
                        $("#temp_5").text(`Temp ${data.list[38].main.temp}F`)
                        $("#wind_5").text(`Wind ${data.list[38].wind.speed}MPH`)
                        $("#humid_5").text(`Humidity ${data.list[38].main.humidity}%`)
            })
        })
    };

    get_weather();
});