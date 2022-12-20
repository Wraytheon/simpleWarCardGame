//* Create var to hold deck id for browser storage */
let deckId = "";

fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
  .then((res) => res.json()) // parse response as JSON
  .then((data) => {
    console.log(data);
    deckId = data.deck_id;
  })
  .catch((err) => {
    console.log(`error ${err}`);
  });


  document.querySelector("button").addEventListener("click", drawTwo);

function drawTwo() {
  const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`;

  // let deckId = localStorage.getItem("deckId")
  // localStorage.setItem("deckId")
  fetch(url)
  .then((res) => res.json()) // parse response as JSON
  .then((data) => {
    console.log(data);

    document.querySelector(".card-result").style.display = "flex";
    document.querySelector(".card-result").style.margin = "40rem 0";
    document.querySelector(".card-result").style.justifyContent = "space-between";
    const playerTitles = document.getElementsByClassName("playerTitle");
    for (let i = 0; i < playerTitles.length; i++) {
      const playerTitle = playerTitles[i];
      playerTitle.classList.add('marginBlockRemove');
    }


    //* Shows card image for each player
    document.getElementById("p1").src = data.cards[0].image
    document.getElementById("p2").src = data.cards[1].image

    //** Callback function for converting face cards */
    let player1Val = convertToNum(data.cards[0].value)
    let player2Val = convertToNum(data.cards[1].value)

    //* Shows results */
    if(player1Val > player2Val) {
      document.querySelector("h3").innerText = "Player 1 wins!"
    } else if (player1Val < player2Val) {
      document.querySelector("h3").innerText = "Player 2 wins!"
    } else {
      document.querySelector("h3").innerText = "War!"
    }

  })
  .catch((err) => {
    console.log(`error ${err}`);
  });

  const newDeck = "new/";
  const shuffle = "new/shuffle/?deck_count=1";
  p1Hand = "<<deck_id>>/pile/<<pile_name>>/add/?cards=AS,2S";
  convertToNum()
}

//**Converts face cards to number value */
function convertToNum(val) {
  if(val === "ACE") {
    return 14
  } else if (val === "KING") {
    return 13
  } else if (val === "QUEEN") {
    return 12
  } else if (val === "JACK") {
    return 11
  } else {
    return Number(val)
  }
}

//** Changes layout of player titles */
// function playerTitles () {
//   document.querySelector(p).style.display = "flex";
//   document.querySelector(p).style.margin = "20rem 0";
//   document.querySelector(p).style.justifyContent = "space-between";
// }