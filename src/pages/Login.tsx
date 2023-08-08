import style from './Login.module.css'
import { useState } from 'react'
import users from '../data/users.json'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isCredentialInvald, setIsCredentialInvald] = useState(false)

  const handleLogin = () =>{
    const user = users.find(
      (u) => u.username === username && u.password === password)
      if(!user){
        setIsCredentialInvald(true)
      }
      else{
        console.log('logged in')
      }
  }

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
