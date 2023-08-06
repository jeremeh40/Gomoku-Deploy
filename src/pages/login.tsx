export default function login() {
  return (
    <form className="login-form">
      <input name="username" type="text" placeholder="Username" value =""/>
      <input name= "password" type ="password" placeholder="Password" value=""/>
      <button type ="submit">Login</button>
    </form>
  )
}
