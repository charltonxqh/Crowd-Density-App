/**
 * @fileoverview HelpUI component serves as the main page for user assistance.
 * It provides access to various help resources, including a PDF viewer for documentation,
 * user tutorial, FAQ section and contact form.
 * @author Choo Yi Ken
 */

import PdfViewer from "../components/PdfViewer";
import Faq from "../components/Faq";
import ContactUs from "../components/ContactUs";
import UserTutorial from "../components/UserTutorial";

/**
 * HelpUI component that provides user assistance resources.
 * It includes a PDF viewer for documentation, a user tutorial, FAQs and a contact form.
 *
 * @component
 * @returns {JSX.Element} Rendered HelpUI component.
 */
const HelpUI = () => {
  return (
    <div>
      <PdfViewer />
      <UserTutorial />
      <Faq />
      <ContactUs />
    </div>
  );
};

export default HelpUI;
