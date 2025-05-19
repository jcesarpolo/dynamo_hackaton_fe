class TemplateExtension extends Autodesk.Viewing.Extension {
  constructor(viewer, options) {
    super(viewer, options);

    this._group = null;
  }

  load() {
    console.log("Extension has been loaded");
    return true;
  }

  unload() {
    console.log("Extension has been unloaded");
    return true;
  }

  onToolbarCreated() {
    const groupName = "Generals";
    const buttonName = "ConsoleButton";
    const buttonClass = "console-button";
    const buttonToolTip = "Console button";

    this._group = this.viewer.toolbar.getControl(groupName);

    if (!this._group) {
      this._group = new Autodesk.Viewing.UI.ControlGroup(groupName);
      this.viewer.toolbar.addControl(this._group);
    }

    const button = new Autodesk.Viewing.UI.Button(buttonName);
    button.setToolTip(buttonToolTip);
    button.addClass(buttonClass);

    button.onClick = (e) => {
      console.log("TemplateExtension clicked");
    };

    this._group.addControl(button);
  }
}

Autodesk.Viewing.theExtensionManager.registerExtension(
  "Lambda.Generals.TemplateExtension",
  TemplateExtension
);
