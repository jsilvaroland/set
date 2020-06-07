# Set
[Live Game Link](https://jsilvaroland.github.io/set/)

## Inspiration and Goals
Set is derived from the identically titled tabletop card game of pattern recognition. I aimed to create an accurate simulation of Set's game rules with modern design and responsive gameplay.

## Game Rules
The object of the game is to identify a Set of 3 cards from 12 placed face up on the field. Each card has four attributes, and each attribute has three possible variants as follows:

![](./src/assets/attributes.png)

A Set consists of 3 cards in which each of the cards' attributes, looked at one-by-one, are either the same between each card OR different between each card. When the deck is empty and there are no remaining sets on the field, you win!

## Technologies
* JavaScript
* HTML5
    * Canvas
* CSS

## Technical Implementation
Due to Canvas's limited native functionality when it comes to drawing modified shapes, I created a custom function for drawing rounded rectangles which simulates HTML's border radius property.

    drawRoundedRect(x, y, w, h, stroke, fill, borderRad = 10, lineWidth = 3) {
        const { ctx } = this;

        ctx.beginPath();
        ctx.moveTo(x + borderRad, y);
        ctx.lineTo(x + w - borderRad, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + borderRad);
        ctx.lineTo(x + w, y + h - borderRad);
        ctx.quadraticCurveTo(x + w, y + h, x + w - borderRad, y + h);
        ctx.lineTo(x + borderRad, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - borderRad);
        ctx.lineTo(x, y + borderRad);
        ctx.quadraticCurveTo(x, y, x + borderRad, y);
        ctx.strokeStyle = stroke;
        ctx.fillStyle = fill;
        ctx.lineWidth = lineWidth;
        this.ctx.stroke();
        this.ctx.fill();
    }
    
This function is called regularly throughout the game&mdash;whenever cards are highlighted, unhighlighted, or added to the board.
