import React from 'react';
import {FlatList} from 'react-native';
import {Avatar, Button, Flex, ListItem} from "@react-native-material/core";
import {useInfiniteQuery} from "@tanstack/react-query";
import {datacakraAxios} from "../../../utils/AxiosInstance";

interface Tourist {
    $id: string;
    createdat: string;
    id: string;
    tourist_email: string;
    tourist_location: string;
    tourist_name: string;
    tourist_profilepicture: string;
}

interface TouristListResponse {
    data: Tourist[];
    page: string;
    per_page: number;
    total_pages: number;
    totalrecord: number;
}

const Tourists = () => {

    const {data, fetchNextPage, hasNextPage, isFetching} = useInfiniteQuery<TouristListResponse>({
        queryKey: ['listtourist'],
        queryFn: async ({pageParam = 1}) => {
            const result = await datacakraAxios.get<TouristListResponse>(`/Tourist?page=${pageParam}`);
            return result?.data;
        },
        getNextPageParam: (lastPage) => {
            const currentPage = parseInt(lastPage.page);
            if (currentPage < lastPage.total_pages) {
                return currentPage + 1;
            }
            return undefined;
        }
    })

    const loadMore = async () => {
        await fetchNextPage();
    };

    const renderItem = ({item}: { item: Tourist }) => (
        <ListItem
            leadingMode="avatar"
            leading={
                <Avatar image={{uri: item.tourist_profilepicture}}/>
            }
            title={item.tourist_name}
            secondaryText={item.tourist_location}
        />
    );

    return (
        <Flex fill>
            <FlatList
                data={data?.pages.flatMap((page) => page.data) || []}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                ListFooterComponent={
                    hasNextPage ? (
                        <Button title="Load More" onPress={loadMore} disabled={isFetching}/>
                    ) : null
                }
            />
        </Flex>
    );
};

export default Tourists;
