// import * as Images from '../assets'; // maybe add images to each object?

const ATTRIBUTES = {
	colors: ['red', 'green', 'purple'],
	numbers: ['one', 'two', 'three'],
	shapes: ['oval', 'squiggle', 'diamond'],
	shadings: ['solid', 'striped', 'open'],
};

export default class Deck {
	constructor() {
		this.deck = [];
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
		
		ATTRIBUTES.colors.forEach(color => {
			ATTRIBUTES.numbers.forEach(number => {
				ATTRIBUTES.shapes.forEach(shape => {
					ATTRIBUTES.shadings.forEach(shading => {
						this.deck.push({ color, number, shape, shading });
					});
				});
			});
		});
	}

	shuffle() {
		const { deck } = this;
		let count = deck.length;

		while (count) {
			let i = Math.floor(Math.random() * count);
			[deck[count], deck[i]] = [deck[i], deck[count]];
			count--;
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
}