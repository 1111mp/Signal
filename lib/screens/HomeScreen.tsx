import * as React from 'react';
import {
  ScrollView,
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {observer} from 'mobx-react';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {Icon} from '@/components/List';
import {Avatar} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import {useTargetStore} from '@/stores';

const HomeScreen: React.ComponentType<
  StackScreenProps<StackParamList>
> = observer(({navigation}) => {
  const isFocused = useIsFocused();
  const [allow, setAllow] = React.useState<boolean>(true);
  const {themeData, appTheme} = useTargetStore('userStore')!;

  React.useLayoutEffect(() => {
    navigation.setOptions({
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
            <Icon name="camera-outline" darkName="camera" type="ionicon" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6}>
            <Icon
              name="paper-plane-outline"
              darkName="paper-plane-sharp"
              type="ionicon"
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      setAllow(true);
    }, [setAllow]),
  );

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor:
          allow && !isFocused
            ? themeData.container_home_blur
            : themeData.container_home,
      }}>
      <StatusBar
        barStyle={appTheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <Text>Signed in!</Text>
      <Button
        title="Sign out"
        onPress={() => {
          setAllow(false);
          navigation.navigate('Test');
        }}
      />
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  rightContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 14,
  },
});

export default HomeScreen;
