import LogoMesto from '../images/Logo-mesto.svg'

function Header() {
    return (
        <header className="header">
            <img className="header__logo" src={LogoMesto} alt="Логотип" />
        </header>
    );
}

export default Header;