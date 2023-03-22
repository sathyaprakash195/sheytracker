import React, { useEffect } from "react";
import { GetAllProjects } from "../../apicalls/projects";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import { Badge, message, Tag } from "antd";
import { dateFormat } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user } = useSelector((state) => state.users);
  const [projects = [], setProjects] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getProjects = async () => {
    try {
      dispatch(SetLoader());
      const response = await GetAllProjects();
      dispatch(SetLoader());
      if (response.success) setProjects(response.data);
      else throw new Error(response.message);
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  useEffect(() => {
    getProjects();
  }, []);
  return (
    <div>
      <h1 className="text-xl">
        Heyy {user.name} , Welcome to your dashboard , you have{" "}
        {projects.length} projects
      </h1>
      <span>Select a project to view its details</span>

      <div className="grid grid-cols-4 gap-5 mt-5">
        {projects.map((project) => (
          <div className="p-2 rounded-md border border-solid border-gray-300 cursor-pointer flex flex-col gap-2"
            key={project._id}
            onClick={() => navigate(`/project/${project._id}`)}
          >
            <h1 className="text-xl uppercase font-semibold">{project.name}</h1>
            <span>{project.description}</span>
            <span>Created at: {dateFormat(project.createdAt)}</span>
            <div className="flex justify-end">
              <Tag color={project.status === "active" ? "blue" : "red"}>
                {project.status}
              </Tag>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
