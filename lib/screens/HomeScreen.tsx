import * as React from 'react';
import {
  ScrollView,
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {Avatar, Icon} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import {useAuthContext} from '@/AuthContext';

const HomeScreen: React.ComponentType<StackScreenProps<StackParamList>> = ({
  navigation,
}) => {
  const {signOut, theme} = useAuthContext()!;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        shadowColor: 'transparent', // ios
        elevation: 0, // android
        backgroundColor: theme.header_bg_home,
      },
      headerLeft: () => (
        <Avatar
          rounded
          containerStyle={{marginLeft: 14}}
          source={{
            uri:
              'http://b.hiphotos.baidu.com/image/pic/item/359b033b5bb5c9ea5c0e3c23d139b6003bf3b374.jpg',
          }}
          // @ts-ignore
          ImageComponent={FastImage}
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('ModalParent', {screen: 'Settings'});
          }}
        />
      ),
      headerRight: () => (
        <View style={styles.rightContainer}>
          <TouchableOpacity activeOpacity={0.6} style={{marginRight: 16}}>
            <Icon name="camera-outline" type="ionicon" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6}>
            <Icon name="paper-plane-outline" type="ionicon" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, theme]);

  console.log(theme.container_home);

  return (
    <ScrollView style={{flex: 1, backgroundColor: theme.container_home}}>
      <Text>Signed in!</Text>
      <Button title="Sign out" onPress={signOut} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rightContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 14,
  },
});

export default HomeScreen;
