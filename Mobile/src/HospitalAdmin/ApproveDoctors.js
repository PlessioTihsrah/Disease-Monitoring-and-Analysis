import React from 'react';
import {Text, CardItem, Card, Body, Spinner, Button} from 'native-base';
import {connect} from 'react-redux';
import createInstance from '../store/actions/axios';
import {Grid, Col} from 'react-native-easy-grid';
class ApproveDoctors extends React.PureComponent {
  state = {
    loading: true,
    unapproved: [],
  };
  getUnapproved = async () => {
    this.setState({loading: true});
    try {
      const data = (await this.axios.get('/approve/doctors')).data;
      console.log(data);
      if (data.success) {
        this.setState({
          unapproved: data.unapproved,
        });
      } else {
        throw new Error(data.message);
      }
    } catch (e) {
      alert('Error: ' + e.message || 'Something went wrong');
    } finally {
      this.setState({loading: false});
    }
  };
  approve = async (email) => {
    this.setState({loading: true});
    try {
      const data = (await this.axios.post('/approve/doctors', {email})).data;
      if (data.success) {
        alert(email + ' is approved successfully');
      } else {
        throw new Error(data.message);
      }
    } catch (e) {
      alert('Error: ' + e.message || 'Something went wrong');
    } finally {
      this.getUnapproved();
    }
  };
  reject = async (email) => {
    this.setState({loading: true});
    try {
      const data = (
        await this.axios.delete('/approve/doctors', {
          params: {email},
        })
      ).data;
      if (data.success) {
        alert(email + ' is rejected successfully');
      } else {
        throw new Error(data.message);
      }
    } catch (e) {
      alert('Error: ' + e.message || 'Something went wrong');
    } finally {
      this.getUnapproved();
    }
  };
  componentDidMount() {
    this.axios = createInstance(this.props.token);
    this.getUnapproved();
  }

  render() {
    if (this.state.loading) {
      return <Spinner color="blue" />;
    }
    const UserCard = this.state.unapproved.map(({name, email, mobile}) => {
      return (
        <CardItem key={email}>
          <Body>
            <Text>Name: {name}</Text>
            <Text>Email: {email}</Text>
            <Text>Mobile: {mobile}</Text>
            <Grid>
              <Col style={{padding: 5}}>
                <Button success block small onPress={() => this.approve(email)}>
                  <Text>Approve</Text>
                </Button>
              </Col>
              <Col style={{padding: 5}}>
                <Button danger block small onPress={() => this.reject(email)}>
                  <Text>Reject</Text>
                </Button>
              </Col>
            </Grid>
          </Body>
        </CardItem>
      );
    });
    return (
      <Card>
        <CardItem header button onPress={this.getUnapproved}>
          <Text>Unapproved Doctors (Tap to Refresh)</Text>
        </CardItem>
        {UserCard}
      </Card>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};
export default connect(mapStateToProps)(ApproveDoctors);
