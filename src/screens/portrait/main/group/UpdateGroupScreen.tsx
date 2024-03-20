import React, {useEffect, useState} from 'react';
import {Button, FlatList, Text, TextInput, View} from 'react-native';
import {DataContextResult, Group, STATUS, useDataContext} from '@src/business';

export const UpdateGroupScreen = () => {
    const [name, setName] = useState('');
    const [status, setStatus] = useState<STATUS>(STATUS.ACTIVE);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const {groups}: DataContextResult = useDataContext();
    useEffect(() => {
    }, []);


    const handleSaveBrand = () => {
        // if (selectedBrand) {
        //   // Update existing brand
        //   const updatedBrands = brands.map(brand =>
        //     brand.id === selectedBrand.id ? {...brand, name, status} : brand,
        //   );
        //   setBrands(updatedBrands);
        //   setSelectedBrand(null);
        // } else {
        //   // Create new brand
        //   const newBrand: Brand = {id: AppUtility.nowInMili(), name, status};
        //   setBrands([...brands, newBrand]);
        // }
        // setSelectedBrand(null);
        // setName('');
        // setStatus(STATUS.ACTIVE);
    };

    // Function to handle brand editing
    const handleEditBrand = brand => {
        setName(brand.name);
        setStatus(brand.status);
        setSelectedGroup(brand);
    };

    // Function to handle brand deletion
    const handleDeleteBrand = brand => {
        // const updatedBrands = brands.filter(b => b.id !== brand.id);
        // setBrands(updatedBrands);
    };

    return (
        <View style={{flex: 1}}>
            {/* Group form */}
            <View>
                <TextInput
                    placeholder="Group name"
                    value={name}
                    onChangeText={text => setName(text)}
                />
                <TextInput
                    placeholder="Status (1: active, 2: inactive)"
                    value={status.toString()}
                    onChangeText={text => setStatus(parseInt(text))}
                />
                <Button
                    title={selectedGroup ? 'Update' : 'Create'}
                    onPress={handleSaveBrand}
                />
            </View>

            {/* Group list */}
            <FlatList
                data={groups}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text>{item.name}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Button title="Edit" onPress={() => handleEditBrand(item)} />
                            <Button title="Delete" onPress={() => handleDeleteBrand(item)} />
                        </View>
                    </View>
                )}
            />
        </View>
    );
};
