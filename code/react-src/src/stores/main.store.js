import { createStore, action, thunk } from 'easy-peasy';
import PostsDataService from '../services/posts.service';
import AccountDataService from '../services/account.service';

const MainStore = createStore({
    /*
    POSTS
    */
    posts: [],

    addPost: action((state, payload) => {
        state.posts.push(payload);
    }),

    setPosts: action((state, payload) => {
        state.posts = payload;
    }),

    fetchPosts: thunk(async (actions, payload) => {
        //state.posts = JSON.parse('[{"id":1,"title":"testing","description":"testing2","username":"skyrossm","createdAt":"2021-03-14T00:38:54.000Z","updatedAt":"2021-03-14T00:38:54.000Z"},{"id":2,"title":"testing","description":"testing238912378123","username":"skyrossm","createdAt":"2021-03-14T00:42:22.000Z","updatedAt":"2021-03-14T00:42:22.000Z"}]');
        const { data } = await PostsDataService.getAll();
        actions.setPosts(data);
    }),

    savePost: thunk(async (actions, payload) => {
        const { data } = await PostsDataService.create(payload);
        actions.addPost(data);
    }),

    /*
    ACCOUNT
    */
    myAccount: {},

    setAccount: action((state, payload) => {
        localStorage.setItem('account', JSON.stringify(payload));
        state.myAccount = payload;
    }),

    logout: action((state, payload) => {
        localStorage.removeItem('account');
        state.myAccount = {};
    }),

    createAccount: thunk(async (actions, payload) => {
        const data = await AccountDataService.create(payload);
        return data.data;
    }),

    login: thunk(async (actions, payload) => {
        const data = await AccountDataService.login(payload);
        const accountData = data.data;
        if(accountData.token) actions.setAccount(accountData);
        return accountData;
    }),
});

export default MainStore;
