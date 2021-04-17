import * as React from 'react';
import {ScrollView, StyleSheet} from 'react-native';

const AccountScreen: React.ComponentType = () => {
  return <ScrollView style={styles.container}></ScrollView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AccountScreen;
