import React from 'react';
import {TouristStackNavigationProp} from "../../../utils/interface/Navigation";
import {useMutation} from "@tanstack/react-query";
import {datacakraAxios} from "../../../utils/AxiosInstance";
import {Tourist} from "../../../utils/interface/NetworkResponseInterface";
import {Button, Flex, Text, TextInput} from "@react-native-material/core";
import {Controller, useForm} from "react-hook-form";


const TouristAdd: React.FC<TouristStackNavigationProp<'TouristAdd'>> = ({navigation}) => {
    const {control, handleSubmit, formState: {errors}, setValue, setFocus, reset} = useForm<TouristForm>();

    const {mutateAsync, isLoading} = useMutation({
        mutationKey: ["create"],
        mutationFn: async (data: TouristForm) => {
            try {
                console.log("🌍 add", data)
                const result = await datacakraAxios.post<Tourist>(`/Tourist`, {
                    tourist_name: data.tourist_name,
                    tourist_location: data.tourist_location,
                    tourist_email: data.tourist_email,
                });
                return result?.data;
            } catch (e) {
                console.log("🌍 e", e)
            }
        },
        onSuccess: (data) => {
            navigation.replace('TouristDetail', {id: data?.id as string})
        }
    })

    const onSubmit = handleSubmit(async data => {
        await mutateAsync(data)
    })

    return (
        <Flex fill style={{margin: 16, gap: 18}}>
            {/*<Flex center>*/}
            {/*    <Avatar image={{uri: touristDetail?.tourist_profilepicture}} size={100}/>*/}
            {/*</Flex>*/}
            <Flex>
                <Controller
                    name={"tourist_name"}
                    control={control}
                    rules={{required: true}}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            label="Tourist Name"
                            variant={"outlined"}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.tourist_name && <Text style={{color: 'red'}}>Email is required.</Text>}
            </Flex>
            <Flex>
                <Controller
                    name={"tourist_email"}
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
                {errors.tourist_email && <Text style={{color: 'red'}}>Email is required.</Text>}
            </Flex>
            <Flex>
                <Controller
                    name={"tourist_location"}
                    control={control}
                    rules={{required: true}}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            label="Tourist Location"
                            variant={"outlined"}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.tourist_location && <Text style={{color: 'red'}}>Email is required.</Text>}
            </Flex>

            <Flex direction={"row"} justify={"between"}>
                <Button
                    title="Add"
                    style={{width: '45%'}}
                    loading={isLoading}
                    onPress={onSubmit}
                />
                <Button
                    title="Cancel"
                    variant={"outlined"}
                    color={"error"}
                    style={{width: '45%'}}
                    onPress={() => {
                        navigation.goBack()
                    }}
                />
            </Flex>


        </Flex>
    );
};

export default TouristAdd;
