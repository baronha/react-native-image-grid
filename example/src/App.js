import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import ImageGrid from 'react-native-image-grid';

export default function App() {
  return (
    <View style={styles.container}>
      <ImageGrid data={dataImageString} width={375} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

const dataImageString = [
  'https://images.unsplash.com/photo-1614038276039-667c23bc32fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=989&q=80',
  'https://images.unsplash.com/photo-1595787143151-e601da948ea8?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80',
];

const dataImageObject = [
  {
    url:
      'https://images.unsplash.com/photo-1613922979078-70e49e3f0e72?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80',
  },
];
