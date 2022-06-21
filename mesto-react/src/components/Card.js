function Card({ card, onCardClick }) {

    function handleClick() {
        onCardClick(card);
    }

    return (
        <div id="card" className="template">
            <li className="list__place">
                <img className="list__place-photo"
                    src={card.link}
                    alt={card.name}
                    onClick={handleClick} />

                <div className="list__caption">
                    <h2 className="list__place-title">{card.name}</h2>
                    <div className="list__place-description">
                        <button className="list__place-like" type="button"></button>
                        <p className="list__place-counter">{card.likes.length}</p>
                    </div>
                    <button type="button" className="list__place-delete" aria-label="удалить"></button>
                </div>
            </li>
        </div>
    )
}

export default Card;