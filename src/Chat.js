import React, {useState, useEffect} from 'react'
import './Chat.css'
import ChatHeader from './ChatHeader'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Message from './Message';
import { selectChannelId, selectChannelName } from './features/appSlice';
import { selectUser } from './features/userSlice';
import {useSelector} from 'react-redux';
import db from './firebase';
import firebase from 'firebase'

function Chat() {
    const user = useSelector(selectUser)
    const channelId = useSelector(selectChannelId)
    const channelName = useSelector(selectChannelName)
    const [input, setinput] = useState("")
    const [messages, setmessages] = useState([])


    useEffect(() => {

        if(channelId){
            db.collection('channels').doc(channelId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot =>
                setmessages(snapshot.docs.map(doc => doc.data()))   
           )
        }
    }, [channelId])

    const sendMessage = e => {
        e.preventDefault();
        db.collection('channels').doc(channelId).collection('messages').add(
            {
                message: input,
                user: user,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }
        )

        setinput("");
    }

    return (
        <div className="chat">
            <ChatHeader channelName={channelName}/>

            <div className="chat_messages">
                {messages.map((message) => (
                    <Message timestamp={message.timestamp} user={message.user} message={message.message}/>
                ))}
            </div>

            <div className="chat__input">
                <AddCircleIcon fontSize="large"/>
                <form>
                    <input disabled={!channelId} value={input} onChange={e => setinput(e.target.value)} placeholder={`Message #${channelName}`}/>
                    <button onClick={sendMessage} disabled={!channelId} type="submit" className="chat__inputButton">Send Message</button>
                </form>

                <div className="chat__InputIcons">
                    <GifIcon fontSize="large"/>
                    <EmojiEmotionsIcon fontSize="large"/>
                    <CardGiftcardIcon fontSize="large"/>
                </div>
            </div>
        </div>
    )
}

export default Chat
