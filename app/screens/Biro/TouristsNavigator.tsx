import React from 'react';
import {useTheme} from "@react-native-material/core";
import {createNativeStackNavigator, NativeStackScreenProps} from "@react-navigation/native-stack";
import Tourists from "./Tourists";
import TouristDetail from "./TouristDetail";
import {TouristStackParamList} from "../../../utils/interface/Navigation";




const Stack = createNativeStackNavigator<TouristStackParamList>()

const TouristsNavigator = () => {
    const theme = useTheme()


    return (
        <Stack.Navigator
            screenOptions={{
                statusBarColor: theme.palette.primary.main
            }}
        >
            <Stack.Screen
                name={"Tourist"}
                component={Tourists}
            />
            <Stack.Screen
                name={"TouristDetail"}
                component={TouristDetail}
            />
        </Stack.Navigator>
    );
};

export default TouristsNavigator;
