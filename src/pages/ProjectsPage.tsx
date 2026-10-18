import Projects from '../components/Projects';
import { useDocumentTitle } from '../lib/router';

const ProjectsPage = () => {
  useDocumentTitle('Projects - Franklin Mburu Kamande');
  return (
    <div className="pt-16">
      <Projects />
    </div>
  );
};

export default ProjectsPage;
