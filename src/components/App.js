import { useEffect, useState } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';




function App({ isOpen }) {



    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);


    // create Error Api
    function errorApi(err) {
        console.log(`Ошибка: ${err}`);
    }

    useEffect(() => {
        api.getUserData()
            .then((userInfo) => {
                setCurrentUser(userInfo)
            })
            .catch(errorApi)
    }, [])

    useEffect(() => {
        api.getCards().then((Cards) => {
            setCards(Cards);
        })
            .catch(errorApi)
    }, []);


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

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeStatus(card._id, !isLiked).
            then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(errorApi);
    }

    function handleCardDelete(cardId) {
        api.deleteCard(cardId)
            .then(() => {
                setCards((cards) => cards.filter((card) => card._id !== cardId));
            })
            .catch(errorApi); 
    };


    function handleUpdateUser(newUserInfo) {
        api.setUserProfile(newUserInfo.name, newUserInfo.about)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch(errorApi);
    }

    function handleUpdateAvatar(newAvatar) {
        api.setUserAvatar(newAvatar.avatar)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch(errorApi);
    }

    function handleAddPlaceSubmit(card) {
        api.setCard(card.name, card.link)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(errorApi);
    }





    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({});
    }
    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="root">
                <div className="page">
                    <Header />
                    <Main
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                        cards={cards}
                    />
                    <Footer />



                    <ImagePopup
                        card={selectedCard}
                        onClose={closeAllPopups}
                    />

                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                    />

                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                    />

                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit}
                    />



                    <PopupWithForm
                        name=""
                        title="Вы уверены?"
                        submit="Да"
                        isOpen={isOpen}
                    >
                    </PopupWithForm>



                </div>
            </div>
        </CurrentUserContext.Provider>
    );


}



export default App;
