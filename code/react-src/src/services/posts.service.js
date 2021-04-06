import http from '../http-common';

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
        return http.get(`/posts/${id}`);
    }

    create(data) {
        return http.post('/posts', data);
    }

    update(id, data) {
        return http.put(`/posts/${id}`, data);
    }

    delete(id) {
        return http.delete(`/posts/${id}`);
    }

    findByTitle(title) {
        return http.get(`/posts?title=${title}`);
    }
}

export default new PostsDataService();