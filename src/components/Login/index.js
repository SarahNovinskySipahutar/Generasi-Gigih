import './index.css';
import { useEffect } from "react";

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_KEY;
const SPOTIFY_AUTHORIZE_URL = 'https://accounts.spotify.com/authorize';
const REDIRECT_URL = "http://localhost:3000/";
const SCOPES = 'playlist-modify-private';

const getReturnedToken = (hash) => {
    const stringAfterHastag = hash.substring(1);
    const params = stringAfterHastag.split('&');
    const paramsSplitUp = params.reduce((acc, param) => {
        console.log(param);
        const [key, value] = param.split('=');
        acc[key] = value;
        return acc;
    }, {});

    return paramsSplitUp;
}

const Login = () => {
    useEffect(() => {
        if (window.location.hash) {
            const { 
                access_token
            } = getReturnedToken(window.location.hash);
            localStorage.setItem('access_token', access_token);
        }
    });
    const handleLogin = () => {
        window.location = `${SPOTIFY_AUTHORIZE_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=${SCOPES}&response_type=token`;
    }

    return(
        <button onClick={handleLogin} className="btnLogin">Login</button>
    )
}

export default Login;