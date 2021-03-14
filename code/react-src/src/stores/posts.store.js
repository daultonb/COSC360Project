import { createStore, action, thunk } from 'easy-peasy';
import PostsDataService from '../services/posts.service';

const PostsStore = createStore({
    posts: [],


    addPost: action((state, payload) => {
      state.posts.push(payload);
    }),

    fetchPosts: action((state, payload) => {
        state.posts = JSON.parse('[{"id":1,"title":"testing","description":"testing2","username":"skyrossm","createdAt":"2021-03-14T00:38:54.000Z","updatedAt":"2021-03-14T00:38:54.000Z"},{"id":2,"title":"testing","description":"testing238912378123","username":"skyrossm","createdAt":"2021-03-14T00:42:22.000Z","updatedAt":"2021-03-14T00:42:22.000Z"}]');
    }),

    savePost: thunk(async (actions, payload) => {
        const { data } = await PostsDataService.create(payload);
        actions.addPost(data);
    }),
});

export default PostsStore;