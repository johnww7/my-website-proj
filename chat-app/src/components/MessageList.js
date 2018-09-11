import React from 'react';
import Message from './Message.js'

/*const DUMMY_DATA = [
  {
    senderId: 'william',
    text: 'Hey how are you?'
  },
  {
    senderId: 'brian',
    text: 'Great and you?'
  },
  {
    senderId: 'william',
    text: 'Good to hear! I am doing well too.'
  },
];*/

export default class MessageList extends React.Component {
  render() {
    return (
      <div className="message-list">
        {
          this.props.messages.map((message, index) => {
            return (
              <Message key={index} username={message.senderId} text={message.text}/>
              
            )
          })
        }
      </div>
    );
  }
}

//export {MessageList};
