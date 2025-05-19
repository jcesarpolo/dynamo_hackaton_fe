import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArrowIcon from "../components/icons/ArrowIcon";

const TreeView = ({ node }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [children, setChildren] = useState([]);

  const { projectId } = useParams();

  console.log("node",node);
  const hasChildren = node.children.length > 0;
  //const hasChildren = node.attributes.objectCount > 0;
  const isItem = node.type === "items";

  const handleToggle = async () => {
    if (hasChildren) {
      const response = await fetch(
        `http://localhost:3000/acc/projects/${projectId}/folders/${node.id}`,
        {
          credentials: "include",
        }
      );

      const { data } = await response.json();
      console.log(data);
      setChildren(data.folderContent);

      setIsOpen(!isOpen);
    } else if (isItem) {
      console.log(node.id);
    }
  };

  return (
    <div style={{ paddingLeft: `${23}px` }}>
      <div
        className="flex gap-x-2 items-center cursor-pointer"
        key={node.id}
        onClick={() => handleToggle()}
      >
        {hasChildren && <ArrowIcon isOpen={isOpen} />}
        {/* // TODO: Cambiar icono de documento por icono según archivo */}
        {node.type === "folders" ? (
          <img src="/folder.svg" alt="folder" className="size-4" />
        ) : (
          <img src="/document.svg" alt="document" className="size-4" />
        )}
        {isItem && node.children.length && node.attributes.displayName !== undefined && node.attributes.displayName !== null? (
          <div key={node.id}>{node.attributes.displayName}</div>
        ) : (
          <div key={node.id}>{node.attributes.displayName}</div>
        )}
      </div>
      {isOpen &&
        children.length > 0 &&
        children.map((child) => {
          return <TreeView node={child} key={child.id} />;
        })}
    </div>
  );
};

const FoldersPage = () => {
  const [folders, setFolders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { projectId } = useParams();

  useEffect(() => {
    const getFolders = async () => {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:3000/acc/projects/${projectId}/folders`,
        {
          credentials: "include",
        }
      );

      const { data } = await response.json();

      setFolders(data.folders);
      setIsLoading(false);
    };

    getFolders();
  }, []);

  return (
    <div className="max-w-screen-xl py-12 w-full mx-auto px-12">
      {isLoading ? (
        <p>Loading folders...</p>
      ) : (
        <>
          {folders.length > 0 ? (
            folders.map((folder) => {
              return <TreeView node={folder} key={folder.id} />;
            })
          ) : (
            <div>No folders found</div>
          )}
        </>
      )}
    </div>
  );
};

export default FoldersPage;
