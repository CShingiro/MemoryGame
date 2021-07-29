"use strict"

var player_name;

(() => {
    ("#player_name").click(() => {
        let isValid = true;
        if (("#").val() == null) {
            alert("Please enter your name.");
            isValid = false;
        }
        else {
            player_name = $("#player_name").val().trim();
            sessionStorage.testData = player_name;
            alert("Your name is" + player_name);
        }
    });
    
    
    if (isValid == false) {
        evt.preventDefault;
    }
});
