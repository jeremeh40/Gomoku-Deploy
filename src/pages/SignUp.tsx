import style from './Login.module.css'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import users from '../data/users.json'


export default function SignUp() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSignUp = () => {

        setErrorMessage('')

        if (users.find((u) => u.username === username)) {
            setErrorMessage(`Username ${username} has been taken`)
            return

        }
        if (password !== confirmPassword){
            setErrorMessage('Passwords do not match')
            return;
        }

        else{
     

        }



    }





    return(

        <form className={style.container}
        onSubmit={(e) =>{

            e.preventDefault()
            handleSignUp()
        }}>

            {errorMessage && <div className={style.message}>Passwords do not match</div>} 

            <input className={style.username} 
            name = "username" 
            placeholder='Username' 
            value = {username} 
            onChange = {(e) => {
                setErrorMessage('')
                setUsername(e.target.value) }
            }
                />

            <input className ={style.password} 
            name = "password" 
            type = "password" 
            placeholder='Password' 
            value = {password}
            onChange = {(e) => {
                setErrorMessage('')
                setPassword(e.target.value) }
            }/>

            <input className ={style.password} 
            name = "confirmPassword" 
            type = "password" 
            placeholder='Confirm Password' 
            value = {confirmPassword}
            onChange = {(e) => {
                setErrorMessage('')
                setConfirmPassword(e.target.value) }
            }/>

            <button className ={style.button} type = "submit" disabled = {!username || !password || !confirmPassword}> Sign Up</button>

        </form>

      



    )
}