/* Login page that allows users to login with username and password that has been defined
in users.json file*/

import style from './Login.module.css'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context'
import users from '../data/users.json'

export default function Login() {
  //track states for username and password and whether they match, and user is logged in
  const { login } = useContext(UserContext)
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isCredentialInvald, setIsCredentialInvald] = useState(false)


  /* match user login against defined username and password from users.json file 
  and if it matches navigate to home page, if no match CredentialInvalid state is updated */
  const handleLogin = () =>{
    const user = users.find(
      (u) => u.username === username && u.password === password)
      if(!user){
        setIsCredentialInvald(true)
      }
      else{
        login(username)
        navigate('/')
      }
  }

  /* render login page. Form that takes username and password inputs and runs handleLogin function
  to determine matches. Contains error handling if username or password do not match */

  return (
    <form className={style.container}
    onSubmit={(e) =>{
      e.preventDefault()
      handleLogin()
    }}
    >
      {isCredentialInvald && <div className={style.message}>Invalid username or password</div>}
      <input className={style.username} 
      name="username" 
      type="text" 
      placeholder="Username" 
      value ={username}
      onChange={(e) => 
        {setUsername(e.target.value)
        setIsCredentialInvald(false)}}
      />
      <input className={style.password} 
      name= "password" 
      type ="password" 
      placeholder="Password" 
      value={password}
      onChange={(e) => 
        {setPassword(e.target.value)
        setIsCredentialInvald(false)}}
      />
      <button className={style.button} type ="submit">Login</button>
    </form>
  )
}
