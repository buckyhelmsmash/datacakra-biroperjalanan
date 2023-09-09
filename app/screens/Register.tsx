import React, {useState} from 'react';

import {Text} from 'react-native';
import {useAuth} from "../context/AuthContext";
import {Button, Flex, IconButton, TextInput} from "@react-native-material/core";
import {Controller, useForm} from "react-hook-form";
import {LoginParam, RegisterParam} from "../../utils/interface/AuthInterface";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {useMutation} from "@tanstack/react-query";
import {RootStackNavigationProp} from "../../utils/interface/Navigation";
import {datacakraAxios} from "../../utils/AxiosInstance";


export interface Root {
    $id: number
    code: number
    data: Data
    message: string
}

export interface Data {
    email: string
    id: string
    name: string
}

const Login: React.FC<RootStackNavigationProp<'Register'>> = ({navigation}) => {
    const {onLogin} = useAuth()
    const {mutateAsync, isLoading} = useMutation({
        mutationKey: ["Register"],
        mutationFn: async (data: RegisterParam): Promise<Root> => {
            const result = await datacakraAxios.post('/authaccount/registration', {
                name: data.name,
                email: data.email,
                password: data.password
            })

            return result?.data
        },
        onSettled: async (data, error, variables) => {
            console.log("🌍 variables", variables)
            console.log("🌍 data", data)
            if(data?.message === "success"){
                await onLogin({email: variables.email, password: variables.password})
            }
        }
    })

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const {control, handleSubmit, formState: {errors}} = useForm<RegisterParam>();

    const onSubmit = handleSubmit(async data => {
        await mutateAsync(data)
    })

    return (
        <Flex fill style={{margin: 16, gap: 18}}>
            <Flex>
                <Controller
                    name={"name"}
                    control={control}
                    rules={{required: true}}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            label="Name"
                            variant={"outlined"}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.name && <Text style={{color: 'red'}}>Email is required.</Text>}
            </Flex>
            <Flex>
                <Controller
                    name={"email"}
                    control={control}
                    rules={{required: true}}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            label="Email"
                            variant={"outlined"}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            textContentType={"emailAddress"}
                            autoComplete={"email"}
                        />
                    )}
                />
                {errors.email && <Text style={{color: 'red'}}>Email is required.</Text>}
            </Flex>
            <Flex>
                <Controller
                    name={"password"}
                    control={control}
                    rules={{required: true}}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            secureTextEntry={showPassword}
                            trailing={
                                <IconButton
                                    icon={<Icon name={showPassword ? "eye-off" : "eye"} size={25}/>}
                                    onPress={() => setShowPassword(!showPassword)}
                                />
                            }
                            label="Password"
                            variant={"outlined"}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            autoCapitalize="none"
                        />
                    )}
                />
                {errors.email && <Text style={{color: 'red'}}>Password is required.</Text>}
            </Flex>
            <Flex>
                <Button
                    title="Register"
                    onPress={onSubmit}
                    loading={isLoading}
                />
            </Flex>
            <Flex center>
                <Text >or</Text>
            </Flex>
            <Flex>
                <Button
                    variant={"text"}
                    title="Login"
                    onPress={() => navigation.replace('Login')}
                    loading={isLoading}
                />
            </Flex>
        </Flex>
    );
};

export default Login;
