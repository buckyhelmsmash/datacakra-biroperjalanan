import React from 'react';
import {createMaterialBottomTabNavigator, MaterialBottomTabScreenProps} from '@react-navigation/material-bottom-tabs';
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome";
import IonIcon from "@expo/vector-icons/Ionicons";
import Home from "./screens/Home";
import {useTheme} from "@react-native-material/core";
import Tourists from "./screens/Biro/Tourists";
import {HomeBottomTabParamList, RootStackNavigationProp} from "../utils/interface/Navigation";
import TouristsNavigator from "./screens/Biro/TouristsNavigator";



const Tab = createMaterialBottomTabNavigator<HomeBottomTabParamList >()

const HomeNavigator:  React.FC<RootStackNavigationProp<'HomeNavigator'>>  = () => {
    const theme = useTheme()

    return (
        <Tab.Navigator
            initialRouteName={"Home"}
            activeColor={theme.palette.primary.main}
            inactiveColor={"gray"}
        >
            <Tab.Screen
                name={"Home"}
                component={Home}
                options={{
                    tabBarIcon: ({focused}) => {
                        if(focused) return <FontAwesomeIcon name={"user-circle"} size={26} color={theme.palette.primary.main}/>
                        else return<FontAwesomeIcon name={"user-circle-o"} size={26} color={"gray"}/>
                }}}
            />
            <Tab.Screen
                name={"TouristNavigator"}
                component={TouristsNavigator}
                options={{
                    tabBarIcon: ({focused}) => {
                        if(focused) return <IonIcon name={"airplane"} size={26} color={theme.palette.primary.main}/>
                        else return<IonIcon name={"airplane-outline"} size={26} color={"gray"}/>
                    }}}
            />
        </Tab.Navigator>
    );
};

export default HomeNavigator;
