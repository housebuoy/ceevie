// components/pdf/ResumePDFViewer.tsx
import { PDFViewer } from '@react-pdf/renderer';
import { ResumePDF } from '@/app/components/pdf/ResumePDF';

export default function ResumePDFViewer({ resume }) {
  return (
    <PDFViewer width="100%" height="900">
      <ResumePDF resume={resume} />
    </PDFViewer>
  );
}