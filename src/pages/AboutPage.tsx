import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Awards from '../components/Awards';
import Education from '../components/Education';
import { useDocumentTitle } from '../lib/router';

const AboutPage = () => {
  useDocumentTitle('About - Franklin Mburu Kamande');
  return (
    <div className="pt-[var(--header-h)]">
      <About />
      <Experience />
      <Skills />
      <Awards />
      <Education />
    </div>
  );
};

export default AboutPage;
