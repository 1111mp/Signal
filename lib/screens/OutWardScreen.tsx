import * as React from 'react';
import ScrollView from '@/components/ScrollView';
import {ListItem, Text} from 'react-native-elements';
import {StackScreenProps} from '@react-navigation/stack';
import {useAuthContext} from '@/AuthContext';

const OutWardScreen: React.ComponentType<StackScreenProps<StackParamList>> = ({
  navigation,
}) => {
  const {themeName, getMessage} = useAuthContext();

  return (
    <ScrollView>
      <ListItem
        bottomDivider
        style={{
          marginTop: 16,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          overflow: 'hidden',
        }}
        pad={6}
        onPress={() => navigation.navigate('Theme')}>
        <ListItem.Content>
          <ListItem.Title>主题</ListItem.Title>
        </ListItem.Content>
        <Text style={{color: '#999999'}}>{getMessage(themeName!)}</Text>
        <ListItem.Chevron />
      </ListItem>
      <ListItem
        style={{
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          overflow: 'hidden',
        }}>
        <ListItem.Content>
          <ListItem.Title>聊天墙纸</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </ScrollView>
  );
};

export default OutWardScreen;
