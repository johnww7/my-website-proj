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
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    };

    this.sendMessage = this.sendMessage.bind(this);
    this.subscribeToRoom = this.subscribeToRoom.bind(this);
    this.getRooms = this.getRooms.bind(this);
  }

  componentDidMount() {
    const chatManager = new ChatManager({
      instanceLocator,
      userId: 'niteman',
      tokenProvider: new TokenProvider({
        url: tokenUrl
      })
    });

    chatManager.connect().then(currentUser => {
      this.currentUser = currentUser
      this.getRooms();
    }).catch(
      err => console.log('error on connecting: ', err)
    );

  }

  getRooms() {
    this.currentUser.getJoinableRooms().then(
      joinableRooms => {
          this.setState({
            joinableRooms,
            joinedRooms: this.currentUser.rooms,
          });
    }).catch(
        err => console.log('error on joinableRooms: ', err)
    );
  }

  subscribeToRoom(roomId) {
    this.setState({ messages: [] });
    this.currentUser.subscribeToRoom({
      roomId: roomId,
      hooks: {
        onNewMessage: message => {
          console.log('message.text', message.text);
          this.setState({
            messages: [...this.state.messages, message]
          });
        }
      }
    }).then( room => {
      this.setState({
        roomId: room.id
      });
        this.getRooms();
    }).catch(err => console.log('error on subscribing to room: ', err));

  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    });
  }

  render() {
    //console.log('this.state.messages: ', this.state.messages);
        return (
            <div className="app">
                <RoomList
                  roomId={this.state.roomId} 
                  subscribeToRoom={this.subscribeToRoom}
                  rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}/>
                <MessageList messages={this.state.messages}/>
                <SendMessageForm sendMessage={this.sendMessage}/>
                <NewRoomForm />
            </div>
        );
    }
}

export {App};
