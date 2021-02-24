import * as React from 'react';
import { Text } from 'react-native';
import { Dimensions } from 'react-native';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native';

import { StyleSheet, View } from 'react-native';
import ImageGrid from 'react-native-image-grid';

export default function App() {
  const onPressImage = (item, index) => {
    console.log(item);
  };

  return (
    <SafeAreaView style={style.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#000'} />
      <Text style={style.title}>IMAGE GRID</Text>
      <ImageGrid
        data={dataImageString}
        onPressImage={onPressImage}
        // spaceSize={10}
        // width={Dimensions.get('window').width - 100}
      />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontWeight: '900',
    fontSize: 24,
    paddingVertical: 24,
    fontFamily: 'Avenir',
    color: '#cdac81',
  },
});

const dataImageString = [
  'https://images.unsplash.com/photo-1614046058536-2f0ded689015?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3N3x8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1595787143151-e601da948ea8?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80',
  'https://images.unsplash.com/photo-1614044465875-5af5c50288ed?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
  'https://images.unsplash.com/photo-1613946268361-6a0c37276dc1?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNjh8fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1613989999658-0075d1359836?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNjZ8fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1613987549117-13c4781b32d3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
];

const dataImageObject = [
  {
    url:
      'https://images.unsplash.com/photo-1613922979078-70e49e3f0e72?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80',
  },
];
