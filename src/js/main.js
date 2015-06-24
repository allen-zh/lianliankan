cc.game.onStart = function(){

  // newLoaderScene.onEnter = function(){
  //   this._super();
  // };

  cc.view.enableRetina(true);

  cc.view.adjustViewPort(true);
  //
  cc.view.setDesignResolutionSize(800, 600, cc.ResolutionPolicy.SHOW_ALL);
  //
  cc.view.resizeWithBrowserSize(true);

  // cc.LoaderScene.preload(g_resources, function () {
  MyLoaderScene.preload(g_resources, function () {
    //cc.director.setProjection(cc.Director.PROJECTION_2D);
    cc.director.runScene(new MainMenuScene());
  }, this);
};

cc.game.run();
