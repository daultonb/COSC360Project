import { createStore, action, thunk } from 'easy-peasy';
import PostsDataService from '../services/posts.service';
import AccountDataService from '../services/account.service';
import CommentsDataService from '../services/comment.service';

const MainStore = createStore({
    /*
    POSTS
    */
    posts: [],
    total: 0,
    genreList: [
        {key: "generic", name: "Generic", description: "Games other than the ones specified below.", colorCode: "#000000"},
        {key: "csgo", name: "Counter Strike: Global Offensive", description: "Tactical FPS Shooter, Team-based, Realism, Skin Trading", colorCode: "#666"},
        {key: "ow", name: "Overwatch", description: "Cartoony Team-based FPS, Role Selection and Arcade modes", colorCode: "#f49d50"},
        {key: "lol", name: "League of Legends", description: "5v5 Arena Battle, Team-based, Role Selection", colorCode: "#65bb5e"},
        {key: "rl", name: "Rocket League", description: "Like soccer but with cars.", colorCode: "#2f76e3"},
        {key: "val", name: "Valorant", description: "Tactical FPS Shooter, Team-based, has the artstyle of Overwatch but gameplay of Counter Strike", colorCode: "#f93434"},
    ],

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
        const { data } = await PostsDataService.getAll();
        actions.setPosts(data);
    }),

    fetchPostsByGenre: thunk(async (actions, payload) => {
        const { data } = await PostsDataService.findByGenre(payload);
        actions.setPosts(data);
    }),

    fetchPost: thunk(async (actions, payload) => {
        const { data } = await PostsDataService.get(payload);
        return data;
    }),

    //fetch N posts (for infinite scroll)
    fetchNPosts: thunk(async (actions, payload) => {
        const { data } = await PostsDataService.getN(payload);
        actions.setPosts(data);
    }),
    
    //fetch N posts (for infinite scroll)
    fetchTotal: thunk(async (actions, payload) => {
        const {data} = await PostsDataService.getTotal();
        actions.setTotal(data.data);
    }),

    fetchPostsFromUser: thunk(async (actions, payload) => {
        const { data } = await PostsDataService.findByUser(payload);
        actions.setPosts(data);
        return data.length;
    }),

    searchPosts: thunk(async (actions, payload) => {
        const {data} = await PostsDataService.searchPosts(payload);
        actions.setPosts(data);
        return data.length;
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

    /*
    COMMENTS
    */
    currentPostComments: [],

    setComments: action((state, payload) => {
        state.currentPostComments = payload;
    }),

    getCommentsForPost: thunk(async (actions, postId) => {
        const { data } = await CommentsDataService.getCommentsForPost(postId);
        actions.setComments(data);
    }),

    getAllComments: thunk(async (actions, payload) => {
        const { data } = await CommentsDataService.getAll();
        actions.setComments(data);
    }),
});

export default MainStore;
