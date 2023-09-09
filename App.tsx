import {AuthProvider, useAuth} from "./app/context/AuthContext";
import {
    createNativeStackNavigator,
    NativeStackScreenProps
} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import HomeNavigator from "./app/HomeNavigator";
import Login from "./app/screens/Login";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Button, useTheme} from "@react-native-material/core";
import {RootStackParamList} from "./utils/interface/Navigation";

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



const Stack = createNativeStackNavigator<RootStackParamList>()

export const Layout = () => {
    const {authState, onLogout} = useAuth()
    const theme = useTheme()

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {
                    authState?.authenticated
                        ? (
                            <Stack.Screen
                                name={"HomeNavigator"}
                                component={HomeNavigator}
                                options={{
                                    headerShown: false,
                                    statusBarColor: theme.palette.primary.main
                                }}
                            />
                        )
                        : (
                            <Stack.Screen
                                name={"Login"}
                                component={Login}
                                options={{
                                    statusBarColor: theme.palette.primary.main
                                }}
                            />
                        )
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}
