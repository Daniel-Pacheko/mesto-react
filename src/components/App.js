import {useState} from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';



function App({ isOpen }) {



    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});

    // Попап редактирования аватара
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }

    // Попап редактирования профиля
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }

    // Попап добавления карточки
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }


    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({});
    }
    return (
        <div className="root">
            <div className="page">
                <Header />
                <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                />
                <Footer />

                <PopupWithForm
                    name="edit"
                    title="Редактировать профиль"
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}>
                    <input required minLength="2" maxLength="40" type="text" name="name" id="name-profile"
                        placeholder="Имя" className="popup__input popup__input_type_name" />
                    <span id="name-profile-error" className="popup__input-error popup__input-error_title">#</span>
                    <input required minLength="2" maxLength="200" type="text" name="about" id="job-profile"
                        placeholder="О себе" className="popup__input popup__input_type_job" />
                    <span id="job-profile-error" className="popup__input-error popup__input-error_description">#</span>
                </PopupWithForm>
                
                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />

                <PopupWithForm
                    name="add"
                    title="Новое место"
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}>
                    <input required minLength="2" maxLength="30" type="text" name="name" id="title-card"
                        className="popup__input popup__input_type_title" placeholder="Название" />
                    <span id="title-card-error" className="popup__input-error popup__input-error_title"></span>
                    <input required type="url" name="link" id="link-card" className="popup__input popup__input_type_link"
                        placeholder="Ссылка на картинку" />
                    <span id="link-card-error" className="popup__input-error popup__input-error_description"></span>
                </PopupWithForm>

                <PopupWithForm
                    name="type_avatar"
                    title="Обновить аватар"
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}>
                    <input className="popup__input popup__input_type_img-avatar" type="url" name="avatar" id="avatar"
                        placeholder="Ссылка на фотографию" required />
                    <span className="popup__input-error popup__input-error_title" id="avatar-error">#</span>
                </PopupWithForm>

                <PopupWithForm
                    name=""
                    title="Вы уверены?"
                    submit="Да"
                    isOpen={isOpen}
                >
                </PopupWithForm>



            </div>
        </div>
    );


}



export default App;
