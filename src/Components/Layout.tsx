import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';

export default function Layout({ children = <div/>}) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollViewContent}>{children}</ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
});
