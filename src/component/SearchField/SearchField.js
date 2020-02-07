import React from 'react'
import axios from './../../config/axios'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"
import { FaMapMarkerAlt } from 'react-icons/fa'

import appActions from './../../config/stored/reducer/app/appActions'
import cityActions from './../../config/stored/reducer/city/cityActions'
import './../../assets/styles/component/search-field/index.css' 

class SearchField extends React.Component {

    render() {
        return (
            <section className="search-field">
                <div className="search-input">
                    <FaMapMarkerAlt className="search-input-icon"/>
                    <input 
                        className="search-input-write" 
                        type="text" 
                        id="search-text"
                        placeholder={this.props.value ? this.props.value : "Digite a sua cidade"}
                        onKeyDown={this.search}
                        autoComplete="off" />

                    {this.state && this.state.cities &&
                        <ul className="search-result">
                            { this.state.cities.map((city) => 
                                    <li key={city.id} className="search-result-item" 
                                        onClick={() => this.result(city)}>
                                            <span>{city.name}</span>
                                            {/* Como não tenho estado como foi 
                                            apresentado, vou colocar o país */}
                                            <small className="search-result-item-desc">
                                                País: {city.country_name}
                                            </small>
                                    </li>
                                )
                            }
                            {
                                this.state.cities.length === 0 &&
                                <li className="search-result-item search-result-empty">Sem resultado...</li>
                            }
                        </ul>
                    }
                </div>
                <button className="btn search-btn" onClick={() => this.search()}>Buscar</button>
            </section>
    )}

    result = (city) => {
        document.getElementById("search-text").value = ''
        localStorage.setItem('__cty_id', city.id)
        this.props.dispatch(cityActions.setCity(city))
        this.props.history.push('/catalog')
        if (this.props.newCity)
            this.props.newCity()
        this.setState({
            cities: null
        })
    }

    search = (e) => {
        if (this.props.app.loading)
            return

        if (e && e.key !== 'Enter')
            return

        let elem = document.getElementById("search-text")
        if (elem && elem.value && elem.value.length > 3) {

            this.props.dispatch(appActions.setLoad(true))
            axios.get("cities?q=" + elem.value)
                .then(res => {
                    this.setState({
                        cities: res.data.location_suggestions
                    })
                })
                .catch(error => {
                    this.props.dispatch(appActions.setError({hasError: true, message: error.message}))
                })
                .finally(() => {
                    this.props.dispatch(appActions.setLoad(false))
                })
        }
    }
}

const Connected = connect(store => ({ app: store.app, city: store.city }))(SearchField)
export default withRouter(props => <Connected{...props}/>)