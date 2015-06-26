var GamePlayScene = cc.Scene.extend({
  ctor: function (mode, host) {
    this.mode = mode;
    this.host = host;
    this._super();
  },
  onEnter: function () {

    var layer = new GamePlayLayer(this.mode, this.host);
    this.addChild(layer);
  }
});

var GamePlayLayer = cc.Layer.extend({

  backgroundLayer: null,
  touchLayer: null,
  ctor: function (mode, host) {
    this._super();

    this.addBackgroundLayer();

    this.addTouchLayer(mode, host);
  },

  addBackgroundLayer: function () {

    this.backgroundLayer = new GPBackgroundLayer();
    this.addChild(this.backgroundLayer);
  },

  addTouchLayer: function (mode, host) {
    this.touchLayer = new GPTouchLayer(mode, host);
    this.addChild(this.touchLayer);
  }
});
