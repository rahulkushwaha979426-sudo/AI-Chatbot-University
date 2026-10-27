import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function exportChatToPDF(session, student) {
  if (!session || !session.messages || session.messages.length === 0) {
    alert('No messages to export in this conversation.');
    return;
  }

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Header Banner
  doc.setFillColor(30, 27, 75); // Dark Indigo
  doc.rect(0, 0, pageWidth, 28, 'F');

  // University Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('APEX INSTITUTE OF SCIENCE & TECHNOLOGY', 14, 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(199, 210, 254);
  doc.text('Official AI Student Support & Virtual Academic Advisory Services', 14, 18);
  doc.text(`Exported: ${new Date().toLocaleString()}`, 14, 23);

  // Metadata Box
  doc.setDrawColor(226, 232, 240);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(14, 34, pageWidth - 28, 22, 2, 2, 'FD');

  doc.setTextColor(51, 65, 85);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Student:', 18, 41);
  doc.setFont('helvetica', 'normal');
  doc.text(`${student?.name || 'Registered Student'} (${student?.studentId || 'ID: APEX-STU'})`, 34, 41);

  doc.setFont('helvetica', 'bold');
  doc.text('Program:', 18, 47);
  doc.setFont('helvetica', 'normal');
  doc.text(`${student?.department || 'Engineering & Technology'} - ${student?.semester || 'Sem 4'}`, 34, 47);

  doc.setFont('helvetica', 'bold');
  doc.text('Session Title:', 18, 53);
  doc.setFont('helvetica', 'normal');
  doc.text(`${session.title || 'University Inquiries Transcript'}`, 42, 53);

  // Prepare table data
  const tableData = session.messages.map((m, idx) => {
    const isUser = m.sender === 'user';
    const roleText = isUser ? (student?.name || 'Student') : 'Apex AI Assistant';
    const timeText = m.timestamp ? new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
    // Strip markdown formatting for PDF output readability
    const cleanContent = m.content
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/###\s?/g, '')
      .replace(/`([^`]+)`/g, '$1');

    return [
      `${idx + 1}`,
      `${roleText}\n(${timeText})`,
      cleanContent
    ];
  });

  // Table using jspdf-autotable
  doc.autoTable({
    startY: 62,
    head: [['#', 'Sender', 'Transcript & Responses']],
    body: tableData,
    theme: 'striped',
    headStyles: {
      fillColor: [79, 70, 229],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 10,
    },
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },
      1: { cellWidth: 35, fontStyle: 'bold', fontSize: 8.5 },
      2: { cellWidth: 'auto', fontSize: 9 },
    },
    styles: {
      overflow: 'linebreak',
      cellPadding: 3.5,
      valign: 'top',
    },
    didDrawPage: (data) => {
      // Footer
      const totalPages = doc.internal.getNumberOfPages();
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text(
        `Apex University AI Assistant • Page ${data.pageNumber} of ${totalPages}`,
        pageWidth / 2,
        pageHeight - 8,
        { align: 'center' }
      );
    }
  });

  // Save file
  const cleanTitle = (session.title || 'chat_transcript')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .slice(0, 30);
  doc.save(`ApexUniversity_${cleanTitle}_${Date.now()}.pdf`);
}
