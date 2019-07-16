import React from 'react'
import { connect } from 'react-redux'
import axios from './../config/axios'
import { FaCheckSquare, FaRegSquare } from 'react-icons/fa'

import appActions from './../config/stored/reducer/app/appActions'
import cityActions from './../config/stored/reducer/city/cityActions'
import SearchField from './../component/SearchField/SearchField'
import RestaurantCard from './../component/RestaurantCard/RestaurantCard'
import logo from './../assets/logos/logo-red.jpg'

import './../assets/styles/catalog/index.css'

class Catalog extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            restaurants: [],
            remaining: 0,
            currentItem: 0,
            cuisines: [
                {
                    name: "Árabe",
                    id: "4",
                    active: false
                },
                {
                    name: "Brasileira",
                    id: "159",
                    active: false
                },
                {
                    name: "Chinesa",
                    id: "25",
                    active: false
                },
                {
                    name: "Francesa",
                    id: "45",
                    active: false
                },
                {
                    name: "Frutos do mar",
                    id: "83",
                    active: false
                },
                {
                    name: "Italiana",
                    id: "55",
                    active: false
                },
                {
                    name: "Japonesa",
                    id: "60",
                    active: false
                },
                {
                    name: "Mexicana",
                    id: "73",
                    active: false
                },
                {
                    name: "Peruana",
                    id: "162",
                    active: false
                }
            ]
        }
    }

    componentDidMount() {
        if(!this.props.city.current && !localStorage.getItem('__cty_id')) {
            this.props.history.push("/")
            return
        }

        if(!this.props.city.current && localStorage.getItem('__cty_id'))
            this.getCity(localStorage.getItem('__cty_id'))
        else
            this.getRestaurants()
    }

    getRestaurants = () => {
        let baseUrl = this.getCurrentFilters().length === 0 ? 
            "search?start=" + this.state.currentItem + "&entity_type=city&entity_id="
                + this.props.city.current.id :
            "search?start=" + this.state.currentItem + "&entity_type=city&entity_id=" 
                + this.props.city.current.id + "&cuisines=" + this.getCurrentFilters()
        
        this.props.dispatch(appActions.setLoad(true))
        axios.get(baseUrl)
            .then(res => {
                let newRestaurants = this.state.restaurants
                
                if (this.state.currentItem > 0)
                    newRestaurants = newRestaurants.concat(res.data.restaurants)
                else
                    newRestaurants = res.data.restaurants

                this.setState({
                    restaurants: newRestaurants,
                    remaining: res.data.results_found = res.data.results_shown,
                    currentItem: this.state.currentItem + res.data.results_shown
                })
            })
            .catch(error => {
                this.props.dispatch(appActions.setError({hasError: true, message: error.message}))
            })
            .finally(() => {
                this.props.dispatch(appActions.setLoad(false))
            })
    }

    getCity = (id) => {
        this.props.dispatch(appActions.setLoad(true))
        axios.get("cities?city_ids=" + id)
            .then(res => {
                this.props.dispatch(cityActions.setCity(res.data.location_suggestions[0]))
                this.getRestaurants()
            })
            .catch(error => {
                this.props.dispatch(appActions.setError({hasError: true, message: error.message}))
            })
    }

    render() {
        return (
            <div className="catalog">
                <header className="catalog-header">
                    <img src={logo} alt="uaiFood logo red" className="catalog-logo"/>
                    <SearchField 
                        value={this.props.city.current ? this.props.city.current.name : ''} 
                        newCity={() => this.newSeach()} />
                </header>
                <main>
                    <aside className="catalog-filters">
                        <section className="filter cuisine">
                            <h4 className="filter-title">Tipo de cozinha:</h4>
                            <ul className="filter-list">
                                {this.state.cuisines.map((item) => 
                                    <li key={item.id} 
                                        className="filter-item" 
                                        onClick={() => this.filter(item)}>
                                            {item.active ? <FaCheckSquare/> : <FaRegSquare/>}
                                            {item.name}
                                    </li>
                                )}
                            </ul>
                        </section>

                    </aside>
                    {this.props.city.current &&
                        <article className="catalog-result">
                            <h1 className="catalog-result-title">
                                Restaurantes em {this.props.city.current.name}
                            </h1>
                            <section className="catalog-result-items">
                                <ul className="catalog-result-items-list">
                                    {
                                        this.state && this.state.restaurants.map((item) =>
                                            <RestaurantCard 
                                                key={item.restaurant.id} 
                                                restaurant={item}/>
                                        )
                                    }
                                </ul>
                                {this.state.remaining > 0 &&
                                    <button className="btn btn-load-more" 
                                        onClick={() => this.getRestaurants()}>
                                            Carregar mais
                                    </button>
                                }
                            </section>
                        </article>
                    }
                </main>
            </div>
    )}

    newSeach = () => {
        this.setState({
            currentItem: 0
        }, this.getRestaurants)
    }

    filter = (filter) => {
        if (this.props.app.loading)
            return

        let newCuisines = this.state.cuisines
        newCuisines.find(c => c.id === filter.id).active = !filter.active

        this.setState({
            cuisines: newCuisines,
            currentItem: 0
        }, this.getRestaurants)
    }

    getCurrentFilters = () => {
        return this.state.cuisines.reduce((acc, item) => {
            if (item.active)
                return item.id + "," + acc
            else 
                return acc
        }, '').slice(0, -1)
    }
}

const Connected = connect(store => ({ app: store.app, city: store.city }))(Catalog)
export default Connected