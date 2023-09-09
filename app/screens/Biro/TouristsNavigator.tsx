import React from 'react';
import {useTheme} from "@react-native-material/core";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "../Login";
import Tourists from "./Tourists";


const Stack = createNativeStackNavigator()

const TouristsNavigator = () => {
    const theme = useTheme()


    return (
        <Stack.Navigator
            screenOptions={{
                statusBarColor: theme.palette.primary.main
            }}
        >
            <Stack.Screen
                name={"Biro"}
                component={Tourists}
            />

        </Stack.Navigator>
    );
};

export default TouristsNavigator;
