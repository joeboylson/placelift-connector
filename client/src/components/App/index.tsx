import { useEffect } from "react"

const NODE_ENV = process.env.NODE_ENV;
const SERVER_URL = NODE_ENV === "development" ? "http://localhost:8080" : ""


export default function App() {

    useEffect(() => {

        fetch(`/api/ping`)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error))
    }, [])

    return <p>PlaceLift Connector</p>
}