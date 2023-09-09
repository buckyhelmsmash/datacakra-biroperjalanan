import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialIcon  from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesomeIcon  from "@expo/vector-icons/FontAwesome";
import IonIcon  from "@expo/vector-icons/Ionicons";
import Home from "./screens/Home";
import {useTheme} from "@react-native-material/core";
import Biro from "./screens/Biro/Biro";

const HomeNavigator = () => {
    const theme = useTheme()
    const Tab = createMaterialBottomTabNavigator()

    const bottomMenu = [
        {
            route: "Home",
            label: "Home",
            activeIcon: <FontAwesomeIcon name={"user-circle"} size={26} color={theme.palette.primary.main}/>,
            inActiveIcon: <FontAwesomeIcon name={"user-circle-o"} size={26} color={"gray"}/>,
            component: Home
        },
        {
            route: "Biro",
            label: "Biro",
            activeIcon: <IonIcon name={"airplane"} size={26} color={theme.palette.primary.main}/>,
            inActiveIcon: <IonIcon name={"airplane-outline"} size={26} color={"gray"}/>,
            component: Biro
        }
    ]
    return (
        <Tab.Navigator
            initialRouteName={"Home"}
            activeColor={theme.palette.primary.main}
            inactiveColor={"gray"}
        >
            {bottomMenu.map((item, index) => {
                return(
                    <Tab.Screen
                        key={index}
                        name={item.route}
                        component={item.component}
                        options={{
                            tabBarLabel: undefined,
                            tabBarIcon: ({focused}) => {
                                if(focused) return item.activeIcon
                                else return item.inActiveIcon
                            }
                        }}
                    />
                )
            })}
        </Tab.Navigator>
    );
};

export default HomeNavigator;
