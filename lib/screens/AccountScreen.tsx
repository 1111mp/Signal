import * as React from 'react';
import {StyleSheet} from 'react-native';
import ScrollView from '@/components/ScrollView';

const AccountScreen: React.ComponentType = () => {
  return <ScrollView style={styles.container}></ScrollView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AccountScreen;
