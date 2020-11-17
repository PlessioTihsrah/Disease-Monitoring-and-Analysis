import React from 'react';

import {CardItem, Spinner, Text, Card, Button, Title} from 'native-base';
import createInstance from '../store/actions/axios';
import {Col, Grid} from 'react-native-easy-grid';

class ApprovePage extends React.PureComponent {
  state = {
    unapproved: [],
    loading: true,
  };
  getUnapproved = async () => {
    this.setState({loading: true});
    try {
      const data = (await this.axios.get(this.props.url)).data;
      if (data.success) {
        this.setState({unapproved: data.unapproved});
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
      const data = (await this.axios.post(this.props.url, {email})).data;
      if (data.success) {
        const unapproved = this.state.unapproved.filter(
          (u) => u.email != email,
        );
        alert('Success: ' + email + ' is approved');
        this.setState({unapproved});
      } else {
        throw new Error(data.message);
      }
    } catch (e) {
      alert('Error: ' + e.message || 'Something went wrong');
    } finally {
      this.setState({loading: false});
    }
  };

  reject = async (email) => {
    this.setState({loading: true});
    try {
      const data = (
        await this.axios.delete(this.props.url, {
          params: {email},
        })
      ).data;
      console.log(data);
      if (data.success) {
        const unapproved = this.state.unapproved.filter(
          (u) => u.email != email,
        );

        alert('Success: ' + email + ' is rejected');
        this.setState({unapproved});
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (e) {
      console.log(e);
      alert('Error: ' + e.message || 'Something went wrong');
    } finally {
      this.setState({loading: false});
    }
  };
  componentDidMount() {
    this.axios = createInstance(this.props.token);
    this.getUnapproved();
  }
  render() {
    const {unapproved, loading} = this.state;
    if (loading) {
      return <Spinner color="blue" />;
    }
    const unapprovedCards = unapproved.map((unn) => {
      const {email, hospital} = unn;
      return (
        <Card key={email}>
          <CardItem>
            <Text>Email: {email}</Text>
          </CardItem>
          {hospital && (
            <CardItem>
              <Text>Hospital: {hospital.name}</Text>
            </CardItem>
          )}
          <Grid>
            <Col style={{padding: 5}}>
              <Button block success small onPress={() => this.approve(email)}>
                <Text>Approve</Text>
              </Button>
            </Col>
            <Col style={{padding: 5}}>
              <Button block danger small onPress={() => this.reject(email)}>
                <Text>Reject</Text>
              </Button>
            </Col>
          </Grid>
        </Card>
      );
    });
    return (
      <>
        <Text style={{textAlign: 'center', marginTop: 5}}>
          Unapproved: {unapprovedCards.length}
        </Text>
        {unapprovedCards}
      </>
    );
  }
}

export default ApprovePage;
