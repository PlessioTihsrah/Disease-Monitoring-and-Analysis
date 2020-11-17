import React from 'react';
import {Text, Spinner, Icon, View, Accordion, H2, H3} from 'native-base';
import {connect} from 'react-redux';
import createInstance from '../store/actions/axios';
import AppointmentShow from '../AppointmentShow';
import Pagination from '../Pagination';
import AppointmentCard from '../AppointmentCard';
class Appointment extends React.PureComponent {
  state = {
    appointments: [],
    page: 1,
    totalPages: 0,
    loading: false,
  };
  getAppointments = async (page = 1) => {
    const axios = createInstance(this.props.token);
    const params = {page};
    this.setState({loading: true});
    if (this.props.closed) {
      params.closed = true;
    }
    try {
      const res = await axios.get('/appointments', {
        params,
      });
      const data = res.data;
      if (data.success) {
        const {appointments, page, totalPages} = data;
        this.setState({appointments, page, totalPages});
      } else {
        alert(data.message || 'Something went wrong');
      }
    } catch (e) {
      alert(e.message || 'Something went wrong');
    } finally {
      this.setState({loading: false});
    }
  };
  componentDidMount() {
    this.getAppointments();
  }
  changePage = (i) => {
    if (i >= 1 && i <= this.state.totalPages) {
      this.getAppointments(i);
    }
  };

  removeAppointment = (id) => {
    const appointments = this.state.appointments.filter(
      (appointment) => appointment.id != id,
    );
    this.setState({appointments});
  };

  render() {
    const {appointments, page, totalPages, loading} = this.state;
    if (!loading) {
      return (
        <>
          <H3 style={{textAlign: 'center'}}>
            Total Appointments: {appointments.length}
          </H3>
          <Pagination page={page} totalPages={totalPages}></Pagination>
          <AppointmentShow
            appointments={appointments}
            removeAppointment={this.removeAppointment}
          />
        </>
      );
    } else {
      return <Spinner color="blue" />;
    }
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};
export default connect(mapStateToProps)(Appointment);
