import React, {useState} from 'react';

import {Text, View} from 'react-native';
import {useAuth} from "../../context/AuthContext";
import {Button} from "@react-native-material/core";
import {useQuery} from "@tanstack/react-query";
import {datacakraAxios} from "../../../utils/AxiosInstance";

const Biro = () => {
    const {authState, onLogout} = useAuth()
    const [page, setPage] = useState<number>(1)
    const {data: listBiro} = useQuery({
        keepPreviousData: true,
        queryKey:["listtourist", 1],
        queryFn: async () => {
            const result = await datacakraAxios.get(`/Tourist?page=${page}`)
            return result?.data
        },
        onSuccess:data => {
            console.log("🌍 data", data)
        }
    })
    return (
        <Text>
            Biro
        </Text>
    );
};

export default Biro;
