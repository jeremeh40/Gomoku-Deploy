/* Component to track user state as to whether they are logged in or not*/

import { useState } from 'react'
import {UserContext} from '../context'
import { User } from '../types/User'

type UserProviderProps = {
    children: React.ReactNode
}


export default function UserProvider({children}: UserProviderProps) {
    //track state of user and also define login status

    const [user, setUser] = useState<User | undefined>(undefined)
    const login = (username:string) => setUser({username})
    const logout = () => setUser(undefined)
  return (
    <UserContext.Provider value = {{user, login, logout}}>
        {children}
    </UserContext.Provider>
  )
}
