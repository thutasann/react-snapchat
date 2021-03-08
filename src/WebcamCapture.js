import React, { useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import './WebcamCapture.css';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { useDispatch } from 'react-redux';
import { setCameraImage } from './features/cameraSlice';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';


const videoConstraints = {
    width: 250,
    height: 400,
    facingMode: "user",
};


function WebcamCapture() {

    document.title = "Snapchat Clone";
    
    const webcamRef = useRef(null);
    const dispatch = useDispatch();
    const history = useHistory();

    const capture = useCallback(() =>{
        const imageSrc = webcamRef.current.getScreenshot();
        dispatch(setCameraImage(imageSrc));
        history.push("/preview");

    }, [webcamRef]);

    return (
        <div className="webcamCapture">

           

            <Webcam
                audio={false}
                height={videoConstraints.height}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={videoConstraints.width}
                videoConstraints={videoConstraints}
                mirrored
            />

            <RadioButtonUncheckedIcon
                className="webcamCapture__button"
                onClick={capture}
                fontSize="large"
            />

            <Link to="/chats">
                <ChatBubbleIcon className="chat__icon"/>
            </Link>


        </div>
    )
}

export default WebcamCapture;
