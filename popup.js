class Popup {
    constructor() {
        this.add = document.querySelector('#popupAdd');
        this.submitAddButton = this.add.querySelector('.popup__button');
        this.edit = document.querySelector('#popupEdit');
        this.submitEditButton = this.edit.querySelector('.popup__button');
        this.pic = document.querySelector('#popupPic');
    }
    open(event) {
        if (event.target.classList.contains('user-info__button')) {
            this.add.classList.add('popup_is-opened');
        }
        if (event.target.classList.contains('user-info__edit-button')) {
            this.edit.classList.add('popup_is-opened');
            fullName.value = profileName.textContent;
            bio.value = profileJob.textContent;
            openingValidation(editForm);
        }        
        if (event.target.classList.contains('place-card__image')) {    
            this.pic.classList.add('popup_is-opened');
            this.pic.querySelector('.popup__picture').setAttribute('src', event.target.getAttribute('style').slice(22, -1));
        }
    }
    close(event) {
        event.path[2].classList.remove('popup_is-opened');
    
    }
}









  
