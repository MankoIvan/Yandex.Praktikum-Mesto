import Card from './card.js';
export default class CardList {
    constructor(container) {
        this.container = container;
    }
    addCard(name, link) {
        const { cardElement } = new Card(name, link);
        this.container.appendChild(cardElement);
    }
    render(cards) {
        for (const card of cards) {
            this.addCard(card.name, card.link);
          }
    }
}
