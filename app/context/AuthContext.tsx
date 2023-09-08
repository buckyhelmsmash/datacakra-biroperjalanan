import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {datacakraAxios} from "../../utils/AxiosInstance";
import * as SecureStore from 'expo-secure-store';
import {SESSION_TOKEN} from "../../utils/constants";
import {AxiosResponse} from "axios";
import {IErrorResponse, IRegisterResponse} from "../../utils/interface/NetworkResponseInterface";
import {LoginParam} from "../../utils/interface/AuthInterface";

interface AuthProps {
    authState: { token: string | null; authenticated: boolean | null },
    onRegister: (email: string, password: string, name: string) => Promise<any>,
    onLogin: (param: LoginParam) => Promise<any>,
    onLogout: () => Promise<any>
}

const AuthContext = createContext<AuthProps>({
    onRegister: async () =>{},
    onLogin: async () =>{},
    onLogout: async () =>{},
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
    authenticated: boolean | null
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [authState, setAuthState] = useState<Auth>(
        {
            token: null,
            authenticated: null
        }
    );

    useEffect(() => {
        const loadToken = async  () => {
            const token = await SecureStore.getItemAsync(SESSION_TOKEN)

            if(token){
                datacakraAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`

                setAuthState({
                    token: token,
                    authenticated: true
                })
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
             const result = await datacakraAxios.post('/authaccount/login', {email, password})

            console.log("🌍 login", result?.data.data.Token)

            const token = result?.data.data.Token

            console.log("🌍 token", token)

            setAuthState({
                token: token,
                authenticated: true
            })

            datacakraAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`

            await SecureStore.setItemAsync(SESSION_TOKEN, token)

        } catch (e) {
            return {error: true, message: (e as any).response.data.message}
        }
    }

    const logout = async () => {
        await SecureStore.deleteItemAsync(SESSION_TOKEN)

        datacakraAxios.defaults.headers.common['Authorization'] = ''

        setAuthState({
            token: null,
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
