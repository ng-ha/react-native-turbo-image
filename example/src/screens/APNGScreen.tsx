import React from 'react';
import { apngData } from '../data';
import Card from '../components/Card';
import { FlatList } from 'react-native';

const APNGScreen = () => {
  return (
    <FlatList
      data={apngData}
      renderItem={({ item }) => (
        <Card
          title={item.title}
          size={300}
          source={{ uri: item.url }}
          indicator={{ style: 'large' }}
          format="apng"
          cachePolicy="dataCache"
        />
      )}
      keyExtractor={(item, index) => item.url + index}
    />
  );
};

export default APNGScreen;
