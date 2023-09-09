import {AuthProvider, useAuth} from "./app/context/AuthContext";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import HomeNavigator from "./app/HomeNavigator";
import Login from "./app/screens/Login";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Button, useTheme} from "@react-native-material/core";

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
    const theme = useTheme()

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    // statusBarStyle: "dark",
                    statusBarColor: theme.palette.primary.main
                }}
            >
                {
                    authState?.authenticated
                        ? (
                            <Stack.Screen
                                name={"HomeNavigator"}
                                component={HomeNavigator}
                                options={{
                                    headerShown: false
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
