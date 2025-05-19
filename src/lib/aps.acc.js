export const initACCViewerUniqueModel = async (token, urn, setViewerIsReady) => {
  const options = {
    env: "AutodeskProduction",
    api: "derivativeV2",
    accessToken: token,
  };


  console.log("urn", urn);
  const viewerContainer = document.getElementById("myACCViewer");

  const config = {};

  let viewer = new Autodesk.Viewing.GuiViewer3D(viewerContainer, config); // NOP_VIEWER =>

  const documentUrn = `urn:${urn}`;

  Autodesk.Viewing.Initializer(options, () => {
    const startCode = viewer.start();

    if (startCode > 0) {
      console.error("Failed to create a Viewer: WebGL not supported.");
      return;
    }

    window.ACC_VIEWER = viewer;

    viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, () => {
      setViewerIsReady(true);
    });

    Autodesk.Viewing.Document.load(
      documentUrn,
      (viewerDocument) => {
        const defaultModel = viewerDocument.getRoot().getDefaultGeometry();

        viewer
          .loadDocumentNode(viewerDocument, defaultModel, {
            globalOffset: { x: 0, y: 0, z: 0 },
          })
          .then(() => {});

        console.log("Document loaded successfully");
      },
      () => {
        console.error("Failed fetching Forge manifest");
      }
    );
  });
};

