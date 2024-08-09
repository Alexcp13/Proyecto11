import { NavLink } from "react-router-dom"
import "./Header.css"

const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/" activeclassname="active">
                            Adivina el personaje
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/rotateGame">Coloca las fotos en la posicion correcta</NavLink>
                    </li>
                    <li>
                        <NavLink to="/characters">Personajes</NavLink>
                    </li>
                </ul>
            </nav>
        </header>

    )
}

export default Header;