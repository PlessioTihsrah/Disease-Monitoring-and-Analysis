import React from 'react';
import {
  Text,
  Form,
  Item,
  Input,
  Label,
  Button,
  Content,
  Accordion,
  View,
  Icon,
  Picker,
  Spinner,
} from 'native-base';
import Collapse from '../Collapse';
import createInstance from '../store/actions/axios';
import {connect} from 'react-redux';
import HospitalCard from './HospitalCard';
import Pagination from '../Pagination';
class SearchHospital extends React.PureComponent {
  state = {
    page: 1,
    district: '',
    state: '',
    pincode: '',
    disease: '',
    hospitals: [],
    hide: false,
    totalPages: 0,
    loading: false,
  };
  _renderHeader(item, expanded) {
    return (
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          margin: 5,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{fontWeight: '600'}}> {item.name}</Text>
        {expanded ? (
          <Icon style={{fontSize: 18}} name="remove-circle" />
        ) : (
          <Icon style={{fontSize: 18}} name="add-circle" />
        )}
      </View>
    );
  }
  _renderContent = (item) => {
    return <HospitalCard data={item} token={this.props.token}></HospitalCard>;
  };
  getHospitals = async (page = 1) => {
    const {district, state, pincode, disease} = this.state;
    const axios = createInstance(this.props.token);
    const params = {district, page, state, disease};
    if (pincode && pincode.length === 6 && !isNaN(parseInt(pincode))) {
      params.pincode = pincode;
    }
    this.setState({loading: true});
    try {
      const res = await axios.get('/hospitals', {
        params,
      });
      const resData = res.data;
      if (resData.success) {
        const {page, totalPages, data} = resData;
        this.setState({page, totalPages, hospitals: data, hide: true});
      } else {
        alert(resData.message);
      }
    } catch (e) {
      alert('Error: ' + e.message || 'Something went wrong');
    } finally {
      this.setState({loading: false});
    }
  };
  toggle = () => {
    this.setState({hide: !this.state.hide});
  };
  changePage = (i) => {
    if (i >= 1 && i <= this.state.totalPages && i != this.state.page) {
      this.getHospitals(i);
    }
  };
  getForm = () => {
    const {district, state, pincode, hide, disease} = this.state;
    const pickerLabels = this.props.diseases.map((disease) => (
      <Picker.Item label={disease} value={disease} />
    ));
    pickerLabels.unshift(
      <Picker.Item label="Select Disease (Optional)" value="" />,
    );
    return (
      <Collapse
        title="Tap to Show/Hide Hospital Search"
        hide={hide}
        toggle={this.toggle}>
        <Form>
          <Item floatingLabel>
            <Label>District</Label>
            <Input
              value={district}
              onChangeText={(district) => this.setState({district})}
            />
          </Item>
          <Item floatingLabel>
            <Label>State</Label>
            <Input
              value={state}
              onChangeText={(state) => this.setState({state})}
            />
          </Item>
          <Item floatingLabel>
            <Label>Pincode</Label>
            <Input
              value={pincode}
              onChangeText={(pincode) => this.setState({pincode})}
            />
          </Item>
          <Item style={{margin: 5}}>
            <Label>Disease</Label>
            <Picker
              note
              mode="dropdown"
              selectedValue={disease}
              onValueChange={(disease) => {
                this.setState({disease});
              }}>
              {pickerLabels}
            </Picker>
          </Item>
          <Content style={{padding: 20}}>
            <Button
              block
              onPress={() => this.getHospitals(1)}
              disabled={!(state || pincode || district || disease)}>
              <Text>Search</Text>
            </Button>
          </Content>
        </Form>
      </Collapse>
    );
  };
  render() {
    const {hospitals, page, totalPages, loading} = this.state;
    if (loading) {
      return <Spinner color="blue" />;
    }
    return (
      <>
        {this.getForm()}
        {hospitals.length > 0 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            changePage={this.changePage}
          />
        )}
        <Accordion
          dataArray={this.state.hospitals}
          animation={true}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}></Accordion>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    diseases: state.predictorData.disease,
  };
};
export default connect(mapStateToProps)(SearchHospital);
