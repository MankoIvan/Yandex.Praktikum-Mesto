const placesList = document.querySelector('.places-list');
const cardList = new CardList(placesList);
const api = new Api({
    baseUrl: 'http://praktikum.tk/cohort2',
    headers: {
        authorization: '464ca459-5ead-41b4-a6f4-faa5f26c0255',
        'Content-Type': 'application/json'
    }
  });

const addForm = document.forms.new;  
const picName = addForm.elements.name;
const picLink = addForm.elements.link;


const editForm = document.forms.edit;  
const fullName = editForm.elements.fullname;
const bio = editForm.elements.bio;
const fullnameError = editForm.querySelector('#fullname-error');
const bioError = editForm.querySelector('#bio-error');

const profileName = document.querySelector('.user-info__name');
const profileJob = document.querySelector('.user-info__job');
const profilePhoto = document.querySelector('.user-info__photo')

const addButton = document.querySelector('.user-info__button');
const editButton = document.querySelector('.user-info__edit-button'); 


const popups = new Popup();


function editProfile() {
    event.preventDefault();
    popups.submitEditButton.textContent = 'Загрузка...';
    api.changeUserInfo(fullName.value, bio.value)    
        .then(res => {
            updateUserInfo(res.name, res.about)
            popups.edit.classList.remove('popup_is-opened');
            popups.submitEditButton.textContent = 'Сохранить';
        })
        .catch(err => console.log(`editProfile error ${err}`));
}
function checkValidate(item) {  
    if (item.nextElementSibling === null) return;
    item.nextElementSibling.textContent = '';
    popups.submitEditButton.removeAttribute('disabled');  
    popups.submitEditButton.classList.add('popup__button_active');  
    if (item.value.length < 2 || item.value.length > 30) {
        event.target.nextElementSibling.textContent = 'Должно быть от 2 до 30 символов';
        popups.submitEditButton.setAttribute('disabled', true);
        popups.submitEditButton.classList.remove('popup__button_active');
    }
    if (item.value.length === 0) {
        item.nextElementSibling.textContent = 'Это обязательное поле';
        popups.submitEditButton.setAttribute('disabled', true);
        popups.submitEditButton.classList.remove('popup__button_active');
    }
}
function validate(event) {  
    const target = event.target;
    checkValidate(target);
}
function openingValidation(form) {
    for (let item of form.elements) {    
        checkValidate(item);
    };
}
function bindHandlers() {
    editButton.addEventListener('click', function() {
        popups.open(event);
    });
    addButton.addEventListener('click', function() {
        popups.open(event);
    });
    cardList.container.addEventListener('click', function() {
        popups.open(event);
    });

    document.addEventListener('click', function() {     
        if (event.target.classList.contains('popup__close')) {
            popups.close(event);
        }
    });
    document.forms.edit.addEventListener('submit', editProfile);
    fullName.addEventListener('input', validate);    
    bio.addEventListener('input', validate);
    
    addForm.addEventListener('submit', function() {
        event.preventDefault();
        popups.submitAddButton.textContent = 'Загрузка...';
        api.addCard(picName.value, picLink.value)
            .then(res => {
                console.log(res);
           
                if (res.name && res.link) {
                    cardList.addCard(res.name, res.link);
                    popups.add.classList.remove('popup_is-opened'); 
                    popups.submitAddButton.setAttribute('disabled', true);
                    popups.submitAddButton.classList.remove('popup__button_active');
                    popups.submitEditButton.textContent = '+';
                    addForm.reset();
                }
            })
            .catch(err => console.log(`addCard error ${err}`));
    });
    
    addForm.addEventListener('input', function() {  
        if (picName.value.length === 0 || picLink.value.length === 0) {    
            popups.submitAddButton.setAttribute('disabled', true);
            popups.submitAddButton.classList.remove('popup__button_active');
        } else {
            popups.submitAddButton.removeAttribute('disabled');  
            popups.submitAddButton.classList.add('popup__button_active');
        }
    }); 
}
function updateUserInfo(name, bio) {
    profileName.textContent = name;
    profileJob.textContent = bio;
}
function updateUserPhoto(link) {
    profilePhoto.setAttribute('style', `background-image: url(${link})`);
}


bindHandlers();
api.getUserInfo() 
    .then(res => {
        if (res.name && res.about) {
            updateUserInfo(res.name, res.about);
            updateUserPhoto(res.avatar); 
        }
    })    
    .catch(err => console.log(`getUserInfo error ${err}`));
api.getInitialCards()
    .then(cards => {
        if (cards && cards.length > 0) {
            cardList.render(cards);
        }
    });