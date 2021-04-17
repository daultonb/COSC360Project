import axios from 'axios';

export default axios.create({
    baseURL: 'https://us-central1-cosc360project-9d804.cloudfunctions.net/app/api',
    headers: {
        'Content-type': 'application/json'
    }
});