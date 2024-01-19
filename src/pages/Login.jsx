import styles from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useRef } from 'react'
import { api } from '../sevices/api.js'
import { AuthContext } from '../contexts/auth.jsx'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

export default function Login(){

    const { setToken, setUserData } = useContext(AuthContext)
    
    const emailRef = useRef(null)
    const passRef = useRef(null)

    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()
        if (!emailRef.current?.value || !passRef.current?.value){
            alert('Prencha os campos!')
        } else {
            const response = await api.post('/users/login', {
                email: emailRef.current?.value,
                password: passRef.current?.value
            })
            const login = await api.get('/users/' + response.data.id, {
                headers: {
                    'Authorization': `Bearer ${response.data.token}`
                }
            })
            if (login.status == 200){
                setToken(`${response.data.token}`)
                setUserData(response.data.user)
                navigate('/gather-sphere-frontend/allevents')
            }
        }
    }

    return (
        <>
            <Header />
            <main className={styles.loginMain}>
                <div className={styles.mainDiv}>
                    <h1>Entrar no <span>GatherSphere</span></h1>
                    <form className={styles.loginForm}>
                        <input type="email" placeholder='Seu e-mail' ref={emailRef} />
                        <input type="password" placeholder='Sua senha' ref={passRef} />
                        <input className={styles.loginBtn} type="submit" value="Entrar" onClick={handleSubmit} />
                    </form>
                    <div className={styles.additionalInfoDiv}>
                        <p>Não possui uma conta? <span><Link to='/signup'>Criar agora!</Link></span></p>
                        <p>Esqueceu a senha? <span><Link>Recuperar!</Link></span></p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}