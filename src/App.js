import React from 'react';
import './App.scss';
import HouseTable from './HouseTable';
import { Menu, Dropdown, Icon, Button, Form, Input, Modal } from 'antd';

const LOGIN = "Login";
const REGISTER = "Register";
class App extends React.Component {
  state = {
    visible: false,
    confirmLoading: false,
    currentForm: ''
  };

  menuRegion = (
    <Menu onClick={this.handleMenuClick}>
      <Menu.Item key="1">
        Central
      </Menu.Item>
      <Menu.Item key="2">
        North
      </Menu.Item>
      <Menu.Item key="3">
        East
      </Menu.Item>
      <Menu.Item key="4">
        South
      </Menu.Item>
    </Menu>
  );

  menuNoP = (
    <Menu onClick={this.handleMenuClick}>
      <Menu.Item key="1">
        1 to 3 People
      </Menu.Item>
      <Menu.Item key="2">
        4 to 6 People
      </Menu.Item>
      <Menu.Item key="3">
        7 to 10 People
      </Menu.Item>
      <Menu.Item key="4">
        Over 10 People
      </Menu.Item>
    </Menu>
  );

  menuPrice = (
    <Menu onClick={this.handleMenuClick}>
      <Menu.Item key="1">
        $0-$49
      </Menu.Item>
      <Menu.Item key="2">
        $50-$99
      </Menu.Item>
      <Menu.Item key="3">
        $100-$299
      </Menu.Item>
      <Menu.Item key="4">
        $300-$500
      </Menu.Item>
      <Menu.Item key="5">
        Over $500
      </Menu.Item>
    </Menu>
  );

  handleMenuClick = (e) => {

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
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { visible, confirmLoading, currentForm } = this.state;
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
            <Button
              type="link"
              id="App-link"
              onClick={() => this.showModal(LOGIN)}
            >
              Login
            </Button>
            <Button
              type="link"
              id="App-link"
              onClick={() => this.showModal(REGISTER)}
            >
              Register
            </Button>
          </div>
          <div className="filters">
            <div id="components-dropdown-demo-dropdown-button">
              <Dropdown overlay={this.menuRegion} placement="bottomRight">
                <Button>
                  Location&nbsp;<Icon type="environment" />
                </Button>
              </Dropdown>
              <Dropdown overlay={this.menuNoP} placement="bottomRight">
                <Button>Number of Guests&nbsp;<Icon type="user" />
                </Button>
              </Dropdown>
              <Dropdown overlay={this.menuPrice} placement="bottomRight">
                <Button>
                  Price Range<Icon type="dollar" />
                </Button>
              </Dropdown>
              <Button type="primary" icon="search">
                Search
              </Button>
            </div>
          </div>
        </header>
        <div className="content">
          <div className="just-booked">
            <h2>Just Booked in Singapore</h2>
            <HouseTable></HouseTable>
          </div>
          <div className="hot-accommodation">
            <h2>Hot Accommodation in Singapore</h2>
            <HouseTable></HouseTable>
          </div>
        </div>
      </div>)
  }
}
const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })(App);

export default WrappedHorizontalLoginForm;
