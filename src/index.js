import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import './assets/styles/main.css'
import App from './App'
import store from './config/stored/store'

/*
    Alguns problemas que encontrei:
    - Os tamanhos das fontes indicados não estão muito bons, ficam muito grandes, aí adaptei
    - A API não disponibiliza filtros por apenas tipos de cozinha, aí criei apenas esse filtro
    - O resultado das cidades nem sempre tem o estado, por exemplo são paulo mesmo, por isso usei o país
    - Como a API disponibiliza cor para os ratings, achei melhor usar essas cores
*/
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'))
