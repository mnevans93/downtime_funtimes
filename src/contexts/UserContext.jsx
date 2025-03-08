import { createContext } from "react"

export const contextValues = (tokenObj, user) => {
    const expiry = new Date()
    expiry.setSeconds(expiry.getSeconds() + tokenObj.expires_in)
    return {
        'token': tokenObj.access_token,
        'refreshToken': tokenObj.refresh_token,
        'tokenExpiration': expiry,
        'username': user.global_name,
        'userID': user.id
    }
}

export const UserContext = createContext(contextValues)