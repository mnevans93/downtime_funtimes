export const authUser = (debug) => {
    const IDENTIFY_URL =
    import.meta.env.VITE_AUTH_URL + '?client_id=' +
    import.meta.env.VITE_CLIENT_ID +
    '&response_type=code&redirect_uri=' +
    (debug ? import.meta.env.VITE_DEBUG_IDENTIFY_URL : import.meta.env.VITE_IDENTIFY_URL) +
    'login&scope=identify'

    location.href = IDENTIFY_URL
}

export const fetchToken = async (code, debug) => {
    const credentials = btoa(`${import.meta.env.VITE_CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`)
    const redirect = debug ? import.meta.env.VITE_DEBUG_REDIR_URL : import.meta.env.VITE_REDIR_URL
    const data = new URLSearchParams();
    data.append('grant_type', 'authorization_code')
    data.append('code', code)
    data.append('redirect_uri', redirect)

    const response = await fetch(import.meta.env.VITE_TOKEN_URL, {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${credentials}`
        }
    })

    const json = await response.json()
    return json
}

export const fetchUser = async (token) => {
    const response = await fetch(import.meta.env.VITE_USER_URL, {
        headers: {
            Authorization: token
        }
    })
    
    const json = await response.json()
    return json
}