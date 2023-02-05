/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
var gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i = 0; i < 11; i++){
        var game = games[i];
        // create a new div element, which will become the game card
        let newDiv = document.createElement("div")
        
        // add the class game-card to the list
        newDiv.classList.add("game-card")

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        newDiv.innerHTML = `<img src="${(games)[i].img}" class = game-img> Wow, This game is so cool, its called ${(games)[i].name} the game has ${(games)[i].pledged} pledged and ${(games)[i].backers} backers  `
""
        // append the game to the games-container
        gamesContainer.append(newDiv);
    }
}


// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
const ArrContributions = GAMES_JSON.map(games => games.backers);
// use reduce() to count the number of total contributions by summing the backers
const total = ArrContributions.reduce((p, c) => {
    return p + c;
}, 0);
const forTotal = total.toLocaleString("en-US");
// set the inner HTML using a template literal and toLocaleString to get a number with commas

contributionsCard.innerHTML = `${forTotal}`

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const ArrRaised = GAMES_JSON.map(games => games.pledged);
// use reduce() to count the number of total contributions by summing the backers
const totalRaised = ArrRaised.reduce((p, c) => {
    return p + c;
}, 0); 
const RaiseTot = totalRaised.toLocaleString("en-US");
// set inner HTML using template literal
raisedCard.innerHTML = `$${RaiseTot}`

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = '11'

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding

function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let UnFunded = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal
    })

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(UnFunded);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let UnFunded = GAMES_JSON.filter((game) => {
        return game.pledged > game.goal
    })


    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(UnFunded);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);
unfundedBtn.classList.add("buttonHover");
fundedBtn.classList.add("buttonHover");
allBtn.classList.add("buttonHover");
/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/    




// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const UnFundedNum = GAMES_JSON.filter((game) => {
    return game.pledged > game.goal
})
var UnfundedNumB = UnFundedNum.length;

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `There ${UnfundedNumB > 1 ? `are ${UnfundedNumB} games` : `is ${UnfundedNumB} game `} left to be funded`

// create a new DOM element containing the template string and append it to the description container
const TempStr = document.createElement("p")
TempStr.innerHTML = displayStr
descriptionContainer.append(TempStr)
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});
 
// use destructuring and the spread operator to grab the first and second games
const g1 = GAMES_JSON[0];
const g2 = GAMES_JSON[1];
// create a new element to hold the name of the top pledge game, then append it to the correct element
const topName = document.createElement("p");
topName.innerHTML = g1.name;
firstGameContainer.append(topName);
// do the same for the runner up item
const secName = document.createElement("p");
secName.innerHTML = g2.name;
secondGameContainer.append(secName);