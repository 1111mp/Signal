import * as React from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import ScrollView from '@/components/ScrollView';

const AccountScreen: React.ComponentType = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.container}></ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AccountScreen;
