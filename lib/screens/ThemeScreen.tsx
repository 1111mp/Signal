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

type ThemeType = ThemeNameType;

const themes: ThemeType[] = ['system', 'light', 'dark'];

const ThemeScreen: React.ComponentType<
  StackScreenProps<StackParamList>
> = observer(({navigation}) => {
  const {getMessage, userStore} = useAppStoresContext();

  const checkHandler = (theme: ThemeNameType) => {
    userStore.setTheme(theme);
  };

  return (
    <ScrollView>
      {themes.map((theme: ThemeType, index: number) => (
        <ListItem
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
            <ListItemTitle>{getMessage(theme)}</ListItemTitle>
          </ListItemContent>
          <ListItemCheckBox
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
