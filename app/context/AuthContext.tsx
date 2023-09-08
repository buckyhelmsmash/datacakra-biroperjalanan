import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {datacakraAxios} from "../../utils/AxiosInstance";
import * as SecureStore from 'expo-secure-store';
import {SESSION_TOKEN} from "../../utils/constants";
import {AxiosResponse} from "axios";
import {IErrorResponse, ILoginResponse, IRegisterResponse} from "../../utils/interface/NetworkResponseInterface";
import {LoginParam} from "../../utils/interface/AuthInterface";

interface AuthProps {
    authState: { token: string | null; authenticated: boolean | null },
    onRegister: (email: string, password: string, name: string) => Promise<any>,
    onLogin: (param: LoginParam) => Promise<any>,
    onLogout: () => Promise<any>
}

const AuthContext = createContext<AuthProps>({
    onRegister: async () => {
    },
    onLogin: async () => {
    },
    onLogout: async () => {
    },
    authState: {
        token: null,
        authenticated: null
    }
})


export const useAuth = () => useContext(AuthContext)

interface AuthProviderProps {
    children: ReactNode
}

interface Auth {
    token: string | null,
    email: string | null,
    name: string | null,
    id: string | null,
    authenticated: boolean | null
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [authState, setAuthState] = useState<Auth>(
        {
            token: null,
            email: null,
            name: null,
            id: null,
            authenticated: null
        }
    );

    useEffect(() => {
        const loadToken = async () => {
            try {
                const session = await SecureStore.getItemAsync(SESSION_TOKEN)
                console.log("🌍 session", session)
                if (session != null) {
                    const {Token: token, Name: name, Email: email, Id: id} = JSON.parse(session)

                    datacakraAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`

                    setAuthState({
                        token: token,
                        name: name,
                        email: email,
                        id: id,
                        authenticated: true
                    })

                }
            } catch (e) {
                console.log("🌍 error load session", e)
            }
        }
        loadToken()
    }, []);

    const register = async (email: string, password: string, name: string): Promise<AxiosResponse<IRegisterResponse> | IErrorResponse> => {
        try {
            return await datacakraAxios.post('/authaccount/registration', {email, password, name})
        } catch (e) {
            return {error: true, message: (e as any).response.data.message}
        }
    }

    const login = async (param: LoginParam): Promise<IErrorResponse | undefined> => {
        const {email, password} = param
        try {
            const result: AxiosResponse<ILoginResponse> = await datacakraAxios.post('/authaccount/login', {email, password})

            console.log("🌍 login", result?.data.data)

            const {Token: token, Name: name, Email: emailStorage, Id: id} = result?.data.data

            setAuthState({
                token: token,
                name: name,
                email: emailStorage,
                id: id,
                authenticated: true
            })

            datacakraAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`

            await SecureStore.setItemAsync(
                SESSION_TOKEN,
                JSON.stringify(
                    {
                        token,
                        name,
                        email,
                        id
                    }
                )
            )

        } catch (e) {
            return {error: true, message: (e as any).response.data.message}
        }
    }

    const logout = async () => {
        await SecureStore.deleteItemAsync(SESSION_TOKEN)

        datacakraAxios.defaults.headers.common['Authorization'] = ''

        setAuthState({
            token: null,
            id: null,
            email: null,
            name: null,
            authenticated: null
        })
    }

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
