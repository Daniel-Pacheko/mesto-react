import { useEffect, useState } from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]);


    function errorApi(err) {
        console.log(`Ошибка: ${err}`);
    }

    useEffect(() => {
        api.getUserData().then((userData) => {
            setUserName(userData.name);
            setUserDescription(userData.about);
            setUserAvatar(userData.avatar);
        })
            .catch((err) => {
                errorApi(err);
            });

        api.getCards().then((Cards) => {
            setCards(Cards);
        })
            .catch((err) => {
                errorApi(err);
            });
    });


    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container">
                    <img className="profile__avatar" src={userAvatar}
                        alt="Здесь должен быть аватар пользователя" />
                    <button className="profile__icon-btn" type="submit" aria-label="редактировать аватар" onClick={onEditAvatar}></button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">{userName}</h1>
                    <button type="button" className="profile__button-edit" aria-label="редактировать профель" onClick={onEditProfile}></button>
                    <h2 className="profile__subtitle">{userDescription}</h2>
                </div>
                <button type="button" className="profile__button-add" aria-label="добавить карточку" onClick={onAddPlace}></button>
            </section>

            <section className="lists">
                <ul className="list">
                    {cards.map((card) => (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={onCardClick}
                        />
                    )
                    )}
                </ul>
            </section>
        </main>
    );
}

export default Main;