import ErrorMessage from "./ErrorMessage";
import { useProjects } from "../hooks/useProjects";

function ProjectsList() {
  const { projects, error, loading } = useProjects();
  console.log(projects)

  return (
    <div>
      {error && <ErrorMessage error={error} />}
      {loading && <p>Fetching projects...</p>}
        <div className="project">
          {projects.map((project) => (
            <div key={project.id}>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <p>Due on{project.dueDate}</p>
              <p>Project priority {project.projectPriority.priority}</p>
              {project.teamMember?.map((member) => (
              <div key={member.id}>
                  <p>{member.name}</p>
                  <p>{member.email}</p>
              </div>
          ))}
            </div>
          ))}
        </div>
    </div>
  );
}

export default ProjectsList;
