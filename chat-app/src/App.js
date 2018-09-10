import React from 'react';
import MessageList from './components/MessageList.js';
import SendMessageForm from './components/SendMessageForm.js';
import RoomList from './components/RoomList.js';
import NewRoomForm from './components/NewRoomForm.js';

class App extends React.Component {
  render() {
        return (
            <div className="app">
                <RoomList />
                <MessageList />
                <SendMessageForm />
                <NewRoomForm />
            </div>
        );
    }
}

export {App};
