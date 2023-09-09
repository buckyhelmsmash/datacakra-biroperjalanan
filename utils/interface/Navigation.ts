import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {MaterialBottomTabScreenProps} from "@react-navigation/material-bottom-tabs";

// ROOT
export type RootStackParamList = {
    HomeNavigator: undefined;
    Login: undefined;
};

export type RootStackNavigationProp<
    T extends keyof RootStackParamList
> = NativeStackScreenProps<RootStackParamList, T>;


// HOME
export type HomeBottomTabParamList  = {
    Home: undefined,
    TouristNavigator: undefined
}

export type HomeBottomTabNavigationProp<
    T extends keyof HomeBottomTabParamList
> = MaterialBottomTabScreenProps<HomeBottomTabParamList, T>;

// TOURIST
export type TouristStackParamList = {
    Tourist: undefined,
    TouristDetail: { id: string }
}

export type TouristStackNavigationProp<
    T extends keyof TouristStackParamList
> = NativeStackScreenProps<TouristStackParamList, T>;
