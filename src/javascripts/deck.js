import Card from './card';

const ATTRIBUTES = {
	colors: ['red', 'green', 'purple'],
	numbers: ['one', 'two', 'three'],
	shapes: ['oval', 'squiggle', 'diamond'],
	shadings: ['solid', 'striped', 'open'],
};

class Deck {
	constructor(difficulty) {
		if (difficulty === 'expert') {
			this.resetDeckExpert(); // for now deck will be made in constructor, once novice mode is introduced, resetDeck will be removed from constructor and will have to be called depending on button push
		} else {
			this.resetDeckNovice();
		}
	}

	repopulateDeckNovice() {
	// empties deck if not already empty
		// this.deck = [];
		this.cards = [];
		let image, card;
		let shading = { shading: 'solid' };

		ATTRIBUTES.colors.forEach(color => {
			ATTRIBUTES.numbers.forEach(number => {
				ATTRIBUTES.shapes.forEach(shape => {
					image = new Image();
					image.src = `./src/assets/${color}-${number}-${shape}-solid.png`;

					card = new Card(color, number, shape, shading, image);
					this.cards.push(card);
				});
			});
		});
	}

	repopulateDeckExpert() {
		// empties deck if not already empty
		this.cards = [];
		let image, card;

		ATTRIBUTES.colors.forEach(color => {
			ATTRIBUTES.numbers.forEach(number => {
				ATTRIBUTES.shapes.forEach(shape => {
					ATTRIBUTES.shadings.forEach(shading => {
						image = new Image();
						image.src = `./src/assets/${color}-${number}-${shape}-${shading}.png`;

						card = new Card(color, number, shape, shading, image);
						this.cards.push(card);
					});
				});
			});
		});
	}

	shuffle() {
		const { cards } = this;
		let count = cards.length;
		let i;

		while (count) {
			i = Math.floor(Math.random() * count--);
			[cards[count], cards[i]] = [cards[i], cards[count]];
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
		return this.cards.pop();
	}
}

export default Deck;