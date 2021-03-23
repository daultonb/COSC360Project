export function authHeader() {
    let account = JSON.parse(localStorage.getItem('account'));

    if (account && account.token) {
        return { 'Authorization': 'Bearer ' + account.token };
    } else {
        return {};
    }
}
