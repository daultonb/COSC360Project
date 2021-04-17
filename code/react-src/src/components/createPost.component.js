import React, { useState, useRef } from 'react';
import styled from "@emotion/styled";
import { useStoreActions, useStoreState } from "easy-peasy";

import Button from './style-components/button.component';
import Popup from './style-components/Popup.component';
import Alert from './style-components/alert.component';

const PageDiv = styled.div`
    border: 3px solid #f1f1f1;
    margin: 0 auto;
    background-color: White;
    color: black;
    padding: 4vh;
    width: 50%;
`;

const PageContent = styled.div`
    margin-top: 10vh; 
`;

const Header1 = styled.h1`
    font-weight: bold;
    text-align: center;
    color:white;  
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

const Paragraph = styled.p`
    font-weight: bold;
    color: black;
`;

const GenreSelect = styled.select`
    display: inline-block;
    width: 100%;
    margin: 8px 0;
    border-radius: 5px;
    padding: 12px 20px;
`;


function CreatePost() {

  // Handles Popup Window state
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const [postTitle, setPostTitle] = useState('');
  const [postDesc, setPostDesc] = useState('');
  const [postGenre, setPostGenre] = useState('generic');
  const [currentUpload, setCurrentUpload] = useState();

  const savePost = useStoreActions((actions) => actions.savePost);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const genres = useStoreState((state) => state.genreList);

  const topRef = useRef();

  function jumpFunction() {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  const accountData = JSON.parse(localStorage.getItem('account')).account;
  const username = accountData.username;

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


  function insertData() {
    jumpFunction();
    if (!postTitle) {
      setShowAlert(true);
      setAlertMessage("Posts need a title!")
      return;
    } 
    if (!postDesc) {
      setShowAlert(true);
      setAlertMessage("Posts need a description!")
      return;
    }
    if (!postGenre) {
      setShowAlert(true);
      setAlertMessage("Posts need a genre.")
      return;
    }
    console.log("uploading:", currentUpload)
    savePost({
      title: postTitle,
      description: postDesc,
      file: currentUpload,
      username: username,
      genre: postGenre,
    });
    setShowAlert(true);
    setAlertMessage("Your post was successfully created!")
    setPostTitle('');
    setPostDesc('');
    setPostGenre('');
    setCurrentUpload(null);
    jumpFunction();
  }


  return (

    <PageContent ref={topRef}>
      {showAlert && (
        <Alert id="shown_alert" text={alertMessage}></Alert>
      )}
      <Header1>New Post</Header1>
      <PageDiv>
        <div>
          <Paragraph>Title</Paragraph>
          <InputField key="posttitle" type="text" id="title" value={postTitle} onChange={e => setPostTitle(e.target.value)} placeholder="Enter Title" required></InputField>
          <Paragraph>Description</Paragraph>
          <DescriptionInput key="postdesc" type="text" id="desc" value={postDesc} onChange={e => setPostDesc(e.target.value)} placeholder="Enter Description" required></DescriptionInput>
          <Paragraph>Add An Image or Video</Paragraph>
          <input type="file" id="file" accept="image/*, video/*" onChange={e => handleChooseFile(e.target.files[0])}></input>
          <Paragraph>Genre</Paragraph>
          <GenreSelect key="genreselect" value={postGenre} onChange={e => setPostGenre(e.target.value)}>
            {genres && genres.map(genre => {
              return (
                <option key={genre.key} value={genre.key}>{genre.name}</option>
              )
            })}
          </GenreSelect>
          <Button type={"submit"} text={"Create Post"} onClick={() => insertData()} width={"100%"} />
          <Button type={"submit"} text={"Preview Post"} onClick={togglePopup} width={"100%"} />
        </div>

      </PageDiv>
      {isOpen && <Popup
        content={<>
          <b>{postTitle}</b>
          <p>{postDesc}</p>
          {currentUpload.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0]?.indexOf("image") ? <video src={currentUpload} controls width="30%"></video> : <img src={currentUpload} width="30%"></img>}
          <p>Your post will be made in the {genres.find(genre => genre.key === postGenre).name} genre.</p>
        </>}
        handleClose={togglePopup}
      />}
    </PageContent>
  );
}

export default CreatePost;
