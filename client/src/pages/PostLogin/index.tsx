import axios from "axios";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function PostLogin() {

    const navigate = useNavigate();

    useEffect(() => {
        const parsedHash = new URLSearchParams(window.location.hash.substring(1));
        const refreshToken = parsedHash.get("refresh_token");

        axios.get(`/api/post-login?refresh_token=${refreshToken}`)
            .then(function (response) {
                navigate("/")
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    return <p >Loggin you in...</p>
} 