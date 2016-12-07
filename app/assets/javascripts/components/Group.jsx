let GroupCharacterList = React.createClass({
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

let GroupMessageList = React.createClass({
  propTypes: {
    messages: React.PropTypes.array,
    loading: React.PropTypes.object
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
        <div className="loading-container">
          {this.props.loading}
        </div>
        {messageListing}
      </div>
    );
  }
});

let Group = React.createClass({
  propTypes: {
    id: React.PropTypes.number,
    initialCharacters: React.PropTypes.array,
    initialMessages: React.PropTypes.array,
    in_group: React.PropTypes.bool,
    older_messages_url: React.PropTypes.string,
    current_user_id: React.PropTypes.number
  },

  getInitialState() {
    return {
      characters: this.props.initialCharacters,
      messages: this.props.initialMessages,
      scrollOnUpdate: true,
      loadingOlderMessages: false,
      noMoreMessages: false
    }
  },

  receivedMessage(message) {
    this.setState({
      messages: this.state.messages.concat([message])
    });

    if(message.user.id === this.props.current_user_id)
      this.scrollToBottom();
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

  loadOlderMessages() {
    if(this.state.noMoreMessages)
      return;

    this.setState({
      loadingOlderMessages: true
    });

    $.ajax({
      type: 'GET',
      data: { older_time: this.state.messages[0].created_at },
      url: this.props.older_messages_url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        if(data.length) {
          let beforeHeight = this.messagesNode.scrollHeight;
          let beforeScroll = this.messagesNode.scrollTop;

          this.setState({
            messages: data.concat(this.state.messages)
          });

          this.messagesNode.scrollTop = this.messagesNode.scrollHeight - beforeHeight + beforeScroll;
        } else {
          this.setState({
            noMoreMessages: true
          });
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this),
      complete: function(){
        this.setState({
          loadingOlderMessages: false
        });
      }.bind(this)
    });
  },

  handleScroll(e) {
    this.setState({scrollOnUpdate: e.target.scrollTop == (e.target.scrollHeight - e.target.offsetHeight)})

    if(e.target.scrollTop == 0 && !this.state.loadingOlderMessages) {
      this.loadOlderMessages();
    }
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
    let form, loadingBar;

    if(this.props.in_group){
      form = this.renderForm();
    }

    if(this.state.loadingOlderMessages){
      loadingBar = (
          <div className="loading"></div>
      );
    }

    return (
      <div className="group-container">
        <GroupCharacterList characters={this.state.characters} />
        <GroupMessageList messages={this.state.messages} loading={loadingBar} ref="messages"/>
        {form}
      </div>
    );
  }
});
