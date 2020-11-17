import React from 'react';
import {Provider} from 'react-redux';
import {Container} from 'native-base';
import storeCreator from './store';
import Screen from './Screen';
import {PersistGate} from 'redux-persist/integration/react';
import {Spinner} from 'native-base';

const App = (props) => {
  const {store, persistor} = storeCreator();
  return (
    <Provider store={store}>
      <PersistGate
        loading={<Spinner color="blue" style={{marginTop: 50}} />}
        persistor={persistor}>
        <Container>
          <Screen></Screen>
        </Container>
      </PersistGate>
    </Provider>
  );
};

export default App;
