import React from 'react';

import {Text, View} from 'react-native';
import {useAuth} from "../context/AuthContext";

const Home = () => {
    const {authState} = useAuth()
    return (
        <Text>
            {authState.token}
        </Text>
    );
};

export default Home;
