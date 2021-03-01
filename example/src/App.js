/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';
import { View } from 'react-native';
import { Dimensions } from 'react-native';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native';

import { StyleSheet } from 'react-native';
import ImageGrid from '@baronha/react-native-image-grid';
import ImagePicker from '@baronha/react-native-multiple-image-picker';

const { width } = Dimensions.get('window');

export default function App() {
  const [images, setImages] = useState([]);
  const onPressImage = (item, index) => {
    console.log(item, index);
  };

  const openPicker = async () => {
    try {
      const response = await ImagePicker.openPicker({
        selectedAssets: images,
        isExportThumbnail: true,
      });
      console.log(response);
      setImages(response);
    } catch (e) {}
  };

  const onDeleteImage = (item, index) => {};

  return (
    <View style={style.container}>
      <ScrollView contentContainerStyle={{ paddingTop: 132 }}>
        <View style={{ alignItems: 'center' }}>
          <ImageGrid
            dataImage={dataImageObject}
            onPressImage={onPressImage}
            widthKey={'Width'}
            heightKey={'Height'}
            // spaceSize={10}
            width={Dimensions.get('window').width - 6}
            showDelete
            onDeleteImage={onDeleteImage}
          />
          <ImageGrid
            dataImage={images}
            onPressImage={onPressImage}
            // spaceSize={10}
            containerStyle={{ marginTop: 3 }}
            width={Dimensions.get('window').width - 6}
            sourceKey={'path'}
            videoKey={'type'}
            conditionCheckVideo={'video'}
            videoURLKey={'thumbnail'}
          />
          <TouchableOpacity style={style.buttonOpen} onPress={openPicker}>
            <Text style={style.textOpen}>Open Gallery</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={style.header}>
        <StatusBar barStyle={'light-content'} backgroundColor={'#000'} />
        <SafeAreaView />
        <Text style={style.title}>IMAGE GRID</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
  title: {
    fontWeight: '900',
    fontSize: 24,
    paddingVertical: 24,
    fontFamily: 'Avenir',
    color: '#cdac81',
    textAlign: 'center',
  },
  buttonOpen: {
    margin: 24,
    backgroundColor: '#fff',
    padding: 12,
    alignItems: 'center',
    width: width - 48,
  },
  textOpen: {
    fontWeight: 'bold',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
});

const dataImageString = [
  'https://images.unsplash.com/photo-1532673492-1b3cdb05d51b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8cmV0cm98ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1509281373149-e957c6296406?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cmV0cm98ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1613904985222-0d534430bdbd?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyODd8fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1613824320065-3d07b66b8d32?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyODJ8fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1613766259482-10e3c6682e5d?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0MjN8fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1613987549117-13c4781b32d3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  'https://images.unsplash.com/photo-1613858749327-c09380ae8116?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMDR8fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
];

const dataImageObject = [
  {
    url:
      'https://images.unsplash.com/photo-1613922979078-70e49e3f0e72?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80',
    Width: 500,
    Height: 400,
    isVideo: true,
  },
  {
    url:
      'https://images.unsplash.com/photo-1595787143151-e601da948ea8?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80',
    Width: 500,
    Height: 400,
    isVideo: true,
  },
  {
    url:
      'https://images.unsplash.com/photo-1613937696708-9c44f6f08cbf?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMzZ8fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    Width: 500,
    Height: 400,
  },
  {
    url:
      'https://images.unsplash.com/photo-1613856933118-d82245801b41?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMjZ8fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    width: 500,
    height: 400,
  },
  {
    url:
      'https://images.unsplash.com/photo-1613938862928-38748a9283de?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMTN8fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    width: 500,
    height: 400,
  },
  {
    url:
      'https://images.unsplash.com/photo-1613858749327-c09380ae8116?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMDR8fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    width: 500,
    height: 400,
    isVideo: true,
  },
];
