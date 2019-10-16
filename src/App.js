import React from 'react';
import './App.scss';
import _ from "lodash";
import HouseTable from './HouseTable';
import { Menu, Dropdown, Icon, Button, Form, Input, Modal, message } from 'antd';
const client = require('./client');


const LOGIN = "Login";
const menuContent = [
  {
    name: 'Location',
    content: ["Central", "North", "East", "South"]
  },
  {
    name: 'Number of Guests',
    content: ["1 to 3 People", "4 to 6 People", "7 to 10 People", "Over 10 People"]
  },
  {
    name: "Price Range",
    content: ["$0-$49", "$50-$99", "$100-$299", "$300-$500", "Over $500"]
  }
]
class App extends React.Component {
  state = {
    visible: false,
    confirmLoading: false,
    currentForm: '',
    locationContent: menuContent[0].name,
    nopContent: menuContent[1].name,
    priceContent: menuContent[2].name,
    locationFilter: 0,
    nopFilter: 0,
    priceFilter: 0,
    table0: [],
    table1: [],
    filtered: false,
    user: localStorage.getItem('airbnb_user'),
    recommenderResult: []
  };

  menuRegion = (
    <Menu onClick={({ key }) => this.handleMenuClick(0, key)}>
      {
        _.map(menuContent[0].content, (menu, index) =>
          (<Menu.Item key={index}>{menu}</Menu.Item>))
      }
    </Menu>
  );

  menuNoP = (
    <Menu onClick={({ key }) => this.handleMenuClick(1, key)}>
      {
        _.map(menuContent[1].content, (menu, index) =>
          (<Menu.Item key={index}>{menu}</Menu.Item>))
      }
    </Menu>
  );

  menuPrice = (
    <Menu onClick={({ key }) => this.handleMenuClick(2, key)}>
      {
        _.map(menuContent[2].content, (menu, index) =>
          (<Menu.Item key={index}>{menu}</Menu.Item>))
      }
    </Menu>
  );

  handleMenuClick = (type, selection) => {
    if (type === 0) {
      this.setState({
        locationContent: menuContent[0].content[selection],
        locationFilter: selection
      });
    }
    else if (type === 1) {
      this.setState({
        nopContent: menuContent[1].content[selection],
        nopFilter: selection
      });
    }
    else {
      this.setState({
        priceContent: menuContent[2].content[selection],
        priceFilter: selection
      });
    }
  }

  getFixedData = () => {
    let self = this
    client.get('/hotlist').then(function (response) {
      self.setState({
        table0: response.data
      })
    }).catch(function (error) {
      console.log(error)
    })
    client.get('/latest_booking').then(function (response) {
      self.setState({
        table1: response.data
      })
    }).catch(function (error) {
      console.log(error)
    })
  }

  logout = () => {
    localStorage.removeItem('airbnb_user')
    this.setState({
      user: null
    })
  }

  showModal = (type) => {
    this.setState({
      visible: true,
      currentForm: type
    });
  };

  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });

  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  getRecommenderResult = (user) => {
    let self = this
    client.get('/recommender', {
      params:
      {
        user_id: user,
        recommender_way: "als"
      }
    })
      .then(function (response) {
        self.setState({
          recommenderResult: response.data
        })
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
        window.scrollTo(0, 0)
      });
  }

  handleSubmit = e => {
    e.preventDefault();
    let self = this
    this.props.form.validateFields((err, values) => {
      if (!err) {
        client.post('/login/', values).then(function (response) {
          if (response.data === "fail_user") {
            message.error("Invalid user")
          }
          if (response.data === "fail_password") {
            message.error("Wrong password")
          }
          if (response.data === "ok") {
            localStorage.setItem("airbnb_user", values.username)
            self.setState({
              visible: false,
              confirmLoading: false,
              user: values.username
            });
          }
        }).catch(function (error) {
          console.log(error)
        })
      }
    });
  };

  fetchData = () => {
    const { locationFilter, nopFilter, priceFilter } = this.state;
    if (locationFilter === 0 && nopFilter === 0 && priceFilter === 0)
      return;
    let self = this;
    client.post('/filter/', {
      filter1: (parseInt(locationFilter) + 1).toString(),
      filter2: (parseInt(nopFilter) + 1).toString(),
      filter3: (parseInt(priceFilter) + 1).toString()
    })
      .then(function (response) {
        self.setState({
          filtered: true,
          filteredTable: response.data
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getFixedData();
    if (localStorage.getItem("airbnb_user")) {
      this.getRecommenderResult(localStorage.getItem("airbnb_user"))
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.user !== this.state.user && this.state.user != null) {
        this.getRecommenderResult(this.state.user)
    }
}

  resetFilter() {
    this.getFixedData();
    if (localStorage.getItem("airbnb_user")) {
      this.getRecommenderResult(localStorage.getItem("airbnb_user"))
    }
    this.setState({
      locationContent: menuContent[0].name,
      nopContent: menuContent[1].name,
      priceContent: menuContent[2].name,
    })
  }

  render() {
    const { visible, confirmLoading, currentForm, locationContent, nopContent, priceContent,
      table0, table1, filtered, filteredTable, user, recommenderResult } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="App">
        <header className="App-header">
          <div className="button-wrapper">
            <div>
              <Modal
                title={currentForm}
                visible={visible}
                onOk={this.handleOk}
                footer={null}
                confirmLoading={confirmLoading}
                onCancel={this.handleCancel}>
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <Form.Item>
                    {getFieldDecorator('username', {
                      rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                      <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                      />,
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('password', {
                      rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                      <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                      />,
                    )}
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" style={{ width: "100%" }} htmlType="submit" className="login-form-button">
                      {currentForm}
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
            </div>
            {!user ? <Button
              type="link"
              id="App-link"
              onClick={() => this.showModal(LOGIN)}
            >
              Login
            </Button> :
              <div>
                <span>Hi {user}!</span>
                <Button
                  type="link"
                  id="App-link"
                  onClick={this.logout}
                >
                  Logout
              </Button>
              </div>
            }
          </div>
          <div className="filters">
            <div id="components-dropdown-demo-dropdown-button">
              <Dropdown overlay={this.menuRegion} placement="bottomRight">
                <Button>
                  {locationContent}&nbsp;<Icon type="environment" />
                </Button>
              </Dropdown>
              <Dropdown overlay={this.menuNoP} placement="bottomRight">
                <Button>{nopContent}&nbsp;<Icon type="user" />
                </Button>
              </Dropdown>
              <Dropdown overlay={this.menuPrice} placement="bottomRight">
                <Button>
                  {priceContent}<Icon type="dollar" />
                </Button>
              </Dropdown>
              <Button type="primary" icon="search" onClick={this.fetchData} style={{ backgroundColor: "#FF5A5E", borderColor: "#FF5A5E" }}>
                Search
              </Button>
              {/* <span onClick={this.resetFilter}>Reset</span> */}
            </div>
          </div>
        </header>
        <div className="content">
          {
            user && recommenderResult && recommenderResult.length > 0 && !filtered &&
            (
              <div>
                <h2>Inspired by Your Booking History</h2>
                <HouseTable houses={recommenderResult}></HouseTable>
              </div>
            )
          }
          {
            !filtered ? (
              <div>
                <div className="just-booked">
                  <h2>Just Booked in Singapore</h2>
                  <HouseTable houses={table0}></HouseTable>
                </div>
                <br></br>
                <div className="hot-accommodation">
                  <h2>Hot Accommodation in Singapore</h2>
                  <HouseTable houses={table1}></HouseTable>
                </div>
              </div>
            ) :
              (
                <div>
                  <HouseTable houses={filteredTable}></HouseTable>
                </div>
              )
          }

        </div>
      </div>)
  }
}
const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })(App);

export default WrappedHorizontalLoginForm;
