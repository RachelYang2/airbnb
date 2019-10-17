import React from 'react';
import { Row, Col, Icon } from 'antd';


class Footer extends React.Component {
    state = {

    };
    render() {
        return (
            <div style={{fontStyle: "italic", padding: "2vw 10vw", textAlign: "center", background: "#FF5A5E", color: "white"}}>
                <h2 style={{color: "white"}}>About us</h2>
                <Row>
                    <Col span={8}><a href="mailto:zheyuan.fan@u.nus.edu" style={{color: "white"}}><Icon type="mail" />&nbsp;&nbsp;Fan Zheyuan</a></Col>
                    <Col span={8}><a href="mailto:wenlin.fang@u.nus.edu" style={{color: "white"}}>&nbsp;<Icon type="mail" />&nbsp;&nbsp;Fang Wenlin</a></Col>
                    <Col span={8}><a href="mailto:e0401595@u.nus.edu" style={{color: "white"}}><Icon type="mail" />&nbsp;&nbsp;Shen Chen</a></Col>
                    <Col span={8}><a href="mailto:wbc0410@outlook.com" style={{color: "white"}}>&nbsp;<Icon type="mail" />&nbsp;&nbsp;Wang Bochen</a></Col>
                    <Col span={8}><a href="mailto:jinting.xiao@u.nus.edu" style={{color: "white"}}><Icon type="mail" />&nbsp;&nbsp;Xiao Jinting</a></Col>
                    <Col span={8}><a href="mailto:yxr9722@gmail.com" style={{color: "white"}}>&nbsp;&nbsp;&nbsp;<Icon type="mail" />&nbsp;&nbsp;Yang Xiaorui</a></Col>
                </Row>
            </div>
        )
    }
};

export default Footer;