import jsPDF from "jspdf";

export type PdfExportInput = {
  title: string;
  body: string;
};

// Client-side PDF export using jsPDF.
export function exportProposalToPdf({ title, body }: PdfExportInput) {
  const doc = new jsPDF({
    unit: "pt",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 40;
  const maxWidth = pageWidth - margin * 2;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(title, margin, 60);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  const lines = doc.splitTextToSize(body, maxWidth);
  doc.text(lines, margin, 90);

  doc.save(`${sanitizeFilename(title)}.pdf`);
}

function sanitizeFilename(name: string) {
  return name
    .trim()
    .replace(/[\\/:*?\"<>|]/g, "-")
    .slice(0, 80);
}
