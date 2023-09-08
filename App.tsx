import {Button} from 'react-native';
import {AuthProvider, useAuth} from "./app/context/AuthContext";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import Home from "./app/screens/Home";
import Login from "./app/screens/Login";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {queries: {retry: 2}},
})

export default function App() {
    return (
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <Layout/>
            </QueryClientProvider>
        </AuthProvider>
    );
}

const Stack = createNativeStackNavigator()

export const Layout = () => {
    const {authState, onLogout} = useAuth()

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {
                    authState?.authenticated
                        ? (
                            <Stack.Screen
                                name={"Home"}
                                component={Home}
                                options={{
                                    headerRight: () => <Button onPress={onLogout} title={"Sign Out"}/>
                                }}
                            />
                        )
                        : (
                            <Stack.Screen
                                name={"Login"}
                                component={Login}
                            />
                        )
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}
