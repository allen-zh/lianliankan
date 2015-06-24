var MMBackgroundLayer = cc.LayerColor.extend({

  ctor: function (color) {

    this._super(color);

    this.initBackground();

  },

  initBackground: function () {
    var menuBg = new cc.Sprite(res.menuBg_png);
    menuBg.attr({
      x: GC.w_2,
      y: GC.h_2
    });

    this.addChild(menuBg);

  }
});
