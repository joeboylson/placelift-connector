import { useContext } from "react";
import { UserContext } from "../../components/AuthenticatedWrapper";


export default function Home() {

    const user = useContext(UserContext);

    return (
        <div>
            <p>Home</p>
            <p>{JSON.stringify(user)}</p>
        </div>
    )
} 