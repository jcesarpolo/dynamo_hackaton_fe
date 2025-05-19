import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { useCookies } from "react-cookie";
import { initACCViewerUniqueModel } from "../lib/aps.acc";

const IssuesPage = () => {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const [urn, setUrn] = useState(null);

  const [tempViewerState, setTempViewerState] = useState(null);
  const [viewerIsReady, setViewerIsReady] = useState(false);

  const [cookies] = useCookies(["accessToken"]);
  const token = cookies.access_token;

  const { projectId } = useParams();

  useEffect(() => {
    initACCViewerUniqueModel(token, urn, setViewerIsReady);
  }, [urn]);

  useEffect(() => {
    if (tempViewerState && window.ACC_VIEWER) {
      window.ACC_VIEWER.restoreState(tempViewerState);
      setViewerIsReady(false);
    }
  }, [viewerIsReady, tempViewerState]);

  useEffect(() => {
    const getIssues = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/acc/projects/${projectId}/issues`,
          {
            credentials: "include",
          }
        );

        const { data } = await response.json();
        setIssues(data.issues);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getIssues();
  }, []);

  const getSnapShotUrl = async (snapshotUrn) => {
    // urn:adsk.objects:os.object:wip.dm.prod/74ca87dd-fc34-4953-b194-69486d7969ec.jpg

    const bucketKey = snapshotUrn.split(":").pop().split("/")[0];
    const objectName = snapshotUrn.split("/").pop();

    const response = await fetch(
      `https://developer.api.autodesk.com/oss/v2/buckets/${bucketKey}/objects/${objectName}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener el snapshot");
    }

    const blob = await response.blob();

    const imageUrl = URL.createObjectURL(blob);

    return imageUrl;
  };

  const handleClickIssue = (issueId) => async () => {
    const response = await fetch(
      `http://localhost:3000/acc/projects/${projectId}/issues/${issueId}`,
      {
        credentials: "include",
      }
    );

    const { data } = await response.json();

    let snapshotUrl = null;
    if (data.issue.snapshotUrn && data.issue.snapshotUrn.includes(".jpg")) {
      console.log("data.issue.snapshotUrn => ", data.issue.snapshotUrn);
      snapshotUrl = await getSnapShotUrl(data.issue.snapshotUrn);
    }

    const { issue } = data;

    console.log("issue => ", issue);
    // window.ACC_VIEWER.restoreState(issue.linkedDocuments[0].details.viewerState)

    setUrn(issue.linkedDocuments[0].details.viewerState.seedURN);
    setTempViewerState(issue.linkedDocuments[0].details.viewerState);

    setSelectedIssue({ ...issue, snapshotUrl });
  };

  return (
    <div className="max-w-screen-2xl w-full mx-auto py-12 bg-blue-200">
      <div>
        <h2 className="font-bold text-xl uppercase mb-6">Lista de issues</h2>
        {loading ? (
          <Loading />
        ) : (
          <div className="flex gap-x-2">
            <div
              className="w-[400px]
            "
            >
              {issues?.length > 0 ? (
                <div className="flex flex-col gap-4  bg-yellow-200 overflow-y-scroll" style={{height: "calc(100vh - 150px)"}}>
                  {issues.map((issue) => (
                    <div
                      key={issue.id}
                      className="bg-gray-200 border border-gray-400 p-4 rounded-lg cursor-pointer hover:bg-gray-300 transition-all duration-300"
                      onClick={handleClickIssue(issue.id)}
                    >
                      <div className=" flex flex-col gap-4">
                        <h3 className="font-bold text-center">{issue.title}</h3>
                        <p>
                          <span className="font-bold">Description: </span>
                          {issue.description}
                        </p>
                        <p>
                          <span className="font-bold">Creador: </span>
                          {issue.createdBy}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No tiene proyectos en la cuenta</p>
              )}
            </div>

            {selectedIssue ? (
              <div className="flex flex-col w-full gap-y-6">
                <div className="bg-red-200 h-[500px] w-full">
                  {selectedIssue.linkedDocuments.length > 0 ? (
                    <div className="flex w-full h-full relative min-w-96 ">
                      <div
                        id="myACCViewer"
                        className="rounded-md overflow-hidden"
                      ></div>
                    </div>
                  ) : (
                    <p>No hay modelo</p>
                  )}
                </div>
                <div className="flex">
                  {selectedIssue.snapshotUrl && (
                    <img
                      src={selectedIssue.snapshotUrl}
                      alt={selectedIssue.title}
                      className="w-[100px] h-[100px] object-cover rounded-lg"
                    />
                  )}
                  <div>
                    <p className="font-bold">{selectedIssue.title}</p>
                    <p>{selectedIssue.description}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p>Selecciona un issue</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default IssuesPage;
