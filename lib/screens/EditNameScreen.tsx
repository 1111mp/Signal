import * as React from 'react';
import {ScrollView, Text, TouchableOpacity} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {ListItem, Input} from 'react-native-elements';

const EditNameScreen: React.ComponentType<
  StackScreenProps<RootStackParamList>
> = ({navigation}) => {
  const backHandler = () => {
    navigation.goBack();
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{marginLeft: 16}}
          activeOpacity={0.6}
          onPress={backHandler}>
          <Text style={{fontSize: 18}}>取消</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView style={{flex: 1}}>
      <ListItem>
        <ListItem.Content style={{backgroundColor: 'red'}}>
          <Input placeholder="姓（可选）" />
        </ListItem.Content>
      </ListItem>
    </ScrollView>
  );
};

export default EditNameScreen;
