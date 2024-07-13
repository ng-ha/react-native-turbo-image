import React from 'react';
import { prefetchData } from '../data';
import Card from '../components/Card';
import { FlatList } from 'react-native';
import type { Format } from '../../../src/types';

const PrefetchScreen = () => {
  return (
    <FlatList
      data={prefetchData}
      renderItem={({ item }) => (
        <Card
          size={300}
          source={item}
          indicator={{ style: 'large' }}
          format={item.format as Format}
        />
      )}
      keyExtractor={(item) => item.uri}
    />
  );
};

export default PrefetchScreen;
