import React from 'react'
import { FaStarHalfAlt, FaStar, FaRegStar, FaUserFriends } from 'react-icons/fa'

import '../../assets/styles/component/restaurant-card/index.css'

class Catalog extends React.Component {

    render() {
        const item = this.props.restaurant

        return (
            <li className="restaurant-card">
                <div className="restaurant-card-image"
                    style={{
                        backgroundImage: 
                        'url(' + this.getImage(item.restaurant) + ')'
                    }}>
                </div>
                <div className="restaurant-card-info">
                    <h3 className="restaurant-card-name">
                        {item.restaurant.name}
                    </h3>
                    <p className="restaurant-card-address">
                        {item.restaurant.location.address}
                    </p>
                    {this.getRating(item.restaurant.user_rating)}

                    <div className="restaurant-card-labels">
                        <label className="card-label card-label-cost">
                            <FaUserFriends/>
                            {item.restaurant.currency}
                            {item.restaurant.average_cost_for_two}
                        </label>
                        <label className="card-label card-label-cuisines">
                            {item.restaurant.cuisines}
                        </label>
                    </div>
                </div>
            </li>
    )}

    getImage = (restaurant) => {
        
        if (restaurant.photos && restaurant.photos.length > 0)
            return restaurant.photos[0].photo.url
        else 
            return "http://denrakaev.com/wp-content/uploads/2015/03/no-image.png"
    }

    getRating = (rating) => {
        let stars = []
        let value = parseFloat(rating.aggregate_rating)
        
        for (let index = 1; index <= Math.floor(value); index++) {
            stars.push(<FaStar key={index}/>)
        }

        if ((value % 1) > 0) 
            stars.push(<FaStarHalfAlt key={0}/>)

        for (let index = 1; index <= (5 - Math.ceil(value)); index++) {
            stars.push(<FaRegStar key={5 + index}/>)
        }

        return <div style={{
            color: '#' + rating.rating_color
        }} className="restaurant-card-rating">
            {stars}
        </div>
    }
}

export default Catalog