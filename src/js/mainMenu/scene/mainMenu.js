var MainMenuScene = cc.Scene.extend({
  onEnter: function () {

    this._super();
    var layer = new MainMenuLayer();
    this.addChild(layer);
  }
});

var MainMenuLayer = cc.Layer.extend({

  backgroundLayer: null,
  touchLayer: null,
  ctor: function () {

    this._super();

    this.addCache();

    this.addBackgroundLayer();

    this.addTouchLayer();

  },

  addCache : function(){

    cc.spriteFrameCache.addSpriteFrames(res.tile_plist);
    cc.spriteFrameCache.addSpriteFrames(res.pipe_plist);
    cc.spriteFrameCache.addSpriteFrames(res.boom_plist);
    cc.spriteFrameCache.addSpriteFrames(res.icon_plist);
    cc.spriteFrameCache.addSpriteFrames(res.result_plist);
    cc.spriteFrameCache.addSpriteFrames(res.prop_plist);
    cc.spriteFrameCache.addSpriteFrames(res.map_plist);

  },

  addBackgroundLayer : function(){

    this.backgroundLayer = new MMBackgroundLayer();
    this.addChild(this.backgroundLayer);
  },

  addTouchLayer : function(){
    this.touchLayer = new MMTouchLayer();
    this.addChild(this.touchLayer);
  }

});

