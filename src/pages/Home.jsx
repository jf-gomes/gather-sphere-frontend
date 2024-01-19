import Header from "../components/Header"
import Footer from "../components/Footer"
import styles from './Home.module.css'
import { useNavigate } from "react-router-dom"
import Slides from "../components/Slides"

export default function Home(){

    const navigate = useNavigate()

    return (
        <>
            <Header />
            <main className={styles.homeMain}>
                <div className={styles.leftSideDiv}>
                    <h1>Encontre eventos na sua região</h1>
                    <p>Crie seus eventos, inscreva-se em outros eventos próximos a você.</p>
                    <div className={styles.btnDiv}>
                        <button onClick={() => navigate('/gather-sphere-frontend/signup')}>Cadastrar</button>
                        <button onClick={() => navigate('/gather-sphere-frontend/login')}>Entrar</button>
                    </div>
                </div>
                <div>
                    <Slides />
                </div>
            </main>
            <Footer />
        </>
    )
}