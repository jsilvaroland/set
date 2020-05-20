// import * as Images from '../assets'; // maybe add images to each object?

const ATTRIBUTES = {
	colors: ['red', 'green', 'purple'],
	numbers: ['one', 'two', 'three'],
	shapes: ['oval', 'squiggle', 'diamond'],
	shadings: ['solid', 'striped', 'open'],
};

class Deck {
	constructor() {
		// this.deck = [];
		this.resetDeckExpert();
	}

	repopulateDeckNovice() {
	// empties deck if not already empty
		this.deck = [];

		ATTRIBUTES.colors.forEach(color => {
			ATTRIBUTES.numbers.forEach(number => {
				ATTRIBUTES.shapes.forEach(shape => {
					this.deck.push({ color, number, shape, shading: 'solid' });
				});
			});
		});
	}

	repopulateDeckExpert() {
		// empties deck if not already empty
		this.deck = [];
		let image;

		ATTRIBUTES.colors.forEach(color => {
			ATTRIBUTES.numbers.forEach(number => {
				ATTRIBUTES.shapes.forEach(shape => {
					ATTRIBUTES.shadings.forEach(shading => {
						image = new Image();
						image.src = `../src/assets/${color}-${number}-${shape}-${shading}.png`;
						this.deck.push({ color, number, shape, shading, image });
					});
				});
			});
		});
	}

	shuffle() {
		const { deck } = this;
		let count = deck.length;
		let i;

		while (count) {
			i = Math.floor(Math.random() * count--);
			[deck[count], deck[i]] = [deck[i], deck[count]];
		}
	}

	resetDeckNovice() {
		this.repopulateDeckNovice();
		this.shuffle();
	}

	resetDeckExpert() {
		this.repopulateDeckExpert();
		this.shuffle();
	}

	deal() {
		return this.deck.pop();
	}
}

export default Deck;