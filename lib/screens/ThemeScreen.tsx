import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react';
import ScrollView from '@/components/ScrollView';
import {StackScreenProps} from '@react-navigation/stack';
// import {ListItem} from 'react-native-elements';
import {
  ListItem,
  ListItemContent,
  ListItemTitle,
  ListItemCheckBox,
} from '@/components/List';
import {useAppStoresContext} from '@/stores';
import {useHeaderLeft} from '@/hooks';

type ThemeType = ThemeNameType;

const themes: ThemeType[] = ['system', 'light', 'dark'];

const ThemeScreen: React.ComponentType<
  StackScreenProps<StackParamList>
> = observer(({navigation}) => {
  const {getMessage, userStore} = useAppStoresContext();

  useHeaderLeft({
    navigation,
    title: '主题',
    themeData: userStore.themeData,
  });

  const checkHandler = (theme: ThemeNameType) => {
    userStore.setTheme(theme);
  };

  return (
    <ScrollView>
      {themes.map((theme: ThemeType, index: number) => (
        <ListItem
          themeData={userStore.themeData}
          key={theme}
          bottomDivider={index === themes.length - 1 ? false : true}
          style={StyleSheet.flatten([
            index === 0 && {
              marginTop: 16,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              overflow: 'hidden',
            },
            index === themes.length - 1 && {
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              overflow: 'hidden',
            },
          ])}
          onPress={() => checkHandler(theme)}>
          <ListItemContent>
            <ListItemTitle themeData={userStore.themeData}>
              {getMessage(theme)}
            </ListItemTitle>
          </ListItemContent>
          <ListItemCheckBox
            themeData={userStore.themeData}
            Component={View}
            activeOpacity={1}
            uncheckedColor="transparent"
            uncheckedIcon="check"
            checkedIcon="check"
            iconType="entypo"
            checked={userStore.theme === theme}
          />
        </ListItem>
      ))}
    </ScrollView>
  );
});

export default ThemeScreen;
