import { Link } from 'react-router-dom'
import styles from './SignUp.module.css'
import { useRef } from 'react'
import { api } from '../sevices/api'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { AuthContext } from '../contexts/auth'
import { useContext } from 'react'

export default function SignUp(){

    const { setUserData, setToken } = useContext(AuthContext)

    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()
        if (userData.password1Ref.current.value != userData.password2Ref.current.value){
            alert('As senhas não conferem')
        } else {
            const response = await api.post('/users', {
                name: userData.nameRef.current.value,
                email: userData.emailRef.current.value,
                cpf: userData.cpfRef.current.value,
                cel: userData.celRef.current.value,
                password: userData.password1Ref.current.value
            })
            if (response.status == 201){
                const response = await api.post('/users/login', {
                    email: userData.emailRef.current.value,
                    password: userData.password1Ref.current.value
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
    }

    const userData = {
        nameRef: useRef(null),
        emailRef: useRef(null),
        cpfRef: useRef(null),
        celRef: useRef(null),
        password1Ref: useRef(null),
        password2Ref: useRef(null)
    }

    return (
        <>
            <Header />
            <main className={styles.signUpMain}>
                <div className={styles.mainDiv}>
                    <h1>Crie sua conta e faça parte da comunidade <span>GatherSphere</span></h1>
                    <form className={styles.loginForm}>
                        <input ref={userData.nameRef} type="text" placeholder='Seu nome completo' />
                        <input ref={userData.emailRef} type="email" placeholder='Seu e-mail' />
                        <input ref={userData.cpfRef} type="text" placeholder='CPF (apenas números)' />
                        <input ref={userData.celRef} type="text" placeholder='Celular' />
                        <input ref={userData.password1Ref} type="password" placeholder='Sua senha' />
                        <input ref={userData.password2Ref} type="password" placeholder='Confirme sua senha' />
                        <input className={styles.signUpBtn} type="submit" value="Cadastrar" onClick={handleSubmit} />
                    </form>
                    <div className={styles.additionalInfoDiv}>
                        <p>Já tem uma conta? <span><Link to='/gather-sphere-frontend/login'>Entrar!</Link></span></p>
                    </div>
                </div>
            </main>
        </>
    )
}