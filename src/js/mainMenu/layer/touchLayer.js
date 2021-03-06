var MMTouchLayer = cc.Layer.extend({

  ctor: function () {

    this._super();

    this.initMenu();

  },
  initMenu: function () {

    var singleNormal = new cc.Sprite('#single_btn.png');
    var singleSelected = new cc.Sprite('#single_btn_a.png');

    var multiNormal = new cc.Sprite('#multi_btn.png');
    var multiSelected = new cc.Sprite('#multi_btn_a.png');

    var singleGameSp = new cc.MenuItemSprite(
      singleNormal,
      singleSelected,
      null,
      function () {
        this.playSignleGame();
      }.bind(this)
    );

    var multiGameSp = new cc.MenuItemSprite(
      multiNormal,
      multiSelected,
      null,
      function () {
        this.playMultiGame();
      }.bind(this)
    );

    var menu = new cc.Menu(singleGameSp, multiGameSp);
    menu.alignItemsVerticallyWithPadding(50);
    menu.attr({
      x: GC.w_2 + 50,
      y: GC.h_2
    });
    this.addChild(menu);

  },
  playSignleGame: function () {
    if (!this.waiting) {
      cc.director.runScene(new cc.TransitionFade(1.2, new GamePlayScene(GC.GAME_MODE.SINGLE)));
    }
  },
  playMultiGame: function () {

    if(this.waiting){
      return;
    }

    this.waiting = true;

    this.host = false;

    events.on('player.waiting', this.onWaiting, this);

    events.on('player.connected', this.onConnected, this);

    proxy.connectServer();
<<<<<<< HEAD
    var host = false;
    events.on('player.waiting', function () {
      host = true;
      var lb = new cc.LabelTTF('正在等待其它玩家加入..', 'monospace', 16);
      lb.attr({
        x: GC.w_2 + 50,
        y: GC.h_2 + 150
      });
      this.addChild(lb);
    }, this);
    events.on('player.conected', function () {
      cc.director.runScene(new cc.TransitionFade(1.2, new GamePlayScene(host)));
    });
=======
>>>>>>> snowandmumu/master
    //cc.director.runScene(new cc.TransitionFade(1.2, new GamePlayScene()));
  },
  onWaiting: function () {

    this.host = true;

    var lb = new cc.LabelTTF('正在等待其它玩家加入..', 'monospace', 16);
    lb.attr({
      x: GC.w_2 + 50,
      y: GC.h_2 + 150
    });
    this.addChild(lb);

  },
  onConnected: function () {
    this.waiting = false;
    cc.director.runScene(new cc.TransitionFade(1.2, new GamePlayScene(GC.GAME_MODE.MULTI, this.host)));

    events.un('player.waiting', this.onWaiting);
    events.un('player.connected', this.onConnected);
  }

});
