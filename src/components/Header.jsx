import logo from '../assets/logo.png'
import styles from './Header.module.css'

export default function Header(){
    return (
        <header>
            <img className={styles.logo} src={logo} alt="GatherSphere" />
        </header>
    )
}