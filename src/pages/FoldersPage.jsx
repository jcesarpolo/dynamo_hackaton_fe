import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArrowIcon from "../components/icons/ArrowIcon";

const TreeView = ({ node, onSelect, selectedId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [children, setChildren] = useState([]);

  const { projectId } = useParams();
  const hasChildren = node.attributes.objectCount > 0;
  const isSelected = node.id === selectedId;

  const handleToggle = async () => {
    onSelect(node.id);

    if (hasChildren) {
      const res = await fetch(
        `http://localhost:3000/acc/projects/${projectId}/folders/${node.id}`,
        { credentials: "include" }
      );
      const { data } = await res.json();
      setChildren(data.folderContent);
      setIsOpen(!isOpen);
    }
  };

  return (
    <div style={{ paddingLeft: 23 }}>
      <div
        className={`flex gap-2 items-center cursor-pointer rounded-md ${
          isSelected ? "bg-blue-100 text-blue-700 font-semibold" : ""
        }`}
        onClick={handleToggle}
      >
        {hasChildren && <ArrowIcon isOpen={isOpen} />}
        <img
          src={node.type === "folders" ? "/folder.svg" : "/document.svg"}
          alt={node.type}
          className="size-4"
        />
        <span>{node.attributes.displayName}</span>
      </div>

      {isOpen &&
        children.map((child) => (
          <TreeView
            key={child.id}
            node={child}
            onSelect={onSelect}
            selectedId={selectedId}
          />
        ))}
    </div>
  );
};

const FoldersPage = () => {
  const [folders, setFolders] = useState([]);
  const [scripts, setScripts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFolderId, setSelectedFolderId] = useState(null);

  const [pendingFile, setPendingFile] = useState(null);
  const [label, setLabel] = useState("");

  const { projectId } = useParams();

  useEffect(() => {
    const getFolders = async () => {
      setIsLoading(true);
      const res = await fetch(
        `http://localhost:3000/acc/projects/${projectId}/folders`,
        { credentials: "include" }
      );
      const { data } = await res.json();
      setFolders(data.folders);
      setIsLoading(false);
    };

    const getScripts = async () => {
      const res = await fetch("http://localhost:3000/scripts", {
        credentials: "include",
      });
      const { data } = await res.json();
      setScripts(data.scripts);
    };

    getFolders();
    getScripts();
  }, [projectId]);

  const selectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith(".dyn"))
      return alert("Select a Dynamo (.dyn) file");
    setPendingFile(file);
  };

  const cancelUpload = () => {
    setPendingFile(null);
    setLabel("");
  };

  const submitUpload = async () => {
    if (!label.trim()) return alert("Enter a label");
    const fd = new FormData();
    fd.append("file", pendingFile);
    fd.append("folderId", selectedFolderId ?? "");
    fd.append("label", label.trim());

    // const res = await fetch("http://localhost:3000/scripts/upload", {
    //   method: "POST",
    //   body: fd,
    //   credentials: "include",
    // });
    // const { data } = await res.json();
    // setScripts((prev) => [...prev, { id: data.script.id, label: label.trim() }]);
    setScripts((prev) => [...prev, { id: "ghggh", label: label.trim() }]);
    cancelUpload();
  };

  const runScript = async (id) => {
    console.log("Selected Folder", selectedFolderId);
    await fetch(`http://localhost:3000/scripts/urn=dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6aGFja2Rldi9pZmNfZXhwb3J0Lmpzb24/execute/${selectedFolderId}`, {
      method: "POST",
      credentials: "include",
    });
  };

  return (
    <div className="max-w-screen-xl mx-auto py-12 px-12 w-full">
      <h1 className="text-3xl font-bold mb-8">Dynamo Scripts Runner</h1>

      {isLoading ? (
        <p>Loading folders…</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left – folder tree */}
          <div className="border rounded-2xl p-4 shadow-sm">
            {folders.length ? (
              folders.map((f) => (
                <TreeView
                  key={f.id}
                  node={f}
                  onSelect={setSelectedFolderId}
                  selectedId={selectedFolderId}
                />
              ))
            ) : (
              <div>No folders found</div>
            )}
          </div>

          {/* Right – script actions */}
          <div className="md:col-span-2 flex flex-col gap-10">
            {/* Upload section */}
            <div className="space-y-4">
              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-medium shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 cursor-pointer">
                Upload Dynamo Script
                <input
                  type="file"
                  accept=".dyn"
                  className="hidden"
                  onChange={selectFile}
                />
              </label>

              {selectedFolderId && (
                <div className="text-sm text-gray-500">
                  Target folder: {selectedFolderId}
                </div>
              )}

              {pendingFile && (
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-gray-600">
                    {pendingFile.name}
                  </span>
                  <input
                    type="text"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder="Label for run button"
                    className="border rounded-xl px-3 py-2 w-full"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={submitUpload}
                      className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelUpload}
                      className="px-4 py-2 rounded-xl border"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Available scripts */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold ">Available Scripts</h2>
              {scripts.length ? (
                scripts.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => runScript(s.id)}
                    className="px-4 py-2 mr-6 rounded-xl hover:bg-blue-600 text-white font-semibold shadow bg-gray-400"
                  >
                    {s.label}
                  </button>
                ))
              ) : (
                <p className="text-gray-500">No scripts uploaded yet.</p>
              )}
            </section>
            {/* Results */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold ">Results</h2>
              <div className="flex flex-col gap-4 bg-gray-200-100 w-auto border border-gray-400 p-4 rounded-lg h-50">
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoldersPage;
