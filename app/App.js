import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
} from 'react-native';

export default class App extends Component {
  state = {
    chatMessage: 'hi',
    chatMessages: [
      'hello',
      'world',
    ],
  };

  constructor(props) {
    super(props);

    this.sendChatMessage = this.sendChatMessage.bind(this);

    this.ws = new WebSocket('ws://localhost:8080', 'funtocol');

    this.ws.addEventListener('error', (err) => {
      console.error('error with websocket:', err);
    });

    this.ws.addEventListener('open', () => {
      console.log('i opened the connection', this.ws.protocol);
    });

    this.ws.addEventListener('close', () => {
      console.log('i closed the connection', this.ws.protocol);
    });
  }

  componentDidMount() {
    this.ws.addEventListener('message', (message) => {
      console.log('i got a message', message.data);

      this.setState((state) => {
        const chatMessages = state.chatMessages.concat(message.data);
        console.log('will set this', chatMessages);

        return {
          chatMessages
        };
      });
    });
  }

  sendChatMessage() {
    console.log('sending message', this.state.chatMessage);
    this.ws.send(this.state.chatMessage);
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.welcome}>Messages</Text>

          <View>
            {this.state.chatMessages.map(chatMessage => (
              <Text key={chatMessage}>{chatMessage}</Text>
            ))}
          </View>
        </View>

        <View style={styles.chatMessageForm}>
          <TextInput
            style={styles.chatMessageFormInput}
            onChangeText={chatMessage => this.setState({ chatMessage })}
            value={this.state.chatMessage}
            onSubmitEditing={this.sendChatMessage}
          />
          <Button
            onPress={this.sendChatMessage}
            title="Send Chat Message"
            color="#841584"
            accessibilityLabel="Send the typed chat message"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  chatMessageForm: {
    borderTopColor: 'black',
    borderTopWidth: 1,
    padding: 10,
    width: '100%'
  },
  chatMessageFormInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8
  },
});
