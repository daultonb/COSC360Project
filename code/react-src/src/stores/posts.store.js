import { createStore, action, thunk } from 'easy-peasy';
import PostsDataService from '../services/posts.service';

const PostsStore = createStore({
    posts: [],
    total: 0,


    addPost: action((state, payload) => {
        state.posts.push(payload);
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
        console.log(data);
        console.log(data.data); //outputs 30, setTotal is broken?
        actions.setTotal(data.data);
    }),


    savePost: thunk(async (actions, payload) => {
        const { data } = await PostsDataService.create(payload);
        actions.addPost(data);
    }),
});

export default PostsStore;