$(function () {

let date = dayjs();
let i = 0;
let event = "";
let city_name = "";
let state_code = "";
let country_code = ""
let exclude = "minutely, hourly, alerts"

const api_key = window.config.api_key;

    $("#date").text(date.format("MMM/DD/YYYY"));

    $("#search_btn").on("click", function(){
        // Records the text content of the div for the button press
        event = $(this).siblings("#city_input").val();
        city_name = event
        get_lon_lat()
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
        get_lon_lat()
    });

    show_local(); 


    function get_lon_lat(){
        const weather_geo_url = `http://api.openweathermap.org/geo/1.0/direct?q=${city_name},${state_code},${country_code}&limit=1&appid=${api_key}`;
        fetch(weather_geo_url)
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                console.log(data);
                let lat = data[0].lat;
                let lon = data[0].lon;
                return lat, lon
            })
            .then(function(lat, lon){
                const weather_data_url = `https://api.openweathermap.org/data//2.5/forecast?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${api_key}`;
                fetch(weather_data_url)
                    .then(function(response){
                        console.log(lat + lon)
                        return response.json();
                    })
                    .then(function(data){
                        console.log(data)
                    })
            })
    };
});