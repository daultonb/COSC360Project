import http from '../http-common';
import { authHeader } from '../helpers/auth-header';
class PostsDataService {
    getAll() {
        return http.get('/posts');
    }
    /* length-n to length-1 posts by id*/
    getN(n) {
        return http.get(`/posts?n=${n}`);
    }
    
    getTotal() {
        return http.get(`/posts?total=true`);
    }

    get(id) {
        return http.get(`/viewpost/${id}`);
    }

    create(data) {
        const authToken = {
            headers: authHeader()
        }
        return http.post('/posts', data, authToken);
    }

    update(id, data) {
        const authToken = {
            headers: authHeader()
        }
        return http.put(`/posts/${id}`, data, authToken);
    }

    delete(id) {
        const authToken = {
            headers: authHeader()
        }
        return http.delete(`/posts/${id}`, authToken);
    }

    findByUser(user) {
        return http.get(`/posts/user/${user}`);
    }

    searchPosts(searchString) {
        return http.get(`/posts/search/${searchString}`);
    }

    findByGenre(genre) {
        return http.get(`/posts?genre=${genre}`);
    }
}

export default new PostsDataService();