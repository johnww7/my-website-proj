import React from 'react';
import ReactDOM from 'react-dom';
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

  componentWillUpdate() {
    const node = ReactDOM.findDOMNode(this);
    this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight;
  }

  componentDidUpdate() {
    if(this.shouldScrollToBOttom) {
      const node = ReactDOM.findDOMNode(this);
      node.scrollTop = node.scrollHeight;
    }
  }

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
