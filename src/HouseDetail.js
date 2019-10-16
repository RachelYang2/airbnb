import React from 'react';
import './HouseDetail.scss';
import { Row, Col, Icon } from 'antd';
import StarRatings from 'react-star-ratings';
import HouseTable from './HouseTable';
import { Link } from 'react-router-dom'

const client = require('./client');

const SIMI = "simi"
const TOPIC = "topic"

let splitAmentities = (s) => {
    if (!s || s.length === 0) return "";
    let words = s.split(',');
    let results = [];
    for (let word of words) {
        word = word.replace(/({|}|")/, "");
        if (/"/.test(word)) word = word.replace('"', '');
        if (/translation missing/.test(word)) continue;
        results.push(word);
    }
    let endWord = results[results.length - 1]
    endWord = endWord.replace("}", "")
    results[results.length - 1] = endWord
    return results;
}

class HouseDetail extends React.Component {
    state = {
        house: {},
        recommenderGroup1: [],
        recommenderGroup2: []
    };

    getRecommenderResult = (way) => {
        let self = this
        client.get('/recommender', {
            params:
            {
                id: this.props.match.params.id,
                user_id: localStorage.getItem("airbnb_user"),
                recommender_way: way
            }
        })
            .then(function (response) {
                if (way === SIMI) {
                    self.setState({
                        recommenderGroup1: response.data
                    })
                }
                else {
                    self.setState({
                        recommenderGroup2: response.data
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                // always executed
                window.scrollTo(0, 0)
            });
    }

    fetchData = () => {
        // 1. get detail infomation of current room
        // 2. get recommendation by current room id and use id
        let house = {}
        this.getRecommenderResult(SIMI)
        this.getRecommenderResult(TOPIC)
        let self = this
        client.get('/airbnb_detail/?id=' + this.props.match.params.id)
            .then(function (response) {
                house = response.data;
                self.setState({
                    house: house,
                });
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.fetchData()
        }
    }

    render() {
        const { house, recommenderGroup1, recommenderGroup2 } = this.state;
        return (
            <div className="house-detail">
                <div style={{ margin: "2vw" }}><Link to="/"><Icon type="arrow-left" />&nbsp;Back</Link>
                    <span className="header">Hi {localStorage.getItem("airbnb_user")}</span>
                </div>
                <div className="summary-info">
                    <Row style={{ padding: "2vw" }}>
                        <Col span={12}><img src={house.picture_url} style={{ width: "95%", height: "95%" }} /></Col>
                        <Col span={12}>
                            <div className="info">
                                <p className="location"><Icon type="environment" />&nbsp;{house.neighbourhood_cleansed}</p>
                                <p>{house.name}</p>
                                <p>{house.bedrooms && parseInt(house.bedrooms)}&nbsp;bedrooms&nbsp;&nbsp;{house.bathrooms && parseInt(house.bathrooms)}&nbsp;bathrooms</p>
                                <p>&nbsp;{house.price}&nbsp;SGD/night </p>
                                {house.review_scores_rating && <div>
                                    <span>{house.review_scores_rating && house.review_scores_rating / 20}&nbsp;&nbsp;</span>
                                    <StarRatings
                                        rating={house.review_scores_rating / 20}
                                        starRatedColor="#4472C4"
                                        numberOfStars={5}
                                        starDimension="15px"
                                        name='rating'
                                        starSpacing="3px"
                                    />
                                </div>}
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ padding: "2vw" }}>
                        <h1>Description</h1>
                        <p style={{ textAlign: "justify" }}>{house.description}</p>
                    </Row>
                    <Row style={{ padding: "2vw" }}>
                        <h1>Amenities</h1>
                        {house.amenities && splitAmentities(house.amenities).map(word => {
                            return (<Col span={12} key={word}><Icon type="check" />&nbsp;{word}</Col>)
                        })}
                    </Row>
                    <Row style={{ padding: "2vw" }}>
                        <h1>Similar Accommodations</h1>
                        <HouseTable houses={recommenderGroup1}></HouseTable>
                    </Row>
                    <Row style={{ padding: "2vw" }}>
                        <h1>Guess you will like......</h1>
                        <HouseTable houses={recommenderGroup2}></HouseTable>
                    </Row>
                </div>
            </div>
        )
    }
}

export default HouseDetail;