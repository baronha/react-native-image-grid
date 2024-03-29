/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Platform, Text } from 'react-native';
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
        maxVideo: 1,
      });
      console.log(response);
      setImages(response);
    } catch (e) {}
  };

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
            ratioImagePortrait={1.2}
            ratioImageLandscape={1.618}
            prefixPath={Platform.OS === 'android' ? 'file://' : ''}
            backgroundColorKey={'domainColor'}
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
      'https://images.unsplash.com/photo-1622021211530-7d31fd86862d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
    Width: 500,
    Height: 800,
    domainColor: '#e48257',
  },
  {
    url:
      'https://images.unsplash.com/photo-1613766259482-10e3c6682e5d?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0MjN8fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    Width: 500,
    Height: 800,
    domainColor: '#393232',
  },
  {
    url:
      'https://images.unsplash.com/photo-1621570169694-4867389dcc66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1650&q=80',
    Width: 500,
    Height: 800,
    domainColor: '#393232',
  },
  {
    url:
      'https://images.unsplash.com/photo-1622134093410-ba321c0a6955?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
    Width: 500,
    Height: 800,
    domainColor: '#393232',
  },
  {
    url:
      'https://images.unsplash.com/photo-1622024276239-cbefd614cf5b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
    Width: 500,
    Height: 800,
    domainColor: '#393232',
  },
  {
    url:
      'https://images.unsplash.com/photo-1622085354806-80fcdcd4ef4a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1700&q=80',
    Width: 500,
    Height: 800,
    domainColor: '#393232',
  },
];
