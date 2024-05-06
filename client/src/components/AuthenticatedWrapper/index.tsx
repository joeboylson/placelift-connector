import axios from "axios";
import { WithChildren } from "../../types"
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type AuthenticatedWrapperProps = WithChildren & {};

interface UserContextType { user: any }
export const UserContext = createContext<UserContextType>({ user: null });

export default function AuthenticatedWrapper({ children }: AuthenticatedWrapperProps) {

    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useState<any>();

    useEffect(() => {
        setLoading(true)
        axios.get(`/api/is-authenticated`)
            .then(function (response) {
                setUser(response.data.user);
            })
            .catch(function (error) {
                navigate("/login")
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <p>loading</p>
    }

    return (
        <div>
            <UserContext.Provider value={{ user }}>
                <p>AUTHENTICATED</p>
                {children}
            </UserContext.Provider>
        </div>
    )
} 