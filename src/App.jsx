import './App.css'
import React from 'react'
import { useState, useEffect } from 'react'
import './controllers/AuthController'
import { fetchToken, fetchUser, authUser } from './controllers/AuthController'
//import { UserContext, contextValues } from './contexts/UserContext.jsx'

function App() {
  //const userContext = useContext(UserContext)
  const [tokenInfo, SetTokenInfo] = useState('')
  const [user, setUser] = useState('')
  const debug = location.href.startsWith('http://localhost') ? true : false

  useEffect(() => {
    //Need to define function as async within the useEffect
    async function auth() {
      const params = new URLSearchParams(window.location.search)
      if (params.has('code')) {
        const code = params.get('code')
        const response = await fetchToken(code, debug)
        if (!response.error) {
          SetTokenInfo(response)
        }
      }
    }
    //Invoke the function
    auth()
  }, [])

  useEffect(() => {
    //Need to define function as async within the useEffect
    async function user() {
      if (tokenInfo.access_token) {
        setUser(await fetchUser('Bearer ' + tokenInfo.access_token))
      }
    }
    //Invoke the function
    user()
  }, [tokenInfo])

  return (
    <>
      {user
        ?
        `Hi, ${user.global_name}!`
        :
        <input
          type="button"
          onClick={() => authUser(debug)}
          value='Sign in via Discord'
        />
      }
    </>
  )
}

export default App
