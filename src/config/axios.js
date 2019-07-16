import axios from 'axios'

const request = axios.create({
    baseURL: 'https://developers.zomato.com/api/v2.1/',
    headers: {
        'Accept': 'application/json',
        'user-key': 'f5f9392931b4f0fef4b01d5c54826ef4'
    }
})

export default request