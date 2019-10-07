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
                    {houses && houses.map(house => (
                        <Col key={house.id} span={8}>
                            <div className="info-block" style={{ padding: "1vw" }}>
                                <img src={house.picture_url} />
                                <div>
                                    <p style={{ fontWeight: "bold" }}>{house.neighbourhood_group}&nbsp;Singapore</p>
                                    <p><Link to={`/house/${house.id}`}>{house.name}</Link></p>
                                    <p>$&nbsp;{house.price}&nbsp;SGD/night </p>
                                    <div>
                                        {house.review_score_rating && <StarRatings
                                            rating={house.review_score_rating / 20}
                                            starRatedColor="blue"
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