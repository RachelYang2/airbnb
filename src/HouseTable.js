import React from 'react';
import { Row, Col } from 'antd';
import StarRatings from 'react-star-ratings';
import './HouseTable.scss';
import { Link } from 'react-router-dom'


class HouseTable extends React.Component {
    state = {

    };
    render() {
        const { houses } = this.props;
        return (
            <div>
                <Row>
                    {houses && houses.length === 0 && <div>
                        Sorry, no matched houses :(
                    </div>}
                    {houses && houses.length > 0 && houses.map(house => (
                        <Col key={house.listing_id} span={8}>
                            <div className="info-block" style={{ padding: "1vw" }}>
                                <Link to={`/house/${house.listing_id}`}><img src={house.picture_url} /></Link>
                                <div>
                                    <p style={{ fontWeight: "bold" }}>{house.neighbourhood_group_cleansed && house.neighbourhood_group_cleansed.split(' ')[0]}&nbsp;- Singapore</p>
                                    <p><Link to={`/house/${house.listing_id}`}>{house.name}</Link></p>
                                    <p>&nbsp;{house.price}&nbsp;SGD/night </p>
                                    <div>
                                        {house.review_scores_rating && <StarRatings
                                            rating={house.review_scores_rating / 20}
                                            starRatedColor="#4472C4"
                                            numberOfStars={5}
                                            starDimension="15px"
                                            name='rating'
                                            starSpacing="3px"
                                        />}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        )
    }
};

export default HouseTable;