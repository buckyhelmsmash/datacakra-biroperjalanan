import React from 'react';

import {Text, View} from 'react-native';
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {TouristStackNavigationProp} from "../../../utils/interface/Navigation";


const TouristDetail: React.FC<TouristStackNavigationProp<'TouristDetail'>> = ({navigation, route}) => {
    const touristId = route.params.id
    return (
        <Text>
            {touristId}
        </Text>
    );
};

export default TouristDetail;
