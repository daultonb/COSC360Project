import http from '../http-common';
import { authHeader } from '../helpers/auth-header';
class AccountDataService {
    getAll() {
        return http.get('/account');
    }

    get(id) {
        return http.get(`/account/find/${id}`);
    }

    getN(n) {
        return http.get(`/account?n=${n}`);
    }

    create(data) {
        return http.post('/account/create', data);
    }

    update(id, data) {
        const authToken = {
            headers: authHeader()
        }
        return http.put(`/account/update/${id}`, data, authToken);
    }

    delete(id) {
        const authToken = {
            headers: authHeader()
        }
        return http.delete(`/account/delete/${id}`, authToken);
    }

    login(data) {
        return http.post('/account/login', data);
    }

    findByUsername(username) {
        return http.get(`/account?username=${username}`);
    }

    findByEmail(email) {
        return http.get(`/account?email=${email}`);
    }
}

export default new AccountDataService();