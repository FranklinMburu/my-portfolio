import Contact from '../components/Contact';
import { useDocumentTitle } from '../lib/router';

const ContactPage = () => {
  useDocumentTitle('Contact - Franklin Mburu Kamande');
  return (
    <div className="pt-16">
      <Contact />
    </div>
  );
};

export default ContactPage;
