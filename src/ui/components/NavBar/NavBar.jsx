import { useContext } from 'react'
import { AuthContext } from '../../../data/contexts/auth.jsx'
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
                        <Link to='/gather-sphere-frontend/allevents'>Todos os eventos</Link>
                    </li>
                    <li>
                        <Link to='/gather-sphere-frontend/myevents'>Meus eventos</Link>
                    </li>
                    <li>
                        <Link to='/gather-sphere-frontend/myaccount'>Meu cadastro</Link>
                    </li>
                    <li>
                        <Link onClick={() => setToken('')} to='/gather-sphere-frontend/login'>Sair</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}