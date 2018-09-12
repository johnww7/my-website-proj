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
      joinableRooms: [],
      joinedRooms: []
    };

    this.sendMessage = this.sendMessage.bind(this);
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
      this.currentUser = currentUser

      this.currentUser.getJoinableRooms().then(
        joinableRooms => {
            this.setState({
              joinableRooms,
              joinedRooms: this.currentUser.rooms,
            });
        }).catch(
          err => console.log('error on joinableRooms: ', err)
        );

      this.currentUser.subscribeToRoom({
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
    }).catch(
      err => console.log('error on connecting: ', err)
    );

  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: 15873994
    });
  }

  render() {
    //console.log('this.state.messages: ', this.state.messages);
        return (
            <div className="app">
                <RoomList rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}/>
                <MessageList messages={this.state.messages}/>
                <SendMessageForm sendMessage={this.sendMessage}/>
                <NewRoomForm />
            </div>
        );
    }
}

export {App};
