import React from 'react';
import './HouseDetail.scss';
import { Row, Col, Icon } from 'antd';
import StarRatings from 'react-star-ratings';
import HouseTable from './HouseTable';
const axios = require('axios');

const testhouse = {
    "id": 49091,
    "name": "COZI",
    "host_id": 266763,
    "host_name": "Francesca",
    "neighbourhood_group": "North Region",
    "neighbourhood": "Woodlands",
    "room_type": "Private room",
    "price": 83,
    "bedrooms": 2,
    "bathrooms": 1,
    "minimum_nights": 180,
    "number_of_reviews": 1,
    "last_review": "2013/10/21",
    "reviews_per_month": 0.01,
    "calulated_host_listings_count": 2,
    "avaliability_365": 365,
    "review_score_rating": 94,
    "picture_url": "https://a0.muscache.com/im/pictures/36342984/670d98e1_original.jpg?aki_policy=large",
    "amentites": "{TV,\"Cable TV\",Internet,Wifi,\"Air conditioning\",\"Pets live on this property\",Cat(s),Elevator,Washer}",
    "description": "This is Room No. 2.(available after Jan 15 2014) USD750 per month.  You may want to take a look at room number 1 as well. Room NO 1 is available immediately at USD700 per month Its at the far right corner of your screen below. Please note that currency is in USD unless stated as SGD. only LONG TERM STAY (6 months minimum) Place is available only to adults. Good location. 10 minutes walk to train station. 10 minutes walk to Bus stops.  7 minutes walk to 24 hour food center.  7 minutes walk to two 24 hour supermarkets.  10 minutes walk to 24/7 McDonald's. 30 minutes train ride to Orchard road. On Friday's/Saturday's, you can take the Night Rider bus from Orchard or from Clarke Quay direct back home and save taxi fare!   Room is clean,cozy and comfortable. One queensize bed. There is aircondition and fan. Washing machine is also available with no extra charges. However  pls purchase own detergent. Free WiFi too!! We have cable in the living room and a large dining table as well. Very safe"
}

const group1 = [{
    "id": 49093,
    "name": "COZI",
    "host_id": 266763,
    "host_name": "Francesca",
    "neighbourhood_group": "North Region",
    "neighbourhood": "Woodlands",
    "room_type": "Private room",
    "price": 83,
    "bedrooms": 2,
    "bathrooms": 1,
    "minimum_nights": 180,
    "number_of_reviews": 1,
    "last_review": "2013/10/21",
    "reviews_per_month": 0.01,
    "calulated_host_listings_count": 2,
    "avaliability_365": 365,
    "review_score_rating": 94,
    "picture_url": "https://a0.muscache.com/im/pictures/36342984/670d98e1_original.jpg?aki_policy=large",
    "amentites": "{TV,\"Cable TV\",Internet,Wifi,\"Air conditioning\",\"Pets live on this property\",Cat(s),Elevator,Washer}",
    "description": "This is Room No. 2.(available after Jan 15 2014) USD750 per month.  You may want to take a look at room number 1 as well. Room NO 1 is available immediately at USD700 per month Its at the far right corner of your screen below. Please note that currency is in USD unless stated as SGD. only LONG TERM STAY (6 months minimum) Place is available only to adults. Good location. 10 minutes walk to train station. 10 minutes walk to Bus stops.  7 minutes walk to 24 hour food center.  7 minutes walk to two 24 hour supermarkets.  10 minutes walk to 24/7 McDonald's. 30 minutes train ride to Orchard road. On Friday's/Saturday's, you can take the Night Rider bus from Orchard or from Clarke Quay direct back home and save taxi fare!   Room is clean,cozy and comfortable. One queensize bed. There is aircondition and fan. Washing machine is also available with no extra charges. However  pls purchase own detergent. Free WiFi too!! We have cable in the living room and a large dining table as well. Very safe"
},
{
    "id": 49092,
    "name": "COZI",
    "host_id": 266763,
    "host_name": "Francesca",
    "neighbourhood_group": "North Region",
    "neighbourhood": "Woodlands",
    "room_type": "Private room",
    "price": 83,
    "bedrooms": 2,
    "bathrooms": 1,
    "minimum_nights": 180,
    "number_of_reviews": 1,
    "last_review": "2013/10/21",
    "reviews_per_month": 0.01,
    "calulated_host_listings_count": 2,
    "avaliability_365": 365,
    "review_score_rating": 94,
    "picture_url": "https://a0.muscache.com/im/pictures/36342984/670d98e1_original.jpg?aki_policy=large",
    "amentites": "{TV,\"Cable TV\",Internet,Wifi,\"Air conditioning\",\"Pets live on this property\",Cat(s),Elevator,Washer}",
    "description": "This is Room No. 2.(available after Jan 15 2014) USD750 per month.  You may want to take a look at room number 1 as well. Room NO 1 is available immediately at USD700 per month Its at the far right corner of your screen below. Please note that currency is in USD unless stated as SGD. only LONG TERM STAY (6 months minimum) Place is available only to adults. Good location. 10 minutes walk to train station. 10 minutes walk to Bus stops.  7 minutes walk to 24 hour food center.  7 minutes walk to two 24 hour supermarkets.  10 minutes walk to 24/7 McDonald's. 30 minutes train ride to Orchard road. On Friday's/Saturday's, you can take the Night Rider bus from Orchard or from Clarke Quay direct back home and save taxi fare!   Room is clean,cozy and comfortable. One queensize bed. There is aircondition and fan. Washing machine is also available with no extra charges. However  pls purchase own detergent. Free WiFi too!! We have cable in the living room and a large dining table as well. Very safe"
},
{
    "id": 49091,
    "name": "COZI",
    "host_id": 266763,
    "host_name": "Francesca",
    "neighbourhood_group": "North Region",
    "neighbourhood": "Woodlands",
    "room_type": "Private room",
    "price": 83,
    "bedrooms": 2,
    "bathrooms": 1,
    "minimum_nights": 180,
    "number_of_reviews": 1,
    "last_review": "2013/10/21",
    "reviews_per_month": 0.01,
    "calulated_host_listings_count": 2,
    "avaliability_365": 365,
    "review_score_rating": 94,
    "picture_url": "https://a0.muscache.com/im/pictures/36342984/670d98e1_original.jpg?aki_policy=large",
    "amentites": "{TV,\"Cable TV\",Internet,Wifi,\"Air conditioning\",\"Pets live on this property\",Cat(s),Elevator,Washer}",
    "description": "This is Room No. 2.(available after Jan 15 2014) USD750 per month.  You may want to take a look at room number 1 as well. Room NO 1 is available immediately at USD700 per month Its at the far right corner of your screen below. Please note that currency is in USD unless stated as SGD. only LONG TERM STAY (6 months minimum) Place is available only to adults. Good location. 10 minutes walk to train station. 10 minutes walk to Bus stops.  7 minutes walk to 24 hour food center.  7 minutes walk to two 24 hour supermarkets.  10 minutes walk to 24/7 McDonald's. 30 minutes train ride to Orchard road. On Friday's/Saturday's, you can take the Night Rider bus from Orchard or from Clarke Quay direct back home and save taxi fare!   Room is clean,cozy and comfortable. One queensize bed. There is aircondition and fan. Washing machine is also available with no extra charges. However  pls purchase own detergent. Free WiFi too!! We have cable in the living room and a large dining table as well. Very safe"
}];

const group2 = [
    {
        "id": 49091,
        "name": "COZI",
        "host_id": 266763,
        "host_name": "Francesca",
        "neighbourhood_group": "North Region",
        "neighbourhood": "Woodlands",
        "room_type": "Private room",
        "price": 83,
        "bedrooms": 2,
        "bathrooms": 1,
        "minimum_nights": 180,
        "number_of_reviews": 1,
        "last_review": "2013/10/21",
        "reviews_per_month": 0.01,
        "calulated_host_listings_count": 2,
        "avaliability_365": 365,
        "review_score_rating": 94,
        "picture_url": "https://a0.muscache.com/im/pictures/36342984/670d98e1_original.jpg?aki_policy=large",
        "amentites": "{TV,\"Cable TV\",Internet,Wifi,\"Air conditioning\",\"Pets live on this property\",Cat(s),Elevator,Washer}",
        "description": "This is Room No. 2.(available after Jan 15 2014) USD750 per month.  You may want to take a look at room number 1 as well. Room NO 1 is available immediately at USD700 per month Its at the far right corner of your screen below. Please note that currency is in USD unless stated as SGD. only LONG TERM STAY (6 months minimum) Place is available only to adults. Good location. 10 minutes walk to train station. 10 minutes walk to Bus stops.  7 minutes walk to 24 hour food center.  7 minutes walk to two 24 hour supermarkets.  10 minutes walk to 24/7 McDonald's. 30 minutes train ride to Orchard road. On Friday's/Saturday's, you can take the Night Rider bus from Orchard or from Clarke Quay direct back home and save taxi fare!   Room is clean,cozy and comfortable. One queensize bed. There is aircondition and fan. Washing machine is also available with no extra charges. However  pls purchase own detergent. Free WiFi too!! We have cable in the living room and a large dining table as well. Very safe"
    },
    {
        "id": 49093,
        "name": "COZI",
        "host_id": 266763,
        "host_name": "Francesca",
        "neighbourhood_group": "North Region",
        "neighbourhood": "Woodlands",
        "room_type": "Private room",
        "price": 83,
        "bedrooms": 2,
        "bathrooms": 1,
        "minimum_nights": 180,
        "number_of_reviews": 1,
        "last_review": "2013/10/21",
        "reviews_per_month": 0.01,
        "calulated_host_listings_count": 2,
        "avaliability_365": 365,
        "review_score_rating": 94,
        "picture_url": "https://a0.muscache.com/im/pictures/36342984/670d98e1_original.jpg?aki_policy=large",
        "amentites": "{TV,\"Cable TV\",Internet,Wifi,\"Air conditioning\",\"Pets live on this property\",Cat(s),Elevator,Washer}",
        "description": "This is Room No. 2.(available after Jan 15 2014) USD750 per month.  You may want to take a look at room number 1 as well. Room NO 1 is available immediately at USD700 per month Its at the far right corner of your screen below. Please note that currency is in USD unless stated as SGD. only LONG TERM STAY (6 months minimum) Place is available only to adults. Good location. 10 minutes walk to train station. 10 minutes walk to Bus stops.  7 minutes walk to 24 hour food center.  7 minutes walk to two 24 hour supermarkets.  10 minutes walk to 24/7 McDonald's. 30 minutes train ride to Orchard road. On Friday's/Saturday's, you can take the Night Rider bus from Orchard or from Clarke Quay direct back home and save taxi fare!   Room is clean,cozy and comfortable. One queensize bed. There is aircondition and fan. Washing machine is also available with no extra charges. However  pls purchase own detergent. Free WiFi too!! We have cable in the living room and a large dining table as well. Very safe"
    },
    {
        "id": 49092,
        "name": "COZI",
        "host_id": 266763,
        "host_name": "Francesca",
        "neighbourhood_group": "North Region",
        "neighbourhood": "Woodlands",
        "room_type": "Private room",
        "price": 83,
        "bedrooms": 2,
        "bathrooms": 1,
        "minimum_nights": 180,
        "number_of_reviews": 1,
        "last_review": "2013/10/21",
        "reviews_per_month": 0.01,
        "calulated_host_listings_count": 2,
        "avaliability_365": 365,
        "review_score_rating": 94,
        "picture_url": "https://a0.muscache.com/im/pictures/36342984/670d98e1_original.jpg?aki_policy=large",
        "amentites": "{TV,\"Cable TV\",Internet,Wifi,\"Air conditioning\",\"Pets live on this property\",Cat(s),Elevator,Washer}",
        "description": "This is Room No. 2.(available after Jan 15 2014) USD750 per month.  You may want to take a look at room number 1 as well. Room NO 1 is available immediately at USD700 per month Its at the far right corner of your screen below. Please note that currency is in USD unless stated as SGD. only LONG TERM STAY (6 months minimum) Place is available only to adults. Good location. 10 minutes walk to train station. 10 minutes walk to Bus stops.  7 minutes walk to 24 hour food center.  7 minutes walk to two 24 hour supermarkets.  10 minutes walk to 24/7 McDonald's. 30 minutes train ride to Orchard road. On Friday's/Saturday's, you can take the Night Rider bus from Orchard or from Clarke Quay direct back home and save taxi fare!   Room is clean,cozy and comfortable. One queensize bed. There is aircondition and fan. Washing machine is also available with no extra charges. However  pls purchase own detergent. Free WiFi too!! We have cable in the living room and a large dining table as well. Very safe"
    }
];

let splitAmentities = (s) => {
    if (!s || s.length === 0) return "";
    let words = s.split(',');
    let results = [];
    for (let word of words) {
        word = word.replace(/({|}|")/, "");
        if (/"/.test(word)) word = word.replace('"', '');
        results.push(word);
    }
    return results;
}

class HouseDetail extends React.Component {
    state = {
        house: {},
        recommenderGroup1: [],
        recommenderGroup2: []
    };

    componentDidMount() {
        console.log(this.props.match.params.id);
        // send two request: 
        // 1. get detail infomation of current room
        // 2. get recommendation by current room id and use id
        
        // axios.get('')
        // .then(function (response) {
        //   // handle success
        //   console.log(response);
        // })
        // .catch(function (error) {
        //   // handle error
        //   console.log(error);
        // })
        // .finally(function () {
        //   // always executed
        // });
        this.setState({
            house: testhouse,
            recommenderGroup1: group1,
            recommenderGroup2: group2
        });
    }

    render() {
        const { house, recommenderGroup1, recommenderGroup2 } = this.state;
        return (
            <div className="house-detail">
                <div className="header">Hi Sam!</div>
                <div className="summary-info">
                    <Row style={{ padding: "2vw" }}>
                        <Col span={12}><img src={house.picture_url} style={{ width: "95%" }} /></Col>
                        <Col span={12}>
                            <div className="info">
                                <p className="location"><Icon type="environment" />&nbsp;{house.neighbourhood}</p>
                                <p>{house.name}</p>
                                <p>{house.bedrooms}&nbsp;bedrooms&nbsp;&nbsp;{house.bathrooms}&nbsp;bathrooms</p>
                                <p>$&nbsp;{house.price}&nbsp;SGD/night </p>
                                <p>{house.review_score_rating && house.review_score_rating / 20}</p>
                                {house.review_score_rating && <div>
                                    <StarRatings
                                        rating={house.review_score_rating / 20}
                                        starRatedColor="blue"
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
                        <h1>Amentities</h1>
                        {house.amentites && splitAmentities(house.amentites).map(word => {
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