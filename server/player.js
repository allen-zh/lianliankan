var CMD_OFFLINE = 'offline';
var CMD_SETCOOKIE = 'setcookie';
var CMD_SETSTATUS = 'setstatus';

var PLAYER_CONNECTED = 0;
var PLAYER_WAITING = 1;
var PLAYER_OFFLINE = 2;
var PLAYER_ABANDONED = 3;

var util = require("util");
var events = require("events");

util.inherits(Player, events.EventEmitter);

function Player(uid) {
  events.EventEmitter.call(this);

  this.uid = uid;
  this.status = PLAYER_WAITING;

  this.onMsg = onMsg.bind(this);
  this.onDisconnect = onDisconnect.bind(this);
}

Player.prototype.addSocket = function (socket) {

  if (this.socket) {
    //un
    this.socket.removeListener('disconnect', this.onDisconnect);
    this.socket.removeListener('msg', this.onMsg);
    this.socket = null;

  }

  if (socket) {
    //on
    this.socket = socket;
    socket.on('msg', this.onMsg);
    socket.on('disconnect', this.onDisconnect);

    //Already connected to the server.
    this.cmd([CMD_SETSTATUS, this.status]);

    //If this is a new user
    if (this.status === PLAYER_WAITING) {
      //login to match and register the user
      this.emit('connect');
      this.cmd([CMD_SETCOOKIE, this.uid]);
    }
  }
};

Player.prototype.setPeer = function (peer) {
  this.peer = peer;

  if (peer === null) {
    this.disconnect(true);
  } else {
    this.status = PLAYER_CONNECTED;
    this.cmd([CMD_SETSTATUS, PLAYER_CONNECTED]);
  }
};

Player.prototype.getPeer = function () {
  return this.peer;
};

Player.prototype.send = function (data, type) {

  if (!this.socket) return false;

  type = type || 'news';
  this.socket.emit(type, data);
};

Player.prototype.msg = function (msg) {

  this.send({msg: msg});
};

Player.prototype.cmd = function (cmd) {

  this.send({cmd: cmd}, 'sys');
};

/**
 * 断开连接
 * @param flag true表示是对方断开，false表示自己主动断开
 */
Player.prototype.disconnect = function (flag) {

  this.status = PLAYER_OFFLINE;

  if (flag) {
    this.cmd([CMD_SETSTATUS, PLAYER_ABANDONED]);
  } else {
    this.cmd([CMD_SETSTATUS, PLAYER_OFFLINE]);
  }

  if (this.socket) {
    this.socket.removeListener('disconnect', this.onDisconnect);
    this.socket.removeListener('msg', this.onMsg);
    this.socket.disconnect(true);
    this.socket = null;
  }
  this.emit('disconnect');
};

function onMsg(data) {
  //处理user关心的事件
  //如果下线 状态置为4
  if (data.cmd && data.cmd === CMD_OFFLINE) {
    this.disconnect();
  }
  if (data.msg) {
    this.emit('msg', data.msg);
  }
  //emit some useful events to chatroom
}

function onDisconnect() {

  if (this.status === PLAYER_WAITING || this.status === PLAYER_CONNECTED) {
    this.disconnect();
  }

}

module.exports = Player;
