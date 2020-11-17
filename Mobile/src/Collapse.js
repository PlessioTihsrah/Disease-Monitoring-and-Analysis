import React from 'react';
import {Card, CardItem, Text, Button, Content} from 'native-base';
const Collapse = (props) => {
  return (
    <Card>
      <CardItem>
        <Button transparent onPress={props.toggle}>
          <Text>{props.title}</Text>
        </Button>
      </CardItem>

      {!props.hide && <Content>{props.children}</Content>}
    </Card>
  );
};

export default Collapse;
