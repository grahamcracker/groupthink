$(document).on('turbolinks:load', function() {
  var messages = $("#messages");
  var group_id = $("#messages").data("group-id");

  App.group = App.cable.subscriptions.create({
    channel: "GroupChannel",
    group_id: group_id
  }, {
    connected: function() {
      // Called when the subscription is ready for use on the server
    },

    disconnected: function() {
      // Called when the subscription has been terminated by the server
    },

    received: function(data) {
      // Called when there's incoming data on the websocket for this channel
      $("#messages").append(data['message'])
    },

    speak: function(message) {
      return this.perform('speak', {message: message, group_id: group_id});
    }
  });

  $(document).on('keypress', '[data-behavior~=group-speak]', function(e){
    var body = e.target.value;

    if(e.keyCode == 13) {
      if(body != "") {
        App.group.speak(body);
        e.target.value = "";
      }  
      e.preventDefault();
    }
  });

});
