import { Avatar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import React, { useEffect, useState } from 'react';
import './Chat.css';
import { auth, db } from './firebase';
import ChatRow from './ChatRow';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './features/appSlice';
import { useHistory } from 'react-router';
import { resetCameraImage } from './features/cameraSlice';

function Chat() {

    document.title = "Snapchat Clone | Chats";
    const [posts, setPosts] = useState([]);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const history = useHistory();

    const takeSnap = () =>{
        dispatch(resetCameraImage());
        history.push("/");
    }

    useEffect(() =>{
        db.collection("posts").orderBy("timestamp", "desc").onSnapshot((snapshot) => setPosts(snapshot.docs.map((doc)=>({
            id: doc.id,
            data: doc.data(),
        }))));
    }, []);

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={user?.profilePic} onClick={()=> auth.signOut()}  className="chat__avatar"/>
                <div className="chat__search">
                    <SearchIcon className="chat__searchIcon"/>
                    <input type="text" placeholder="Friends" />
                </div>
                <ChatBubbleIcon className="chat__chatIcon" />
            </div>

            <div className="chat__posts">
                {
                    posts.map(({ id, data:{profilePic, username, timestamp, imageUrl, read} }) =>(
                        <ChatRow
                            key={id}
                            id={id}
                            username={username}
                            timestamp={timestamp}
                            imageUrl={imageUrl}
                            read={read}
                            profilePic={profilePic}
                        />
                    ))
                }
            </div>

            <RadioButtonUncheckedIcon
                className="chat__takePicIcon"
                onClick={takeSnap}
                fontSize="large"
            />
        </div>
    )
}

export default Chat;
