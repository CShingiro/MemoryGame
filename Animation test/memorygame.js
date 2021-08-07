"use strict"
$(function () {
    $("#tabs").tabs();
});

let score = 0;

$(document).ready(() => {
    $("#new_game").click(() => {
        let retrieving_data = sessionStorage.getItem("memory_game_6") + ",";
        makeArray(retrieving_data);
        console.log($("#high_score").val());
        save_data[3] = parseInt($("#high_score").text());
        sessionStorage.memory_game_6 = save_data;
        window.location.assign("index.html");
    })
    $("#save_settings").click(() => {
        saveData();
    });
});

var save_data = ["0", 0, "0", 0];

function makeArray(str, delimiter = ",") {
    save_data = str.slice(0, str.indexOf("\n")).split(delimiter);
}

// initialize the game by checking for preferences
//prioritize loading the player's preferences over the defaults
if (sessionStorage.getItem("memory_game_6") != null) {
    let retrieving_data = sessionStorage.getItem("memory_game_6") + ",";
    makeArray(retrieving_data);
    $("#player_name").val(save_data[0]);
    $('#num_cards').val(save_data[1]);
    $("#scoring_player").text(save_data[2]);
    $("#high_score").text(save_data[3]);
} else {
    console.log("no save data");
}

// Will save name if entered.
function saveData() {
    save_data[0] = $("#player_name").val();
    save_data[1] = $("#num_cards option:selected").text();
    if (!isNaN(save_data[3])) {
        save_data[3] = 0;
    } else {
        save_data[3] = $("#high_score").text();
    }
    $("#player").val($("#player_name").val());
    console.log("save data: " + save_data);
    sessionStorage.memory_game_6 = save_data;
    $("#player").text(save_data[0]);
}

//card array
const cardArray = [{
    name: "card1",
    img: "images/card_1.png"
}, {
    name: "card1",
    img: "images/card_1.png"
}, {
    name: "card2",
    img: "images/card_2.png"
}, {
    name: "card2",
    img: "images/card_2.png"
}, {
    name: "card3",
    img: "images/card_3.png"
}, {
    name: "card3",
    img: "images/card_3.png"
}, {
    name: "card4",
    img: "images/card_4.png"
}, {
    name: "card4",
    img: "images/card_4.png"
}, {
    name: "card5",
    img: "images/card_5.png"
}, {
    name: "card5",
    img: "images/card_5.png"
}, {
    name: "card6",
    img: "images/card_6.png"
}, {
    name: "card6",
    img: "images/card_6.png"
}, {
    name: "card7",
    img: "images/card_7.png"
}, {
    name: "card7",
    img: "images/card_7.png"
}, {
    name: "card8",
    img: "images/card_8.png"
}, {
    name: "card8",
    img: "images/card_8.png"
}, {
    name: "card9",
    img: "images/card_9.png"
}, {
    name: "card9",
    img: "images/card_9.png"
}, {
    name: "card10",
    img: "images/card_10.png"
}, {
    name: "card10",
    img: "images/card_10.png"
}, {
    name: "card11",
    img: "images/card_11.png"
}, {
    name: "card11",
    img: "images/card_11.png"
}, {
    name: "card12",
    img: "images/card_12.png"
}, {
    name: "card12",
    img: "images/card_12.png"
}, {
    name: "card13",
    img: "images/card_13.png"
}, {
    name: "card13",
    img: "images/card_13.png"
}, {
    name: "card14",
    img: "images/card_14.png"
}, {
    name: "card14",
    img: "images/card_14.png"
}, {
    name: "card15",
    img: "images/card_15.png"
}, {
    name: "card15",
    img: "images/card_15.png"
}, {
    name: "card16",
    img: "images/card_16.png"
}, {
    name: "card16",
    img: "images/card_16.png"
}, {
    name: "card17",
    img: "images/card_17.png"
}, {
    name: "card17",
    img: "images/card_17.png"
}, {
    name: "card18",
    img: "images/card_18.png"
}, {
    name: "card18",
    img: "images/card_18.png"
}, {
    name: "card19",
    img: "images/card_19.png"
}, {
    name: "card19",
    img: "images/card_19.png"
}, {
    name: "card20",
    img: "images/card_20.png"
}, {
    name: "card20",
    img: "images/card_20.png"
}, {
    name: "card21",
    img: "images/card_21.png"
}, {
    name: "card21",
    img: "images/card_21.png"
}, {
    name: "card22",
    img: "images/card_22.png"
}, {
    name: "card22",
    img: "images/card_22.png"
}, {
    name: "card23",
    img: "images/card_23.png"
}, {
    name: "card23",
    img: "images/card_23.png"
}, {
    name: "card24",
    img: "images/card_24.png"
}, {
    name: "card24",
    img: "images/card_24.png"
}];

const grid = document.querySelector(".grid");
const resultDisplay = document.querySelector("#result");
var cardsChosen = [];
var cardsChosenId = [];
var cardsWon = [];
var current_field = [];
var correct_score = 0;
var incorrect_score = 0;

//creates board with the number of cards selected by player.
function createBoard() {
    $("#player").text($("#player_name").val());
    clearField();
    score = 0;
    $("#correct").text(score);
    let num_cards = parseInt($("#num_cards option:selected").text());
    current_field = cardArray.slice(0, num_cards);
    current_field.sort(() => 0.5 - Math.random());
    for (let i = 0; i < current_field.length; i++) {
        var card = document.createElement("img");
        card.setAttribute("src", "images/back.png");
        card.setAttribute("data-id", i);
        card.addEventListener("click", flipCard);
        grid.appendChild(card);
    };
};

// Will check matches and determine percentage.
function checkForMatch() {
    var cards = $("#cards img");
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];
    if (cardsChosen[0] === cardsChosen[1]) {
        //hide card 1
        cards[optionOneId].removeEventListener("click", flipCard);
        $('img[data-id="' + cardsChosenId[0] + '"]').slideToggle(500, function () {
            $(this).attr('src', 'images/blank.png');
            $(this).css('display', 'flex')
        });
        //hide card 2
        cards[optionTwoId].removeEventListener("click", flipCard);
        $('img[data-id="' + cardsChosenId[1] + '"]').slideToggle(500, function () {
            $(this).attr('src', 'images/blank.png');
            $(this).css('display', 'flex')
        });
        cardsWon.push(cardsChosen);
        score = score + 2;
        correct_score++;
    } else {
        $('img[data-id="' + cardsChosenId[0] + '"]').fadeOut(400, function () {
            $(this).attr("src", "images/back.png");
            $(this).fadeIn(400);
        });
        // cards[optionOneId].setAttribute("src", "images/back.png");
        // cards[optionTwoId].setAttribute("src", "images/back.png");
        $('img[data-id="' + cardsChosenId[1] + '"]').fadeOut(400, function () {
            $(this).attr("src", "images/back.png");
            $(this).fadeIn(400);
        });
        cards[optionOneId].addEventListener("click", flipCard);
        cards[optionTwoId].addEventListener("click", flipCard);
        incorrect_score++;
        if (score > 0) {
            score--;
        }
    }
    cardsChosen = [];
    cardsChosenId = [];
    $("#correct").text(score);
    if (cardsWon.length === current_field.length / 2) {
        let display_percent = ((correct_score / (incorrect_score + correct_score)) * 100).toFixed(0)
        grid.innerHTML = `<p>Congratulations!<br>You found them all!<br>${display_percent}% of your moves were correct.</p>`;
        if (score > $("#high_score").text()) {
            $("#high_score").text(score);
            save_data[2] = $("#player").text();
            $("#scoring_player").text($("#player").text())
            save_data[3] = $("#high_score").text();
        }
    };
};

// Checks card when flipped.
function flipCard() {
    var cardId = this.getAttribute("data-id");
    this.removeEventListener("click", flipCard);
    cardsChosen.push(current_field[cardId].name);
    cardsChosenId.push(cardId);
    $(this).fadeOut(400, function () {
        $(this).attr("src", current_field[cardId].img);
        $(this).fadeIn(400);
    });
    if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 800);
    }

}
createBoard();
// Clears board when clicked.
function clearField() {
    $("#cards img").remove();
    grid.innerHTML = ``;
    cardsWon = [];
}