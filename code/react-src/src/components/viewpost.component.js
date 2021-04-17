import { useStoreActions, useStoreState } from 'easy-peasy'
import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import styled from '@emotion/styled';
import Moment from 'react-moment';

import Button from './style-components/button.component';
import TextInput from './style-components/textinput.component';
import Comment from './style-components/comment.component';
import Alert from './style-components/alert.component';

const PostPage = styled.div`
    margin: 10vh auto;
    width: 60%;
    padding: 2vh;
    background-color: white;
    border-radius: 10px;
`;

const PostContent = styled.div`
    padding: 1vh;
`;

const PostBody = styled.div`

`;

const PostTitle = styled.h1` 
    padding: 0;
    margin: 0;
    font-weight: 400;
`;

const PostDetails = styled.span`
    color: gray;
`;

const PostDescription = styled.p` 

`;

const PostUsername = styled.span` 
    color: blue;
    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;

const PostActions = styled.div`
    padding: 2vh 0;
`;

const PostComments = styled.div`
    padding: 5vh 0 0 0;
    max-height: 70%;
    width: 100%;
    overflow-y: auto;
`;

const PostHead = styled.div`
    display: grid;
    grid-template-rows: 1fr 0.5fr;
`;

function ViewPost() {
    const genres = useStoreState((state) => state.genreList);

    const fetchPost = useStoreActions((actions) => actions.fetchPost);
    const fetchComments = useStoreActions((actions) => actions.getCommentsForPost);

    const deletePost = useStoreActions((actions) => actions.removePost);
    const saveComment = useStoreActions((actions) => actions.createComment);

    const myaccount = useStoreState((state) => state.myAccount);

    const [post, setPost] = useState();
    const [comments, setComments] = useState();

    const [addComment, setAddComment] = useState(false);
    const [comment, setComment] = useState('');
    const [currentUpload, setCurrentUpload] = useState();

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const location = useLocation();
    const history = useHistory();

    const userRedirect = (username) => {
        history.push(`/user/${username}`);
    }

    const hasAccess = () => {
        return myaccount.account?.admin === true || myaccount.account?.username === post?.username;
    }

    var fileReader;

    const readFile = (e) => {
      const content = fileReader.result;
      setCurrentUpload(content);
    }
  
    const handleChooseFile = (file) => {
      fileReader = new FileReader();
      fileReader.onloadend = readFile;
      fileReader.readAsDataURL(file);
    }
  
    const attemptComment = async () => {
        if (!comment) {
            setShowAlert(true);
            setAlertMessage("No text entered.");
            return;
        }
        await saveComment({
            post_id: post.id,
            text: comment,
            file: currentUpload,
            username: myaccount.account.username
        });
        setShowAlert(true);
        setAlertMessage("Your comment was posted!")
        setComment('');
        setComments(await fetchComments(Number(post.id)));
    }

    const attemptDeletePost = async () => {
        if (!hasAccess()) {
            return;
        }
        const confirmed = window.confirm("Are you sure you want to delete this?");
        if(!confirmed) return;
        deletePost(post.id)
        history.push("/");
    }

    const deleteCallback = async () => {
        setComments(await fetchComments(Number(post.id)));
    }

    useEffect(async () => {
        const postId = location.pathname.split("/")[2];
        if (!postId) {
            return;
        }
        setPost(await fetchPost(Number(postId)));
        setComments(await fetchComments(Number(postId)));
    }, []);

    const mimeType = post?.data?.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0];
    const postMedia = mimeType?.indexOf("image") ? <video src={post?.data} controls width="400"></video> : <img src={post?.data}></img>;

    let adminActions;
    if (hasAccess()) {
        adminActions = (
            <div>
                <Button float="right" onClick={attemptDeletePost} text={"Delete Post"}></Button>
            </div>
        );
    }

    return (
        <PostPage>
            {post ? (
                <PostContent>
                    <PostHead>
                        <PostTitle>{post.title}</PostTitle>
                        <PostDetails>
                            Posted by <PostUsername onClick={e => userRedirect(post.username)}>{post.username}</PostUsername>,&nbsp;
                            <Moment fromNow withTitle titleFormat="D MMM YYYY HH:mm:ss">{post.createdAt}</Moment>
                            &nbsp; in {genres.find(genre => genre.key === post.genre).name}
                        </PostDetails>
                    </PostHead>
                    <PostBody>
                        <PostDescription>{post.description.length > 100 ? post.description.substring(0, 100) + "..." : post.description}</PostDescription>
                    </PostBody>
                    {postMedia}
                    {myaccount.account && (
                        <PostActions>
                            {adminActions}
                            {addComment ? (
                            <div>
                                <TextInput key="commentText" type="text" placeholder="Enter Comment" value={comment} onChange={(e) => setComment(e.target.value)} required></TextInput>
                                <input type="file" id="file" accept="image/*, video/*" onChange={e => handleChooseFile(e.target.files[0])}></input><br></br><br></br>
                                <Button float="left" onClick={e => attemptComment()} text={"Submit"}></Button>
                                <Button float="left" onClick={e => setAddComment(false)} text={"Cancel"}></Button>
                            </div>
                            ) : (
                            <div>
                                <Button float="left" onClick={e => setAddComment(true)} text={"Add Comment"}></Button>
                            </div>
                            )
                        }
                        </PostActions>
                    )}
                    {(showAlert && addComment) && (
                        <Alert id="shown_alert" text={alertMessage}></Alert>
                    )}
                    <PostComments>
                        {comments?.length > 0 ? 
                            comments.map(comment => {
                                return <Comment key={comment.id} deleteCallback={deleteCallback} hasAccess={hasAccess} comment={comment}></Comment>;
                            })
                         : "No comments yet."}
                    </PostComments>
                </PostContent>
            ) : "Loading..."}
        </PostPage>
    )
}

export default ViewPost
