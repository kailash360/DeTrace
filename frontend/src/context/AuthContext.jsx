import React from 'react'

export const AuthContext = React.createContext()

function AuthContextProvider(props) {

  const [state,setState] = React.useState({
    authenticated: false,
    account: '',
    name: '',
    role: 'not_registered'
  })

  const authenticate = () =>{
    setState({...state, authenticated: true})
  }

  const deauthenticate = () =>{
    setState({...state, authenticated: false})
  }

  const updateAuth = (data) =>{
    setState({...state, ...data})
  }

  return (
    <AuthContext.Provider
      value={{...state,...{
        authenticate,
        deauthenticate,
        updateAuth
      }}}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider