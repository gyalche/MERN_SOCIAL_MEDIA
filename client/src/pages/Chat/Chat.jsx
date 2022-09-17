import React, { useEffect, useState } from 'react';
import './chat.css';
import LogoSearch from '../../components/LogoSearch/LogoSearch';
import { useSelector } from 'react-redux';
import { userChats } from '../../api/chatRequest';
import Conversation from '../../components/Conversation/Conversation';
import { Link } from 'react-router-dom';
import Home from '../../img/home.png';
import Noti from '../../img/noti.png';
import { UilSetting } from '@iconscout/react-unicons';
import Comment from '../../img/comment.png';
import ChatBox from '../../components/ChatBox/ChatBox';

const Chat = () => {
  const [chats, setChats] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);
  const [currentChat, setCurrentChat] = useState(null);
  useEffect(() => {
    const getChats = async () => {
      try {
        const data = await userChats(user._id);
        setChats(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user]);
  return (
    <div className='Chat'>
      {/*left side */}
      <div className='Left-side-chat'>
        <LogoSearch />
        <div className='Chat-container'>
          <h2>Chat</h2>
          <div className='Chat-list'>
            {chats.map((chat) => (
              <div>
                {' '}
                onClick={() => setCurrentChat(chat)}
                <Conversation data={chat} currentUserId={user._id} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='Right-side-chat'>
        <div style={{ width: '20rem', alignSelf: 'flex-end' }}>
          <div className='navIcons'>
            <Link to='/home'>
              <img src={Home} alt='' />
            </Link>
            <UilSetting />
            <img src={Noti} alt='' />
            <Link to='../chat'>
              <img src={Comment} alt='' />
            </Link>
          </div>

          {/* chat body */}
        </div>
        <ChatBox chat={currentChat} currentUser={user._id} />
      </div>
    </div>
  );
};

export default Chat;
