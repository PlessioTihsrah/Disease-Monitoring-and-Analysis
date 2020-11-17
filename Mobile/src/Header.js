import React from 'react';
import {Header, Body, Title, Left, Right, Button, Text} from 'native-base';
import {connect} from 'react-redux';
import {logout} from './store/actions/AuthActions';

const AppHeader = ({title, logout}) => {
  return (
    <Header>
      <Body style={{marginLeft: 10}}>
        <Title>{title}</Title>
      </Body>
      <Right>
        <Button transparent onPress={logout}>
          <Text>Logout</Text>
        </Button>
      </Right>
    </Header>
  );
};

export default connect(null, {logout})(AppHeader);
