import React from 'react';
import {Text, Content, Button} from 'native-base';
import MultiSelect from 'react-native-multiple-select';
import {connect} from 'react-redux';
import createInstance from '../store/actions/axios';

class DiseasePrediction extends React.PureComponent {
  state = {symptoms: []};
  formatSymptom = (symptom) => {
    return symptom
      .split('_')
      .map((r) => r[0].toUpperCase() + r.slice(1))
      .join(' ');
  };
  getItems = () => {
    return this.props.symptoms.map((symptom) => {
      return {
        id: symptom,
        name: this.formatSymptom(symptom),
      };
    });
  };
  onSelectedItemsChange = (symptoms) => {
    this.setState({symptoms});
  };
  predictDisease = async () => {
    const axios = createInstance(this.props.token);
    try {
      const res = await axios.get('/predict', {
        params: {
          symptoms: this.state.symptoms.join(','),
        },
      });
      const data = res.data;
      if (data.success) {
        alert('Predicted Disease: ' + data.disease);
      } else {
        alert('Error: ' + data.message || 'Something went wrong');
      }
    } catch (e) {
      alert('Error: ' + e.message || 'Something went wrong');
    }
  };
  render() {
    const {symptoms} = this.state;
    const selectedSymptoms = this.state.symptoms.map((symptom) => (
      <Text>{this.formatSymptom(symptom)}</Text>
    ));
    return (
      <Content padder>
        <MultiSelect
          hideTags
          items={this.getItems()}
          uniqueKey="id"
          selectedItems={this.state.symptoms}
          selectText="Select Symptoms"
          searchInputPlaceholderText="Search Symptoms..."
          onSelectedItemsChange={this.onSelectedItemsChange}
          altFontFamily="ProximaNova-Light"
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{color: '#CCC'}}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
        />
        {!!symptoms.length && <Text>Selected Symptoms:</Text>}
        {selectedSymptoms}
        <Button
          block
          onPress={this.predictDisease}
          disabled={!symptoms.length}
          style={{marginTop: 10}}>
          <Text>Predict</Text>
        </Button>
      </Content>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    symptoms: state.predictorData.symptoms,
    token: state.auth.token,
  };
};
export default connect(mapStateToProps)(DiseasePrediction);
