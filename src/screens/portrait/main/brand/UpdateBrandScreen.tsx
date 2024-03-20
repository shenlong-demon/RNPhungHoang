import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, FlatList, Text} from 'react-native';
import {Brand, STATUS, useAuthFacade, useDataFacade} from '@src/business';
import {AppUtility} from '@src/business/common/app_utility';
import {DataFacade} from '@src/business/facade';
import {
  DataContextResult,
  useDataContext,
} from '@src/business';

export const UpdateBrandScreen = () => {
  // const [brands, setBrands] = useState<Brand[]>([]);
  const [name, setName] = useState('');
  const [status, setStatus] = useState<STATUS>(STATUS.ACTIVE);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  // const brandFacade = useDataFacade();
  const {brands}: DataContextResult = useDataContext();
  // Initialize brands data (you can replace this with your actual API call)
  useEffect(() => {
    // loadBrands();
  }, []);

  // const loadBrands = async (): Promise<void> => {
  //   const brs: Brand[] = await brandFacade.getBrands();
  //   setBrands(brs);
  // };

  // Function to handle brand creation and update
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
    setSelectedBrand(brand);
  };

  // Function to handle brand deletion
  const handleDeleteBrand = brand => {
    // const updatedBrands = brands.filter(b => b.id !== brand.id);
    // setBrands(updatedBrands);
  };

  return (
    <View style={{flex: 1}}>
      {/* Brand form */}
      <View>
        <TextInput
          placeholder="Brand name"
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          placeholder="Status (1: active, 2: inactive)"
          value={status.toString()}
          onChangeText={text => setStatus(parseInt(text))}
        />
        <Button
          title={selectedBrand ? 'Update' : 'Create'}
          onPress={handleSaveBrand}
        />
      </View>

      {/* Brand list */}
      <FlatList
        data={brands}
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
