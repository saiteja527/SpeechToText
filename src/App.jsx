import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import {useState} from "react";
import "./App.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import image from "./assets/speechText-img.png";

const App = () => {
    const [textToCopy, setTextToCopy] = useState();
    const [isCopied, setCopied] = useClipboard(textToCopy, {
        successDuration:1000
    });

    const {resetTranscript, transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    const stopListening = () => {
        SpeechRecognition.stopListening();
        setTextToCopy(transcript)
    };
    
    if (!browserSupportsSpeechRecognition) {
        return null
    }

    return (
      <div className="speech">
        <div className="container">
          <img src={image} alt="" className='image'/>
          <br />
          <p>
            A Speech-to-Text Converter transcribes spoken words into written
            text using speech recognition technology.
          </p>

          <div
            className="main-content"
            onClick={() => setTextToCopy(transcript)}
          >
            {transcript}
          </div>

          <div className="btn-style">
            <button onClick={setCopied}><FontAwesomeIcon icon={faClipboard} />{isCopied ? "Copied!" : "Copy to clipboard"}</button>
            <button onClick={startListening}><FontAwesomeIcon icon={faMicrophone} />Start</button>
            <button onClick={stopListening}><FontAwesomeIcon icon={faMicrophoneSlash} />Stop</button>
            <button onClick={resetTranscript}><FontAwesomeIcon icon={faRedo} className='fa-redo'/>Reset</button>
          </div>
        </div>
      </div>
    );
};

export default App;