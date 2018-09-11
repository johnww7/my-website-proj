import React from 'react';
import {Chatkit, ChatManager, TokenProvider} from '@pusher/chatkit';
import MessageList from './components/MessageList.js';
import SendMessageForm from './components/SendMessageForm.js';
import RoomList from './components/RoomList.js';
import NewRoomForm from './components/NewRoomForm.js';

import './index.css';

import { tokenUrl, instanceLocator } from './config.js';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    const chatManager = new ChatManager({
      instanceLocator,
      userId: 'johnww7',
      tokenProvider: new TokenProvider({
        url: tokenUrl
      })
    });

    chatManager.connect().then(currentUser => {
      currentUser.subscribeToRoom({
        roomId: 15873994,
        hooks: {
          onNewMessage: message => {
            console.log('message.text', message.text);
            this.setState({
              messages: [...this.state.messages, message]
            });
          }
        }
      })
    });
  }

  render() {
    //console.log('this.state.messages: ', this.state.messages);
        return (
            <div className="app">
                <RoomList />
                <MessageList messages={this.state.messages}/>
                <SendMessageForm />
                <NewRoomForm />
            </div>
        );
    }
}

export {App};
