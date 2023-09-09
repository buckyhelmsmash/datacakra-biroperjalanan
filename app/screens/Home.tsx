import React from 'react';

import {useAuth} from "../context/AuthContext";
import {Button, Flex, Spacer, Text} from "@react-native-material/core";
import {HomeBottomTabNavigationProp} from "../../utils/interface/Navigation";

const Home: React.FC<HomeBottomTabNavigationProp<'Home'>>  = () => {
    const {authState, onLogout} = useAuth()
    return (
        <Flex fill style={{margin: 16, gap: 12}}>
            <Text variant="h6">Nama: {authState.name}</Text>
            <Text variant="h6">Email: {authState.email}</Text>
            <Spacer/>
            <Button title={"Logout"} onPress={() => onLogout()}/>
        </Flex>
    );
};

export default Home;
