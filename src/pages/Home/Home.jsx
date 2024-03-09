import Header from "../../ui/components/Header/Header.jsx"
import Footer from "../../ui/components/Footer/Footer.jsx"
import styles from './Home.module.css'
import { useNavigate } from "react-router-dom"
import startImg from '../../assets/startImg.png'

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
                    <img src={startImg} alt="GatherSphere" className={styles.startImg} />
                </div>
            </main>
            <Footer />
        </>
    )
}