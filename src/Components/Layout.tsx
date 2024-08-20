import React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';

export default function Layout({ children = <div/>}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.ViewContent}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ViewContent: {
    flexGrow: 1,
    paddingVertical: 5,
    paddingHorizontal: 16,
  },
});
