import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Flex, Box, Text, Icon } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';
import Property from '../components/Property';
import SearchFilters from '../components/SearchFilters';
import noresult from '../assets/images/noresult.svg';
import { fetchApi, baseUrl } from '../utils/fetchApi';

const Search = ({ properties}) => {
    const [searchFilters, setSearchFilters ] = useState(false);
    const router = useRouter();

    return (
        <Box>
            <Flex 
                cursor="pointer"
                bg="grey.100"
                borderBottom="1px"
                borderColor="grey.200"
                p="2"
                fontWeight="black"
                fontSize="lg"
                justifyContent="center"
                alignItems="center"
                onClick={() => setSearchFilters(!searchFilters)}
            >
                <Text>Search Property By Filters</Text>
                <Icon paddingLeft="2" width="7" as={BsFilter} />
            </Flex>
            { searchFilters && <SearchFilters /> }
            <Text fontSize="2xl" p="4" fontWeight="bold">
                {/* ⬇router contains the URL so this line of code to changes the URl and the page content */}
                Properties {router.query.purpose} 
            </Text>
            <Flex flexWrap="wrap">
                {/* ⬇ looping over all properties*/}
                {properties.map((property)=> <Property property={property} key={property.id}/>)}
            </Flex>
            {properties.length === 0 && (
                <Flex justifyContent="center" alignItems="center" flexDirection="column" marginTop="5px" marginBottom="5px">
                    <Image alt="no result" src={noresult} />    
                    <Text fontSize="2xl" marginTop="3">No Results Found</Text>
                </Flex>            
            )}
        </Box>
    )
}

/* This is going to allow us to ⬇ get the query and to dynamically change the data once the user changes the filters*/
export async function getServerSideProps({ query }) {
    const purpose = query.purpose || 'for-rent';{/* setting for-rent as default */}
    const rentFrequency = query.rentFrequency || 'yearly';
    const minPrice = query.minPrice || '0';
    const maxPrice = query.maxPrice || '1000000';
    const roomsMin = query.roomsMin || '0';
    const bathsMin = query.bathsMin || '0';
    const sort = query.sort || 'price-desc';
    const areaMax = query.areaMax || '35000';
    const locationExternalIDs = query.locationExternalIDs || '5002';
    const categoryExternalID = query.categoryExternalID || '4';
    
    // {/* ⬇ Passin the properties through the query API request*/}
    const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);
    

    return {
      props: {
        properties: data?.hits
      }
    }
}

export default Search;