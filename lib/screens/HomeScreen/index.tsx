import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  GestureResponderEvent,
} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {observer} from 'mobx-react';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {Icon} from '@/components/List';
import {Avatar, SearchBar} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import {useTargetStore} from '@/stores';
import SwipeableRow, {SwipeableHandle} from './SwipeableRow';
import Row from './Row';

const {width} = Dimensions.get('screen');
console.log(width);

const DATA = [
  {
    from: "D'Artagnan",
    when: '3:11 PM',
    message:
      'Unus pro omnibus, omnes pro uno. Nunc scelerisque, massa non lacinia porta, quam odio dapibus enim, nec tincidunt dolor leo non neque',
  },
  {
    from: 'Aramis',
    when: '11:46 AM',
    message:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus hendrerit ligula dignissim maximus aliquet. Integer tincidunt, tortor at finibus molestie, ex tellus laoreet libero, lobortis consectetur nisl diam viverra justo.',
  },
];

const HomeScreen: React.ComponentType<StackScreenProps<StackParamList>> =
  observer(({navigation}) => {
    const [search, setSearch] = React.useState<string>('');

    const swipeableRef = React.useRef<Swipeable>();
    const isFocused = useIsFocused();
    const [allow, setAllow] = React.useState<boolean>(true);
    const {themeData, appTheme} = useTargetStore('userStore')!;

    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerStyle: {
          backgroundColor: 'red',
        },
        headerLeft: () => (
          <Avatar
            rounded
            containerStyle={{marginLeft: 14}}
            source={{
              uri: 'http://b.hiphotos.baidu.com/image/pic/item/359b033b5bb5c9ea5c0e3c23d139b6003bf3b374.jpg',
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

    const renderheader = () => {
      return (
        <SearchBar
          placeholder="Type Here..."
          platform="ios"
          containerStyle={{
            backgroundColor: 'transparent',
            paddingHorizontal: 4,
          }}
          inputContainerStyle={{
            height: 42,
            backgroundColor: themeData.input_bg_color,
          }}
          // onChangeText={this.updateSearch}
          value={search}
        />
      );
    };

    const onWillOpenHandle: SwipeableHandle = ref => {
      if (swipeableRef) swipeableRef.current?.close();
      swipeableRef.current = ref.current;
    };

    const swipeableCloseHandle: SwipeableHandle = ref => {
      if (swipeableRef.current == ref.current) swipeableRef.current = undefined;
    };

    const touchStartHandler = (event: GestureResponderEvent) => {
      if (swipeableRef) swipeableRef.current?.close();
    };

    return (
      <>
        <StatusBar
          barStyle={appTheme === 'dark' ? 'light-content' : 'dark-content'}
        />
        <FlatList
          data={DATA}
          style={{
            flex: 1,
            backgroundColor:
              allow && !isFocused
                ? themeData.container_home_blur
                : themeData.container_home,
          }}
          onTouchStart={touchStartHandler}
          ListHeaderComponent={renderheader}
          // ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({item, index}) => (
            <SwipeableRow
              onWillOpenHandle={onWillOpenHandle}
              swipeableCloseHandle={swipeableCloseHandle}>
              <Row item={item} navigation={navigation} />
            </SwipeableRow>
          )}
          keyExtractor={(item, index) => `message ${index}`}
        />
      </>
    );
  });

const styles = StyleSheet.create({
  rightContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 14,
  },
  separator: {
    backgroundColor: 'rgb(200, 199, 204)',
    height: StyleSheet.hairlineWidth,
  },
  row: {
    width,
    height: 100,
    justifyContent: 'center',
    padding: 20,
    borderBottomWidth: 3,
    borderBottomColor: 'black',
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  rowTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {width, height: 100, backgroundColor: 'grey'},
  contenContainer: {
    // paddingVertical: 10,
    // paddingHorizontal: 16,
    paddingBottom: 100,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  scrollList: {width, paddingTop: 0},
});

export default HomeScreen;
