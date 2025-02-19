import { Appbar } from 'react-native-paper';
import React from 'react';
import { getHeaderTitle } from '@react-navigation/elements';

export default function MainAppbar(props) {
  const title = getHeaderTitle(props.options, props.route.name);

  return (
    <Appbar.Header style={{ backgroundColor: props.backgroundColor }}>
      {props.back ? (
        <Appbar.BackAction onPress={() => props.navigation.goBack()} />
      ) : null}

      <Appbar.Content title={title} />
      
      {/* Removed location action button */}
      
      {props.back ? null : (
        <Appbar.Action
          icon="cog"
          onPress={() => props.navigation.navigate('Settings')}
        />
      )}
    </Appbar.Header>
  );
}
