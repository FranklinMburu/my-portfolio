import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Education from '../components/Education';
import { useDocumentTitle } from '../lib/router';

const AboutPage = () => {
  useDocumentTitle('About - Franklin Mburu Kamande');
  return (
    <div className="pt-16">
      <About />
      <Experience />
      <Skills />
      <Education />
    </div>
  );
};

export default AboutPage;
