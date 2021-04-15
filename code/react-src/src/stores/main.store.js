import { createStore, action, thunk } from 'easy-peasy';
import PostsDataService from '../services/posts.service';
import AccountDataService from '../services/account.service';

const MainStore = createStore({
    /*
    POSTS
    */
    posts: [],
    total: 0,

    addPost: action((state, payload) => {
        state.posts.push(payload);
    }),

    deletePost: action((state, payload) => {
        state.posts = state.posts.filter((post) => post.id !== payload);
    }),

    setPosts: action((state, payload) => {
        state.posts = payload;
    }),
    
    setTotal: action((state, payload) => {
        state.total = payload;
    }),

    fetchPosts: thunk(async (actions, payload) => {
        //state.posts = JSON.parse('[{"id":1,"title":"testing","description":"testing2","username":"skyrossm","createdAt":"2021-03-14T00:38:54.000Z","updatedAt":"2021-03-14T00:38:54.000Z"},{"id":2,"title":"testing","description":"testing238912378123","username":"skyrossm","createdAt":"2021-03-14T00:42:22.000Z","updatedAt":"2021-03-14T00:42:22.000Z"}]');
        const { data } = await PostsDataService.getAll();
        actions.setPosts(data);
    }),

    //fetch N posts (for infinite scroll)
    fetchNPosts: thunk(async (actions, payload) => {
        //state.posts = JSON.parse('[{"id":1,"title":"testing","description":"testing2","username":"skyrossm","createdAt":"2021-03-14T00:38:54.000Z","updatedAt":"2021-03-14T00:38:54.000Z"},{"id":2,"title":"testing","description":"testing238912378123","username":"skyrossm","createdAt":"2021-03-14T00:42:22.000Z","updatedAt":"2021-03-14T00:42:22.000Z"}]');
        const { data } = await PostsDataService.getN(payload);
        actions.setPosts(data);
    }),
    
    //fetch N posts (for infinite scroll)
    fetchTotal: thunk(async (actions, payload) => {
        //state.posts = JSON.parse('[{"id":1,"title":"testing","description":"testing2","username":"skyrossm","createdAt":"2021-03-14T00:38:54.000Z","updatedAt":"2021-03-14T00:38:54.000Z"},{"id":2,"title":"testing","description":"testing238912378123","username":"skyrossm","createdAt":"2021-03-14T00:42:22.000Z","updatedAt":"2021-03-14T00:42:22.000Z"}]');
        const {data} = await PostsDataService.getTotal();
        // console.log(data);
        // console.log(data.data); //outputs 30, setTotal is broken?
        actions.setTotal(data.data);
    }),

    removePost: thunk(async (actions, payload) => {
        //state.posts = JSON.parse('[{"id":1,"title":"testing","description":"testing2","username":"skyrossm","createdAt":"2021-03-14T00:38:54.000Z","updatedAt":"2021-03-14T00:38:54.000Z"},{"id":2,"title":"testing","description":"testing238912378123","username":"skyrossm","createdAt":"2021-03-14T00:42:22.000Z","updatedAt":"2021-03-14T00:42:22.000Z"}]');
        await PostsDataService.delete(payload);
        actions.deletePost(payload);
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
    
    updateAccount: thunk(async (actions, payload) => {
        const data = await AccountDataService.update(payload.id, payload);
        return data.data;
    }),

    login: thunk(async (actions, payload) => {
        const data = await AccountDataService.login(payload);
        const accountData = data.data;
        if(accountData.token) actions.setAccount(accountData);
        return accountData;
    }),

    checkLogin: thunk((actions, payload) => {
        const loggedInUser = localStorage.getItem("account");
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          actions.setAccount(foundUser);
          return true;
        }
        return false;
    }),
});

export default MainStore;
