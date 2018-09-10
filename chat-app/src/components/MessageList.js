import React from 'react';

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
          DUMMY_DATA.map((message, index) => {
            return (
              <div key={index} className="message">
                <div className="message-username">{message.senderId}</div>
                <div className="message-text">{message.text}</div>
              </div>
            )
          })
        }
      </div>
    );
  }
}

//export {MessageList};
