import React from 'react';
import {FlatList} from 'react-native';
import {Avatar, Button, Flex, ListItem, Text} from "@react-native-material/core";
import {useInfiniteQuery} from "@tanstack/react-query";
import {datacakraAxios} from "../../../utils/AxiosInstance";
import {Tourist, TouristListResponse} from "../../../utils/interface/NetworkResponseInterface";
import {TouristStackNavigationProp} from "../../../utils/interface/Navigation";


const Tourists: React.FC<TouristStackNavigationProp<'Tourist'>> = ({navigation}) => {

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

    const renderItem = ({item, index}: { item: Tourist; index: number }) => (
        <ListItem
            leadingMode="avatar"
            leading={
                <Avatar image={{uri: item.tourist_profilepicture}}/>
            }
            trailing={
                <Text>{index + 1}</Text>
            }
            title={item.tourist_name}
            secondaryText={item.tourist_location}
            onPress={() => navigation.navigate('TouristDetail', {id: item.id})}
        />
    );

    return (
        <Flex fill>
            <FlatList
                data={data?.pages.flatMap((page) => page.data) || []}
                renderItem={({item, index}) => renderItem({item, index})}
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
