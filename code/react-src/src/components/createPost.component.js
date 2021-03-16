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
    background-color: #2b2b2b;
    height: 100vh;
    padding-top: 2vh;
  `;

  const header1 = styled.h1`
    padding: 100px;
    margin: 100px;
  `;

  const InputField = styled.input`
    margin: 5em;
    border-radius: 5px;
  `;

  const SaveButton = styled.button`
    margin: 5px;
    border-radius: 5px;
    padding: 10px;
  `;

  const Paragraph = styled.p`
    font-weight: bold;
    color: black;
  `;

  function fillData() {
    var title = document.getElementById("title").value;
    var desc = document.getElementById("desc").value;

    savePost({
      title: title,
      description: desc,
      username: "ross",
      
    });
  }

  return (
    <PageDiv>
      {posts && (
        <div>
          <h1>Create Post</h1>
          <Paragraph>Title</Paragraph>
          <InputField
            type="text"
            id="title"
            placeholder="Enter Title"
          ></InputField>

          <Paragraph>Description</Paragraph>
          <InputField
            type="text"
            id="desc"
            placeholder="Enter Description"
          ></InputField>
        </div>
      )}

      <SaveButton type="buttom" onClick={() => fillData()} />
    </PageDiv>
  );
}

export default CreatePost;
