var GroupCharacterList = React.createClass({
  propTypes: {
    characters: React.PropTypes.array
  },

  renderCharacter(character) {
    return (
      <span className="tag tag-pill tag-default" key={character.id}>
        {character.name}
      </span>
    );
  },

  render() {
    let characterListing;
    if(this.props.characters.length > 0) {
      characterListing = this.props.characters.map(this.renderCharacter);
    } else {
      characterListing = <span>No members yet!</span>;
    }

    return (
      <div className="character-list">
        Members:
        {characterListing}
      </div>
    );
  }
});

var GroupMessageList = React.createClass({
  propTypes: {
    messages: React.PropTypes.array
  },

  renderMessage(message) {
    return (
      <div className="message" key={message.id}>
        <strong>{message.character.name}</strong>:
        <span> {message.body}</span>
      </div>
    );
  },

  render() {

    let messageListing;
    if(this.props.messages.length > 0) {
      messageListing = this.props.messages.map(this.renderMessage);
    } else {
      messageListing = <div>No messages yet!</div>;
    }

    return (
      <div className="messages">
        {messageListing}
      </div>
    );
  }
});

var Group = React.createClass({
  propTypes: {
    id: React.PropTypes.number,
    initialCharacters: React.PropTypes.array,
    initialMessages: React.PropTypes.array,
    in_group: React.PropTypes.bool
  },

  getInitialState() {
    return {
      characters: this.props.initialCharacters,
      messages: this.props.initialMessages,
      scrollOnUpdate: true
    }
  },

  receivedMessage(message) {
    this.setState({
      messages: this.state.messages.concat([message])
    });
  },

  subscribe() {
    let receivedMessage = this.receivedMessage;
    App.group = App.cable.subscriptions.create({
      channel: "GroupChannel",
      group_id: this.props.id
    }, {
      connected() {},
      disconnected() {},
      received(data) {
        receivedMessage(data['message']);
      },
      speak(message, group_id) {
        return this.perform('speak', {message: message, group_id: group_id});
      }
    });
  },

  scrollToBottom() {
    this.messagesNode.scrollTop = this.messagesNode.scrollHeight;
  },

  handleScroll(e) {
    this.setState({scrollOnUpdate: e.target.scrollTop == (e.target.scrollHeight - e.target.offsetHeight)})
  },

  componentDidMount() {
    this.subscribe();

    this.messagesNode = ReactDOM.findDOMNode(this.refs.messages);
    this.scrollToBottom();
    this.messagesNode.addEventListener('scroll', this.handleScroll);
  },

  componentWillUnmount() {
    this.messagesNode.removeEventListener('scroll', this.handleScroll);
  },

  componentDidUpdate(){
    if(this.state.scrollOnUpdate) {
      this.scrollToBottom();
    }
  },

  formKeyPressed(e) {
    let body = e.target.value;

    if(e.key == "Enter") {
      e.preventDefault();

      if(body != "") {
        App.group.speak(body, this.props.id);
        e.target.value = "";
      }
    }
  },

  renderForm() {
    return (
      <form>
        <input type="text" className="form-control" autoFocus onKeyPress={this.formKeyPressed}/>
      </form>
    )
  },

  render() {
    let form;
    if(this.props.in_group) {
      form = this.renderForm();
    }

    return (
      <div className="group-container">
        <GroupCharacterList characters={this.state.characters} />
        <GroupMessageList messages={this.state.messages} ref="messages"/>
        {form}
      </div>
    );
  }
});
