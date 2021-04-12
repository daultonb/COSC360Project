import React, { useState, useEffect } from 'react';
import styled from "@emotion/styled";
import Popup from './Popup.component';


import { useStoreActions, useStoreState } from "easy-peasy";

function CreatePost() {

  // Handles Popup Window state
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const savePost = useStoreActions((actions) => actions.savePost);
  const fetchPosts = useStoreActions((actions) => actions.fetchPosts);
  const posts = useStoreState((state) => state.posts);

  useEffect(() => {
    fetchPosts();
  }, []);

  //Check login.
  if (!localStorage.getItem('account')) {
    return (
      <div><br></br>You must be logged in to create posts.</div>
    )
  }

  const accountData = JSON.parse(localStorage.getItem('account')).account;
  const username = accountData.username;

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

  const FORM = styled.form`
    
  `;

  var currentUpload;
  var fileReader;

  const readFile = (e) => {
    const content = fileReader.result;
    currentUpload = content;
  }

  const handleChooseFile = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = readFile;
    fileReader.readAsDataURL(file);
  }

  function getDescription() {
    return document.getElementById("desc").value;
  }

  function getTitle() {
    return document.getElementById("title").value;
  }

  function insertData() {
    var title = getTitle();
    var desc = getDescription();
    
    if(title === ""){
      alert("Posts need a title!");
      return;
    }else if(desc === ""){
      alert("Posts need a description!");
      return;
    }

    savePost({
      title: title,
      description: desc,
      file: currentUpload,
      username: username,
    });  
    alert("Your post was successfully created!");
  }

  
  return (
    
    <div>
      <Header1>Create Post</Header1>
      <PageDiv>
        {posts && (
          <div>
            <Paragraph>Title</Paragraph>    
            <InputField type="text" id="title" placeholder="Enter Title" required></InputField>
            <Paragraph>Description</Paragraph>
            <DescriptionInput type="text" id="desc" placeholder="Enter Description" required></DescriptionInput>
            <Paragraph>Add An Image or Video</Paragraph>
            <input type="file" id="file" accept="image/*, video/*" onChange={e => handleChooseFile(e.target.files[0])}></input>
                  
            <Button type="submit" value="Create Post" onClick={() => insertData()}></Button>
            <Button type="submit" value="Preview Post" onClick={togglePopup}></Button>
          </div>
          
        )}
        
        
      </PageDiv>
      {isOpen && <Popup
      content={<>
        <b>{getTitle()}</b>
        <p>{getDescription()}</p>
      </>}
      handleClose={togglePopup}
    />}
    </div>
  );
}

export default CreatePost;
