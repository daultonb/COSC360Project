import http from '../http-common';
import { authHeader } from '../helpers/auth-header';
class CommentsDataService {
    getAll() {
        return http.get('/comments');
    }

    get(id) {
        return http.get(`/comments/comment/${id}`);
    }

    getN(n) {
        return http.get(`/comments?n=${n}`)
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

    findForUser(username) {
        return http.get(`/comments/user/${username}`);
    }
}

export default new CommentsDataService();