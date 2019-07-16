import React from 'react'

import SearchField from './../component/SearchField/SearchField'
import logo from './../assets/logos/logo-white.jpg'

import './../assets/styles/search/index.css'

class Search extends React.Component {

    render() {
        return (
            <div className="search">
                <header className="search-header">
                    <img src={logo} alt="uaiFood logo white" className="search-logo"/>
                </header>
                <main className="search-widget">
                    <h1>Descubra os melhores restaurantes em sua cidade</h1>
                    <SearchField/>
                </main>
            </div>
    )}
}

export default Search