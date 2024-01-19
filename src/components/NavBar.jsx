import { useContext } from 'react'
import { AuthContext } from '../contexts/auth.jsx'
import { Link } from 'react-router-dom'
import styles from './NavBar.module.css'

export default function NavBar(){

    const { userData, setToken } = useContext(AuthContext)

    return (
        <nav>
            <p>Bem vindo(a), <span>{userData.name.toUpperCase()}</span></p>
            <div className={styles.rightSideDiv}>
                <ul>
                    <li>
                        <Link to='/allevents'>Todos os eventos</Link>
                    </li>
                    <li>
                        <Link to='/myevents'>Meus eventos</Link>
                    </li>
                    <li>
                        <Link to='/myaccount'>Meu cadastro</Link>
                    </li>
                    <li>
                        <Link onClick={() => setToken('')} to='/login'>Sair</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}