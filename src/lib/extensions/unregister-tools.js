
class UnregisterTools extends Autodesk.Viewing.Extension
{
  constructor(viewer, options){
    super(viewer, options);

    this._group = null;
  }

  load(){
    console.log('LAMBDA_MyFirstExtension has been loaded');
    return true;
  }

  unload(){
    console.log('MyFirstExtension has been unloaded');
    return true;
  }

  onToolbarCreated(){
    this.viewer.toolbar.removeControl(this.viewer.toolbar.getControl("settingsTools"));
    this.viewer.toolbar.removeControl(this.viewer.toolbar.getControl("modelTools"));

  }
}

Autodesk.Viewing.theExtensionManager.registerExtension('Lambda.Generals.UnregisterTools', UnregisterTools);