var Player = require('./player');

var players = {};
var waiting = null;

function connect(socket, uid) {
  //socket,uid;
  var player = getPlayer(uid);
  player.addSocket(socket);
}

function getPlayer(uid) {

  if (players[uid]) {
    return players[uid];
  } else {
    //if(!uid || uid == 'undefined' || typeof(uid) === 'undefined') {
    uid = getUniqueId();
    var player = new Player(uid);
    player.on('msg', onMsg);
    player.on('connect', onConnect);
    player.on('disconnect', onDisconnect);
    players[uid] = player;

    return player;
  }
}

function onMsg(msg) {
  consolelog(this.uid + ' msg:', msg);

  var peer = this.getPeer();

  if (peer) {
    peer.msg(msg);
  }

  consolelog(this.uid, "=>", peer && peer.uid, JSON.stringify(msg));
}

function onConnect() {

  //consolelog(this.uid+' login:');
  if (waiting && waiting != this) {
    consolelog(this.uid, "<=>", waiting.uid);

    this.setPeer(waiting);
    waiting.setPeer(this);
    waiting = null;
  } else {
    waiting = this;
  }
}

function onDisconnect() {
  consolelog(this.uid, "##");

  var peer = this.getPeer();

  if (peer) {
    peer.setPeer(null);
  }
  if (this === waiting) {
    waiting = null;
  }
  delete players[this.uid];
}


var _uniqueId = 10;
function getUniqueId() {
  var time = +new Date;
  return time + '_' + _uniqueId++;
}

function consolelog() {
  if (process.env.NODE_ENV !== 'production') {
    console.log.apply(this, arguments);
  }
}

module.exports = {
  connect: connect
};
