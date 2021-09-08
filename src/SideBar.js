import React, {useEffect, useState} from 'react'
import './SideBar.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SidebarChannel from './SidebarChannel';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import CallIcon from '@material-ui/icons/Call';
import MicIcon from '@material-ui/icons/Mic';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HeadsetMicIcon from '@material-ui/icons/HeadsetMic';
import InfoIcon from '@material-ui/icons/Info';
import { Avatar } from '@material-ui/core';
import db, {auth} from './firebase'
import {useSelector} from 'react-redux';
import {selectUser} from './features/userSlice'

function SideBar() {
    const user = useSelector(selectUser);
    const [channels, setChannels] = useState([])

    useEffect(() => {
        db.collection('channels').onSnapshot(snapshot => (
            setChannels(snapshot.docs.map(doc => ({
                id: doc.id,
                channel: doc.data(),
            })))
        ))
    }, [])

    const handleAddChannel = () => {
        const channelName = prompt("Enter a new channel name.")

        if(channelName){
            db.collection('channels').add({
                channelName: channelName,
            })
        }
    }

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <h3>Clever Programmer </h3>
                <ExpandMoreIcon/>
            </div>
            
            <div className="sidebar__channels">
                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                        <ExpandMoreIcon/>
                        <h4>Text Channels</h4>
                    </div>
                    <AddIcon onClick={handleAddChannel} className="sidebar__addChannel"/>
                </div>
                <div className="sidebar__channelsList">
                    {channels.map(channel => (
                        <SidebarChannel key={channel.id} id = {channel.id} channelName={channel.channel.channelName} />
                    ))}
                </div>
            </div>


        
            <div className="sidebar__voice"> 
                <SignalCellularAltIcon
                    className="sidebar__voiceIcon"
                    fontSize="large"
                />
                <div className="sidebar__voiceInfo">
                    <h3>Voice Connected</h3>
                    <p>Stream</p>
                </div>

                <div className="sidebar__voiceIcons">
                    <InfoIcon/>
                    <CallIcon/>
                </div>
            </div>

            <div className="sidebar__profile">
                
                <Avatar src={user.photo}/>
                
                <div className="sidebar__profileInfo">
                    <h3>{user.displayName}</h3>
                    <p>#{user.displayName}134</p>
                </div>

                <div className="sidebar__profileIcon">
                    <ExitToAppIcon onClick={()=> auth.signOut()} className="logout__button"/>
                    <MicIcon/>
                    <HeadsetMicIcon/>
                </div>
            </div>
        </div>
    )
}

export default SideBar
