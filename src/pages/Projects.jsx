import AddProject from "../components/AddProject";
import ProjectsList from "../components/ProjectsList";

function Projects() {
  return (
    <section className="projectsPage">
      <div className="addProject">
        <AddProject />
      </div>
      <div className="projects">
        <ProjectsList />
      </div>
    </section>
  );
}

export default Projects;
