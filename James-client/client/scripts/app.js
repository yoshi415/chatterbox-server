
var app = {

  server: 'http://127.0.0.1:3000',

  init: function() {
    var newFetch = app.fetch.bind(this);
    // setInterval(function() {
    //   app.clearMessages();
    //   app.fetch()}, 5000);

  },

  send: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
        app.fetch();
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });   
  },

  fetch: function(){
    $.ajax({
      url: app.server, 
      // Why is this unneccesary? 
      type: 'GET',
      // data: (--app.createdAt),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message retrieved');
        //console.log(data.results);
        app.clearMessages();
        _.each(data.results, function(value){
          //console.log(value)
          app.addMessage(value)
        })
        // var $username = 
        // var $text = 
        // var $roomname = 
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to retrieve message');
      }
    });
  },

  clearMessages: function(){
    $('.chats').html('');
  },

  escapeHTML: function(str){
    if (str === undefined) {
      return '';
    }
    if (str === null){
      return '';
    }
    return str.replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
  },

  addMessage: function(message) {
    //console.log(message.objectId)
    var $roomname = ('<p class=roomname>' +"Room Name: " + app.escapeHTML(message.roomname) + '</p>');   
    var $username = ('<span class=username>' + app.escapeHTML(message.username) + '</span>')
    var $text = ('<span class=text>' + app.escapeHTML(message.text) + '</span>');
    $($username).on('click', function(){console.log('hey')})
    $('.chats').append('<div class=message>' + $username +":"+ $text + $roomname +'</div>');

  },

  addRoom: function(roomname) {
    $('#roomSelect').append('<p>'+roomname+'</p>');
  },

  addFriend: function(friend) {
    //function() {$(this).addClass('friends')}
    var $friend = ('<li class ="friend">' + app.escapeHTML(friend ) + '</li>')
    $('.friends').append($friend);
  },
};



$(document).ready(function() {
  app.init();
  console.log("everything loaded");
  $('.chats').on('click', ".username", function() {
    var $frnd = $(this).text()
    app.addFriend($frnd);
  })

  $('#submitText').on('click', function(){
    var $value = $('#textfield').val();
    $('#textfield').val('');
    var message = {
      username: 'HELLO ITS ME',
      text: $value,
      roomname: '4chan'
    }

    app.send(message);
    console.log($value);
  });

});
