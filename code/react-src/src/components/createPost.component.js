import React, { useEffect } from "react";
import styled from "@emotion/styled";

import { useStoreActions, useStoreState } from "easy-peasy";

function CreatePost() {
  const savePost = useStoreActions((actions) => actions.savePost);
  const fetchPosts = useStoreActions((actions) => actions.fetchPosts);
  const posts = useStoreState((state) => state.posts);

  useEffect(() => {
    fetchPosts();
  }, []);

  const PageDiv = styled.div`
    border: 3px solid #f1f1f1;
    margin: 0 auto;
    background-color: White;
    color: black;
    padding: 50px;
    width: 400px;
  `;

  const Header1 = styled.h1`
    font-weight: bold;
    text-align: center;
    color:black;  
    margin-top: 10vh;  
  `;

  const DescriptionInput = styled.textarea`
    display: inline-block;
    padding: 12px 20px;
    margin: 8px 0;
    width: 90%;
    height: 200px;
    border-radius:5px;
    resize: vertical;
  `;

  const InputField = styled.input`
    display: inline-block;
    padding: 12px 20px;
    margin: 8px 0;
    width: 90%;
    border-radius:5px;
  `;

  const Button = styled.input`
    background-color: grey;
    color: white;
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    &:hover {
        opacity: 0.7;
    }
  `;

  const Paragraph = styled.p`
    font-weight: bold;
    color: black;
  `;

  var upload;

  var loadFile = function(event) {
    upload = document.getElementById('file');
    upload.src = URL.createObjectURL(event.target.files[0]);
  }

  

  function fillData() {
    var title = document.getElementById("title").value;
    var desc = document.getElementById("desc").value;
    
    savePost({
      title: title,
      description: desc,
      file: upload.src,
      username: "ross",
      
    });
  }

  return (
    <div>
      <Header1>Create Post</Header1>
      <PageDiv>
        {posts && (
          <div>
            <Paragraph>Title</Paragraph>
            <InputField type="text" id="title" placeholder="Enter Title"></InputField>

            <Paragraph>Description</Paragraph>
            <DescriptionInput type="text" id="desc" placeholder="Enter Description"></DescriptionInput>
            <Paragraph>Add An Image or Video</Paragraph>
            <input type="file" id="file" accept="image/*, video/*"></input>
            
          </div>
        )}
        <div>
          <Button type="submit" value="Create Post" onClick={() => fillData()}></Button>
          <Button type="submit" value="Preview Post"></Button>
        </div>
      </PageDiv>
    </div>
  );
}

export default CreatePost;
