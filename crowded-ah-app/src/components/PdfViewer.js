import './PdfViewer.css';

const PdfViewer = () => {
    return (
        <div className="pdf-container">
            <iframe 
                src="/user-manual-v1.pdf" 
                className="pdf" 
                frameborder="0"
                title="PDF Viewer"
            />
        </div>
    );
};

export default PdfViewer;
