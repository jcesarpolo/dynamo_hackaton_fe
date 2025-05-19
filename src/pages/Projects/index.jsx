import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProjects = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/acc/projects", {
          credentials: "include",
        });
        const { data } = await response.json();

        setProjects(data.projects);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getProjects();
  }, []);

  return (
    <div className="max-w-screen-2xl w-full mx-auto py-12 m-t-12 px-12">
      <div>
        <h2 className="font-bold text-xl uppercase mb-6">Projects</h2>
        {loading ? (
          <Loading />
        ) : (
          <div>
            {projects?.length > 0 ? (
              <div className="grid grid-cols-4 gap-4 ">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-gray-200 border border-gray-400 p-4 rounded-lg"
                  >
                    <div className="h-10">
                      <h3 className="font-bold">{project.attributes.name}</h3>
                    </div>
                    <div className="flex gap-x-2 justify-center">
                      {/* <Link to={`/projects/${project.id}/issues`}>
                        <button className="bg-emerald-600 px-8 py-3 rounded hover:scale-105 hover:bg-emerald-400 transition-all text-white uppercase font-bold mt-6 ">
                          Ver issues
                        </button>
                      </Link> */}
                      <Link to={`/projects/${project.id}/folders`}>
                        <button className="bg-blue-600 px-8 py-3 rounded hover:scale-105 hover:bg-blue-400 transition-all text-white uppercase font-bold mt-6 ">
                          Folders
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No projects in the account</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
