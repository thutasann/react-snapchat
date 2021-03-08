import React from 'react';
import './ChatRow.css';
import { Avatar } from '@material-ui/core';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import ReactTimeago from 'react-timeago';
import { useDispatch } from 'react-redux';
import { selectImage } from './features/appSlice';
import { db } from './firebase';
import { useHistory } from 'react-router';

function ChatRow({ id, username, timestamp, imageUrl, read, profilePic }) {

    const dispatch = useDispatch();
    const history = useHistory();

    const open = () =>{
        if(!read){
            dispatch(selectImage(imageUrl));
            db.collection('posts').doc(id).set(
                {
                    read: true
                }, 
                { 
                    merge: true 
                }
            );

            history.push("/chats/view");


        }
    }

    return (
        <div onClick={open} className="chatRow">
            <Avatar className="chatRow__avatar" src={profilePic} />
            <div className="chatRow__info">
                <h4>{username}</h4>
                <p>{!read && "Tap to view -"} {" "}
                <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} /> </p>
            </div>

            {!read && <StopRoundedIcon className="chatRow__readIcon" />}
        </div>
    )
}

export default ChatRow;
