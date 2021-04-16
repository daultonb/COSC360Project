import http from '../http-common';
import { authHeader } from '../helpers/auth-header';
class CommentsDataService {
    getAll() {
        return http.get('/comments');
    }

    get(id) {
        return http.get(`/comments/${id}`);
    }

    create(data) {
        const authToken = {
            headers: authHeader()
        }
        return http.post('/comments', data, authToken);
    }

    update(id, data) {
        const authToken = {
            headers: authHeader()
        }
        return http.put(`/comments/${id}`, data, authToken);
    }

    delete(id) {
        const authToken = {
            headers: authHeader()
        }
        return http.delete(`/comments/${id}`, authToken);
    }

    findForPost(postId) {
        return http.get(`/comments?post_id=${postId}`);
    }
}

export default new CommentsDataService();