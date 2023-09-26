/* signup page that allows users to create username and password to be stored in database for future login*/

import style from './Login.module.css'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context'

export default function SignUp() {

    //set initial states for username and password fields
    const {signUp} = useContext(UserContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()


    // function that sends request to server to create user with username and password
    const handleSignUp = async () => {

        setErrorMessage('')

        if (password !== confirmPassword){
            setErrorMessage('Passwords do not match')
            return;
        }

        const result = await signUp(username, password)
        if(result===true){
            navigate('/')

        }
        else{
            setErrorMessage(result)
        }
    }

    /* render sign up page. Form that takes username and password inputs and runs handleSignUp function
    to determine matches. Contains error handling if username or password do not match */
    return(

        <form className={style.container}
        onSubmit={(e) =>{

            e.preventDefault()
            handleSignUp()
        }}>

            {errorMessage && <div className={style.message}>{errorMessage}</div>} 

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