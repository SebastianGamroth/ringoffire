export class Game {
    public players: string[] = [];
    public stack: string[] = [];
    public playerCards: string[] = [];
    public currentPlayer: number = 0;

    constructor() {

        for (let i = 1; i < 14; i++) {
            this.stack.push('ace_' + i);
            this.stack.push('hearts_' + i);
            this.stack.push('clubs_' + i);
            this.stack.push('diamonds_' + i);
        }

        shuffle(this.stack);
    }

    // Game Arrays in Json umwandeln
    public toJson() {
        return {
            players: this.players,
            stack: this.stack,
            playerCards: this.playerCards,
            currentPlayer: this.currentPlayer
        };
    }
}

/**
 * old Version
 * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array?page=1&tab=scoredesc#tab-top
 * 
 * @param array - Shuffle the deck of cards randomly
 * @returns - mixed cards
 */
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}