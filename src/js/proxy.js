(function (window, undefiend) {

  var socket;
  var playerStatus;
  var events = window.events;
  var cookie = window.cookie;

  var CMD_MAP = {
    //设置session cookie
    setcookie: function (args) {
      var key = '_io_sid_';
      var value = args;

      setSessionCookie(key, value);
    },
    setstatus: function (status) {
      playerStatus = status;
      switch (status) {
        case GC.PLAYER_STATE.CONNECTED:
          events.emit('player.conected');
          break;
        case GC.PLAYER_STATE.WAITING:
          events.emit('player.waiting');
          break;
        case  GC.PLAYER_STATE.OFFLINE:
          socket.disconnect();
          socket = null;
          this.setcookie('');
          events.emit('player.offline');
          break;
        case  GC.PLAYER_STATE.ABANDONED:
          socket.disconnect();
          socket = null;
          this.setcookie('');
          events.emit('player.abandoned');
          break;
      }
    }
  };

  function setSessionCookie(key, value) {
    var options = {
      expires: 'Session',
      domain: location.host
    };

    cookie.set(key, value, options);
  }

  function connectServer() {
    var url = 'http://192.168.1.108:8093/?' + (cookie.has('_io_sid_') ? 'c=' + cookie.get('_io_sid_') : '');
    //var socket = io();
    socket = io.connect(url, {
      //'reconnect': false,
      'connect timeout': 8000
      , 'sync disconnect on unload': true
    });

    bindEvents();
  }

  function bindEvents() {
    //收到消息
    socket.on('msg', function (data) {
      //console.log('news',data);
      //return;
      if (data && data.msg) {
        events.emit(data.msg.type, data.msg.data);
      }
    });

    //系统消息
    socket.on('sys', function (data) {

      if (data && data.cmd) {
        var cmd = data.cmd[0];
        var args = data.cmd[1];

        CMD_MAP[cmd](args);
      }
    });
  }

  function sendMsg(msg) {
    socket && socket.emit('msg', msg);
  }

  window.proxy = {
    connectServer: connectServer,
    sendMsg: sendMsg
  };

})(window);
