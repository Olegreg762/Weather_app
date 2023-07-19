// jQuery main function
$(function () {
    // Variables for the code
    let i = 0;
    let event = "";
    let city_name = "New York";
    // Retrieves API Key
    const api_key = atob(window.config.api_key);
    // Checks if there is already content in the local storage `#history_0` if not will set it to `New York`
    if(localStorage.getItem("#history_0") == null){
        $("#city").text(city_name)
    }else{
        // If `#history_0` has content will display it
        $("#history_0").text(localStorage.getItem("#history_0"))
        $("#city").text(localStorage.getItem("#history_0"))
        i++;
    }
    // Event listener for the search button to be clicked
    $("#search_btn").on("click", function(){
        // Sets event to the value of the entered in text in search field
        event = $(this).siblings("#city_input").val();
        city_name = event
        get_weather()
        // Set text content for the document elements "#city" and "#history_{i}"
        // i being the variable i
        $("#city").text(event)
        $(`#history_${i}`).text(`${event}`)
        // Sets the local storage
        localStorage.setItem(`#history_${i}`,event);
        $(`#history_${i}`).removeClass("invisible").addClass("visible");
        // Increaments the value of i by 1
        i++
        if(i>4){
            i = 0
        }
    });
    // Function for displaying the localstorage values on the document
    function show_local(){
        const num_elements = 5
        // For loop that iterates through each history storage keys
        // The changes the document display for the storage to visible if it is not null
        for(let i = 0; i < num_elements; i++){
            $(`#history_${i}`).text(localStorage.getItem(`#history_${i}`))
            if(localStorage.getItem(`#history_${i}`) != null){
                $(`#history_${i}`).removeClass("invisible").addClass("visible");
                }
            }
        };
    // Event listener for buttons in the history and will call function to get weather of that city
    $("#history").on("click", ".history_button", function(){
        let button_id = $(this).attr("id");
        let button_storage = localStorage.getItem(`#${button_id}`);
        $("#city").text(button_storage)
        city_name = button_storage
        get_weather()
    });

    show_local(); 

    // Function that will get the weather of the chosen city
    function get_weather(){
        // url for weather api
        const weather_geo_url = `https://api.openweathermap.org/geo/1.0/direct?q=${city_name}&limit=1&appid=${api_key}`;
        // fetch api data from url to get lat on lon of city then returns a json
        fetch(weather_geo_url)
            .then(function(response){
                return response.json();
            })
            // finds the lat and lon of entered city
            .then(function(data){
                let lat = data[0].lat;
                let lon = data[0].lon;
                // Uses the lat and lon to make another api call to get weather data
                const weather_data_url = `https://api.openweathermap.org/data//2.5/forecast?units=imperial&lat=${lat}&lon=${lon}&appid=${api_key}`;
                fetch(weather_data_url)
                    // Returns json of weather data
                    .then(function(response){
                        return response.json();
                    })
                    .then(function(data){
                        // For loop that iterates over the different doc elements
                        // Assigns value to doc elements from the weather json
                        for(let i =0, jd = 0; i<6; i++, jd += 8){
                            if(jd == 40){
                                jd--
                            }
                            $(`#icon_${i}`).attr("src", `http://openweathermap.org/img/w/${data.list[jd].weather[0].icon}.png`)
                            $(`#date_${i}`).text(`${dayjs(data.list[jd].dt_txt).format("MMM/DD/YYYY")}`)
                            $(`#temp_${i}`).text(`Temp ${data.list[jd].main.temp}F`)
                            $(`#wind_${i}`).text(`Wind ${data.list[jd].wind.speed}MPH`)
                            $(`#humid_${i}`).text(`Humidity ${data.list[jd].main.humidity}%`)
                        }
            })
        })
    };

    get_weather();
});