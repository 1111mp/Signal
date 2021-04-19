import * as React from 'react';
import {StyleSheet} from 'react-native';
import ScrollView from '@/components/ScrollView';
import {ListItem} from 'react-native-elements';
import {ThemeNameType, useAuthContext} from '@/AuthContext';
import {View} from 'react-native';

type ThemeType = ThemeNameType;

const themes: ThemeType[] = ['system', 'light', 'dark'];

const ThemeScreen: React.ComponentType = () => {
  const {themeName, setThemeHandler, getMessage} = useAuthContext();

  const checkHandler = (theme: ThemeNameType) => {
    setThemeHandler(theme);
  };

  return (
    <ScrollView>
      {themes.map((theme: ThemeType, index: number) => (
        <ListItem
          key={theme}
          bottomDivider
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
          <ListItem.Content>
            <ListItem.Title>{getMessage(theme)}</ListItem.Title>
          </ListItem.Content>
          <ListItem.CheckBox
            Component={View}
            activeOpacity={1}
            uncheckedColor="transparent"
            uncheckedIcon="check"
            checkedIcon="check"
            checkedColor="#3b3b3b"
            iconType="entypo"
            checked={themeName === theme}
          />
        </ListItem>
      ))}
      {/* <ListItem
        bottomDivider
        style={{
          marginTop: 16,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          overflow: 'hidden',
        }}
        onPress={() => setChecked('system')}>
        <ListItem.Content>
          <ListItem.Title>系统</ListItem.Title>
        </ListItem.Content>
        <ListItem.CheckBox
          Component={View}
          activeOpacity={1}
          uncheckedColor="transparent"
          uncheckedIcon="check"
          checkedIcon="check"
          checkedColor="#3b3b3b"
          iconType="entypo"
          checked={checked === 'system'}
        />
      </ListItem>
      <ListItem bottomDivider onPress={() => setChecked('light')}>
        <ListItem.Content>
          <ListItem.Title>亮色</ListItem.Title>
        </ListItem.Content>
        <ListItem.CheckBox
          Component={View}
          activeOpacity={1}
          uncheckedColor="transparent"
          uncheckedIcon="check"
          checkedIcon="check"
          checkedColor="#3b3b3b"
          iconType="entypo"
          checked={checked === 'light'}
        />
      </ListItem>
      <ListItem
        bottomDivider
        style={{
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          overflow: 'hidden',
        }}
        onPress={() => setChecked('dark')}>
        <ListItem.Content>
          <ListItem.Title>暗色</ListItem.Title>
        </ListItem.Content>
        <ListItem.CheckBox
          Component={View}
          activeOpacity={1}
          uncheckedColor="transparent"
          uncheckedIcon="check"
          checkedIcon="check"
          checkedColor="#3b3b3b"
          iconType="entypo"
          checked={checked === 'dark'}
        />
      </ListItem> */}
    </ScrollView>
  );
};

export default ThemeScreen;
