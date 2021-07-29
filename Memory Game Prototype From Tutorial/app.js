document.addEventListener('DOMContentLoaded', () => {

    //card options
    const cardArray = [
        {
            name: "card1",
            img: "images/card_1.png"
        },
        {
            name: "card1",
            img: "images/card_1.png"
        },
        {
            name: "card2",
            img: "images/card_2.png"
        },
        {
            name: "card2",
            img: "images/card_2.png"
        },
        {
            name: "card3",
            img: "images/card_3.png"
        },
        {
            name: "card3",
            img: "images/card_3.png"
        },
        {
            name: "card4",
            img: "images/card_4.png"
        },
        {
            name: "card4",
            img: "images/card_4.png"
        },
        {
            name: "card5",
            img: "images/card_5.png"
        },
        {
            name: "card5",
            img: "images/card_5.png"
        },
        {
            name: "card6",
            img: "images/card_6.png"
        },
        {
            name: "card6",
            img: "images/card_6.png"
        }
    ]
/* to make the options for different amounts of cards, should we make a 48 card array like
this, have an event listener for the select box, and use the option ids to correspond with
popping a certain number of array items out?*/


    cardArray.sort(() => 0.5 - Math.random())

    const grid = document.querySelector(".grid")
    const resultDisplay = document.querySelector("#result")
    var cardsChosen = []
    var cardsChosenId = []
    var cardsWon = []

    //create board -
    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            var card = document.createElement("img")
            card.setAttribute("src", "images/back.png")
            card.setAttribute("data-id", i)
            card.addEventListener("click", flipCard)
            grid.appendChild(card)
        }
    }

    function checkForMatch() {
        var cards = document.querySelectorAll("img")
        const optionOneId = cardsChosenId[0]
        const optionTwoId = cardsChosenId[1]
        if (cardsChosen[0] === cardsChosen[1]) {
            alert("you found a match")
            // cards[optionOneId].setAttribute("src", "images/card_24.png")
            // cards[optionTwoId].setAttribute("src", "images/card_24.png")
            cardsWon.push(cardsChosen)
        } else {
            cards[optionOneId].setAttribute("src", "images/back.png")
            cards[optionTwoId].setAttribute("src", "images/back.png")
            alert("Sorry, try again")
        }
        cardsChosen = []
        cardsChosenId = []
        resultDisplay.textContent = cardsWon.length
        if (cardsWon.length ===cardArray.length/2) {
            resultDisplay.textContent = "Congratulations! You found them all!"
        }
    }

    function flipCard() {
        var cardId = this.getAttribute("data-id")
        cardsChosen.push(cardArray[cardId].name)
        cardsChosenId.push(cardId)
        this.setAttribute("src", cardArray[cardId].img)
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500)
        }
    }


    createBoard()


})