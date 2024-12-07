import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import jsPDF from "jspdf";
// import "jspdf-autotable";
// import { parse } from "json2csv";

interface ReportModalProps {
  data: any;
  close: () => void;
}

const ReportModal = ({ data, close }: ReportModalProps) => {

    // const generateCSV = (data: any) => {
    //   try {
    //     const csv = parse(data); // Convert JSON to CSV
    //     const blob = new Blob([csv], { type: "text/csv" });
    //     const url = URL.createObjectURL(blob);
    
    //     // Create a download link and trigger download
    //     const link = document.createElement("a");
    //     link.href = url;
    //     link.download = "report.csv";
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    //   } catch (error) {
    //     console.error("Error generating CSV:", error);
    //   }
    // };
    

const generatePDF = (data: any) => {
    let doc: any = new jsPDF();
    doc.setFontSize(14);
    doc.text('Business Report', 10, 10);
    const pageHeight = doc.internal.pageSize.height;
    let y = 20;
    let page = 1;
    doc.page = page;
    const reportData = {...data, notes:{...data.notes}};
    Object.entries(reportData).forEach(([key, value]:any) => {
      if (y > pageHeight - 20) {
        doc.addPage();
        y = 20;
      }
      doc.setFontSize(12);
      doc.text(`${key}: ${value}`, 10, y);
      y += 10;
    });
    if (page > 1) {
      doc.save(`business_report_${page}.pdf`);
    } else {
      doc.save('business_report.pdf');
    }
};

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="absolute top-0 right-0 p-4">
            <X className="w-10 h-10 text-gray-100 cursor-pointer" onClick={close}/>
        </div>
      <div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">Download Report</h2>
        <div className="flex justify-center items-center"> 
            <Button onClick={() => generatePDF(data)}>Download PDF</Button>
            {/* <Button onClick={() => generateCSV(data)}>Download CSV</Button> */}
        </div>
      </div>
    </div>
  )
}

export default ReportModal