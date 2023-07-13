$(function () {
let date = dayjs();
let i = 0;
let event = "";


$("#search_btn").on("click", function(){
    // Records the text content of the div for the button press
    event = $(this).siblings("#city_input").val();
    $("#city").text(event)
    // Creates and displays the popup message element when an event is added to the local storage
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
        console.log(localStorage.getItem(`#history_${i}`))
        }
    };

    show_local(); 
$("#date").text(date.format("MMM/DD/YYYY"));
});