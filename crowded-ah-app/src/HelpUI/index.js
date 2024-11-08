import PdfViewer from '../components/PdfViewer';
import Faq from '../components/Faq';
import ContactUs from '../components/ContactUs'
import UserTutorial from '../components/UserTutorial';

const HelpUI = () => {
    return (
        <div>
            <PdfViewer/>
            <UserTutorial/>
            <Faq/>
            <ContactUs/>
        </div>
    )
}

export default HelpUI