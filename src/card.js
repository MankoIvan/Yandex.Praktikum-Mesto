class Card {
    constructor(name, link) {
        this.name = name;
        this.link = link;
        this.cardElement = this.create();

        this.likeHandler = this.like.bind(this);
        this.deleteHandler = this.remove.bind(this);
        
        this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.likeHandler);
        this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click', this.deleteHandler);
    }
    create() { 
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('place-card');
    
        const cardImage = document.createElement('div');
        cardImage.classList.add('place-card__image');
        cardImage.setAttribute('style', `background-image: url(${this.link})`);
    
        const cardDeleteButton = document.createElement('button');
        cardDeleteButton.classList.add('place-card__delete-icon');
    
        const cardDescription = document.createElement('div');
        cardDescription.classList.add('place-card__description');
    
        const cardName = document.createElement('h3');
        cardName.classList.add('place-card__name');
        cardName.textContent = this.name; 
    
        const cardLikeButton = document.createElement('button');
        cardLikeButton.classList.add('place-card__like-icon');
    
        cardContainer.appendChild(cardImage);
        cardImage.appendChild(cardDeleteButton);
    
        cardContainer.appendChild(cardDescription);
        cardDescription.appendChild(cardName);
        cardDescription.appendChild(cardLikeButton);
    
        return cardContainer;
    }
    like() {
        this.cardElement.querySelector('.place-card__like-icon').classList.toggle('place-card__like-icon_liked');
    }
    remove() {
        this.cardElement.querySelector('.place-card__like-icon').removeEventListener('click', this.likeHandler);
        this.cardElement.querySelector('.place-card__delete-icon').removeEventListener('click', this.deleteHandler);
        this.cardElement.remove();
    }
}

