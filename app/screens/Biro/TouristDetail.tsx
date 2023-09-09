import React, {useLayoutEffect, useState} from 'react';
import {TouristStackNavigationProp} from "../../../utils/interface/Navigation";
import {useMutation, useQuery} from "@tanstack/react-query";
import {datacakraAxios} from "../../../utils/AxiosInstance";
import {Tourist} from "../../../utils/interface/NetworkResponseInterface";
import {Avatar, Button, Flex, Text, TextInput} from "@react-native-material/core";
import {Controller, useForm} from "react-hook-form";


const TouristDetail: React.FC<TouristStackNavigationProp<'TouristDetail'>> = ({navigation, route}) => {
    const touristId = route.params.id
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const {control, handleSubmit, formState: {errors}, setValue, setFocus, reset} = useForm<TouristForm>();

    const {data: touristDetail, refetch} = useQuery({
        queryKey: ["tourist", touristId],
        queryFn: async () => {
            const result = await datacakraAxios.get<Tourist>(`/Tourist/${touristId}`);
            return result?.data;
        },
        onSuccess: data => {
            setValue('tourist_name', data.tourist_name)
            setValue('tourist_email', data.tourist_email)
            setValue('tourist_location', data.tourist_location)
        }
    })

    const {mutateAsync, isLoading} = useMutation({
        mutationKey: ["edit", touristId],
        mutationFn: async (data: TouristForm) => {
            const result = await datacakraAxios.put<Tourist>(`/Tourist/${touristId}`, {
                tourist_name: data.tourist_name,
                tourist_location: data.tourist_location,
                tourist_email: data.tourist_email,
            });
            return result?.data;
        },
        onSuccess: async (data) => {
            await refetch()
        }
    })

    const onSubmit = handleSubmit(async data => {
        await mutateAsync(data)
        setIsEdit(false)
    })


    const {mutateAsync: deleteTourist, isLoading: loadingDelete} = useMutation({
        mutationKey: ["delete", touristId],
        mutationFn: async () => {
            const result = await datacakraAxios.delete<Tourist>(`/Tourist/${touristId}`);
            return result?.data;
        },
        onSuccess: async (data) => {
            navigation.goBack()
        }
    })

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: props => {
                return (
                    <Button
                        title={"Delete Tourist"}
                        color={"error"}
                        loading={loadingDelete}
                        onPress={() => deleteTourist()}
                    />
                )
            }
        });
    }, [navigation]);

    return (
        <Flex fill style={{margin: 16, gap: 18}}>
            <Flex center>
                <Avatar image={{uri: touristDetail?.tourist_profilepicture}} size={100}/>
            </Flex>
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
                            defaultValue={touristDetail?.tourist_name}
                            value={value}
                            editable={isEdit}
                            inputContainerStyle={{
                                backgroundColor: isEdit ? 'white' : '#f2f2f2'
                            }}
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
                            editable={isEdit}
                            inputContainerStyle={{
                                backgroundColor: isEdit ? 'white' : '#f2f2f2'
                            }}
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
                            editable={isEdit}
                            inputContainerStyle={{
                                backgroundColor: isEdit ? 'white' : '#f2f2f2'
                            }}
                        />
                    )}
                />
                {errors.tourist_location && <Text style={{color: 'red'}}>Email is required.</Text>}
            </Flex>

            {isEdit
                ? (
                    <Flex direction={"row"} justify={"between"}>
                        <Button
                            title="Save"
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
                                setIsEdit(false)
                                setValue('tourist_name', touristDetail?.tourist_name as string)
                                setValue('tourist_email', touristDetail?.tourist_email as string)
                                setValue('tourist_location', touristDetail?.tourist_location as string)
                            }}
                        />
                    </Flex>
                )
                : (
                    <Flex>
                        <Button
                            title="Edit"
                            onPress={() => {
                                setIsEdit(true)
                                setFocus('tourist_name')
                            }}
                        />
                    </Flex>
                )
            }
        </Flex>
    );
};

export default TouristDetail;
