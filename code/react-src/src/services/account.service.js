import http from '../http-common';

class AccountDataService {
    getAll() {
        return http.get('/account');
    }

    get(id) {
        return http.get(`/account/find/${id}`);
    }

    create(data) {
        return http.post('/account/create', data);
    }

    update(id, data) {
        return http.put(`/account/update/${id}`, data);
    }

    delete(id) {
        return http.delete(`/account/delete/${id}`);
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