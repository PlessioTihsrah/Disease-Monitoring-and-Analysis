import React from 'react';
import {Text, Spinner, Content, Button} from 'native-base';
import createInstance from '../store/actions/axios';
import MultiSelect from 'react-native-multiple-select';

import {connect} from 'react-redux';

class ChangeSkills extends React.PureComponent {
  state = {
    loading: true,
    skills: [],
  };
  fetchSkills = async () => {
    const axios = createInstance(this.props.token);
    this.setState({loading: true});
    try {
      const res = await axios.get('/skills');
      const data = res.data;
      if (data.success) {
        this.setState({skills: data.skills});
      } else {
        throw new Error(data.message);
      }
    } catch (e) {
      console.log(e);
      alert('Error: ' + e.message || 'Something went wrong');
    } finally {
      this.setState({loading: false});
    }
  };
  componentDidMount() {
    this.fetchSkills();
  }
  onSelectedItemsChange = (skills) => {
    this.setState({skills});
  };
  setSkills = async () => {
    this.setState({loading: true});
    const axios = createInstance(this.props.token);
    try {
      const res = await axios.post('/skills', {
        skills: this.state.skills.join(','),
      });
      const data = res.data;
      if (data.success) {
        alert('Skills saved successfully');
      } else {
        throw new Error(data.message);
      }
    } catch (e) {
      alert('Error: ' + e.message || 'Something went wrong');
    } finally {
      this.setState({loading: false});
    }
  };
  render() {
    const {loading, skills} = this.state;
    if (loading) {
      return <Spinner color="blue" />;
    }
    const items = this.props.diseases.map((disease) => ({
      id: disease,
      name: disease,
    }));
    return (
      <Content padder>
        <MultiSelect
          hideTags
          items={items}
          uniqueKey="id"
          ref={(component) => {
            this.multiSelect = component;
          }}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={skills}
          selectText="Pick Items"
          searchInputPlaceholderText="Search Items..."
          onChangeInput={(text) => console.log(text)}
          altFontFamily="ProximaNova-Light"
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{color: '#CCC'}}
          submitButtonColor="green"
          submitButtonText="Close"
        />
        <Text>Skills (Can Treat) : {skills.join(', ')}</Text>
        <Button
          block
          style={{margin: 5, marginTop: 20}}
          onPress={this.setSkills}>
          <Text>Save</Text>
        </Button>
      </Content>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    diseases: state.predictorData.disease,
  };
};
export default connect(mapStateToProps)(ChangeSkills);
