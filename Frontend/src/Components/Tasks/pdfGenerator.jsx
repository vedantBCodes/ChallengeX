// pdfGenerator.js
import jsPDF from 'jspdf';

export const generatePDFReport = (data) => {
  const doc = new jsPDF();

  // Generate a random receipt number
  const receiptNumber = `RCPT-${Math.floor(100000 + Math.random() * 900000)}`;

  doc.setFontSize(16);
  doc.text("Task Completion Receipt", 20, 20);

  doc.setFontSize(12);
  doc.text(`Receipt No: ${receiptNumber}`, 20, 30);
  doc.text(`Name: ${data.user_name}`, 20, 40);
  doc.text(`Email: ${data.user_email}`, 20, 50);
  doc.text(`Task Name: ${data.taskName}`, 20, 60);
  doc.text(`Message: ${data.message}` , 20, 70);

  doc.text(`Date: ${new Date().toLocaleString()}`, 20, 100);

  // Save the file
  const fileName = `${data.user_name.replace(/\s+/g, "_")}_${data.taskName}_receipt.pdf`;
  doc.save(fileName);
};
