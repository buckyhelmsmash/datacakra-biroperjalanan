import React from 'react';
import {useTheme} from "@react-native-material/core";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Tourists from "./Tourists";
import TouristAdd from "./TouristAdd";
import TouristDetail from "./TouristDetail";
import {HomeBottomTabNavigationProp, TouristStackParamList} from "../../../utils/interface/Navigation";


const Stack = createNativeStackNavigator<TouristStackParamList>()

const TouristsNavigator: React.FC<HomeBottomTabNavigationProp<'TouristNavigator'>> = ({navigation}) => {
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
                name={"TouristAdd"}
                component={TouristAdd}
            />
            <Stack.Screen
                name={"TouristDetail"}
                component={TouristDetail}
            />
        </Stack.Navigator>
    );
};

export default TouristsNavigator;
