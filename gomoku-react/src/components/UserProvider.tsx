/* Component to track user state as to whether they are logged in or not*/

import {UserContext} from '../context'
import { User, Credential } from '../types/User'
import { useLocalStorage } from '../hooks'
import {post, setToken} from '../utils/http'

const API_HOST = process.env.API_HOST || ''

type UserProviderProps = {
    children: React.ReactNode
}


export default function UserProvider({children}: UserProviderProps) {
    //track state of user and also define login status

    const [user, setUser] = useLocalStorage<User | undefined>('user', undefined)
    if(user){
      setToken(user.token)
    }

    /* Post request to complete user login. sends user credentials to server API endpoint to check if they are valid
    
    */

    const login = async (username: string, password: string) => {
      try {
        const user = await post<Credential, User>(`${API_HOST}/api/auth/login`, {
          username,
          password,
        })
        setUser(user)
        setToken(user.token)
        return true
      } catch (error) {
        if (error instanceof Error) {
          return error.message
        }
        return 'Unable to login at this moment, please try again'
      }
    }

        /* Post request to complete user sign up. Sends username and password created by user to server to be validated and stored.
    
    */
  
    const signUp = async (username: string, password: string) => {
      try {
        const user = await post<Credential, User>(
          `${API_HOST}/api/auth/register`,
          {
            username,
            password,
          }
        )
        setUser(user)
        setToken(user.token)
        return true
      } catch (error) {
        if (error instanceof Error) {
          return error.message
        }
        return 'Unable to login at this moment, please try again'
      }
    }

         /* function to handle user logout and set User and Token to undefined and empty
    
    */
    
    const logout = () => {
      setUser(undefined)
      setToken('')
    }



  return (
    <UserContext.Provider value = {{user, login, signUp , logout}}>
        {children}
    </UserContext.Provider>
  )
}
