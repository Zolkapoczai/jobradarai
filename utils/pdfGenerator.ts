
import { jsPDF } from "jspdf";

interface ContentItem {
  type: 'h1' | 'h2' | 'p';
  text: string;
}

const COLORS = {
  NAVY: [13, 33, 73],      // Professional Navy
  DARK_GREY: [51, 65, 85],  // Slate 700
  LIGHT_GREY: [100, 116, 139], // Slate 500
  LINE: [226, 232, 240],    // Slate 200
  BLACK: [0, 0, 0]
};

// Fixed: Added 'leading' property to h1 and h2 to ensure consistency across the union type
const TYPOGRAPHY = {
  h1: { size: 18, style: 'bold', color: COLORS.NAVY, leading: 1.2 },
  h2: { size: 14, style: 'bold', color: COLORS.DARK_GREY, leading: 1.2 },
  p: { size: 10.5, style: 'normal', color: COLORS.BLACK, leading: 1.5 }
};

const MARGIN = 20;

/**
 * Loads the Roboto font to support special characters like ő and ű.
 */
const loadFonts = async (doc: jsPDF) => {
  try {
    const fontUrl = "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf";
    const response = await fetch(fontUrl);
    if (!response.ok) throw new Error("Font fetch failed");
    const buffer = await response.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64 = btoa(binary);
    
    doc.addFileToVFS("Roboto-Regular.ttf", base64);
    doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
    
    // Attempt to load Bold for headings
    const boldUrl = "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf";
    const boldResp = await fetch(boldUrl);
    if (boldResp.ok) {
      const bBuffer = await boldResp.arrayBuffer();
      const bBytes = new Uint8Array(bBuffer);
      let bBinary = "";
      for (let i = 0; i < bBytes.byteLength; i++) {
        bBinary += String.fromCharCode(bBytes[i]);
      }
      const bBase64 = btoa(bBinary);
      doc.addFileToVFS("Roboto-Bold.ttf", bBase64);
      doc.addFont("Roboto-Bold.ttf", "Roboto", "bold");
    }

    doc.setFont("Roboto");
    return true;
  } catch (e) {
    console.warn("Could not load external fonts, falling back to standard fonts.");
    doc.setFont("helvetica");
    return false;
  }
};

/**
 * Draws the "Executive Summary" header and footer on a specific page.
 */
const drawPageDecoration = (doc: jsPDF, pageIdx: number, totalPages: number, hasCustomFont: boolean) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // Header
  doc.setFontSize(8);
  doc.setTextColor(COLORS.LIGHT_GREY[0], COLORS.LIGHT_GREY[1], COLORS.LIGHT_GREY[2]);
  if (hasCustomFont) doc.setFont("Roboto", "normal");
  else doc.setFont("helvetica", "normal");
  
  doc.text("CONFIDENTIAL CANDIDATE REPORT", MARGIN, 12);
  doc.text("JobRadar AI", pageWidth - MARGIN, 12, { align: 'right' });
  
  doc.setDrawColor(COLORS.LINE[0], COLORS.LINE[1], COLORS.LINE[2]);
  doc.line(MARGIN, 15, pageWidth - MARGIN, 15);
  
  // Footer
  const dateStr = new Date().toLocaleDateString();
  doc.text(dateStr, MARGIN, pageHeight - 10);
  doc.text(`Page ${pageIdx} of ${totalPages}`, pageWidth - MARGIN, pageHeight - 10, { align: 'right' });
};

/**
 * Core PDF creation engine with advanced layout capabilities.
 */
const createStyledPdf = async (reportTitle: string, content: ContentItem[]) => {
  const doc = new jsPDF();
  const hasCustomFont = await loadFonts(doc);
  
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - (MARGIN * 2);
  
  let yPos = 30;

  // Add the report title first
  content = [{ type: 'h1', text: reportTitle }, ...content];

  for (const item of content) {
    const config = TYPOGRAPHY[item.type];
    doc.setFontSize(config.size);
    doc.setTextColor(config.color[0], config.color[1], config.color[2]);
    
    if (hasCustomFont) {
      doc.setFont("Roboto", config.style);
    } else {
      doc.setFont("helvetica", config.style);
    }

    const splitText = doc.splitTextToSize(item.text, contentWidth);
    // Fix: Using the leading property which is now guaranteed to be present on the config union member
    const lineHeight = (config.size * (config.leading || 1.2)) / 2.83; // pt to mm
    const itemHeight = splitText.length * lineHeight;

    // Page overflow check
    if (yPos + itemHeight > pageHeight - MARGIN) {
      doc.addPage();
      yPos = 30;
    }

    // Fix: Using the leading property which is now guaranteed to be present on the config union member
    doc.text(splitText, MARGIN, yPos, { lineHeightFactor: config.leading || 1.2 });
    yPos += itemHeight + (item.type === 'p' ? 8 : 4);
    
    // Extra spacing after paragraphs
    if (item.type === 'p') yPos += 2;
  }

  // Apply templates to all pages
  const totalPages = doc.internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    drawPageDecoration(doc, i, totalPages, hasCustomFont);
  }

  return doc;
};

export const exportCoverLetter = async (companyName: string, text: string, titleLabel: string = 'KÍSÉRŐLEVÉL') => {
  const content: ContentItem[] = [
    { type: 'h2', text: titleLabel },
    { type: 'p', text: text }
  ];
  const filename = `JobRadar_Executive_CoverLetter_${companyName.replace(/\s+/g, '_')}.pdf`;
  const doc = await createStyledPdf(`EXECUTIVE COVER LETTER DRAFT`, content);
  doc.save(filename);
};

export const exportActionPlan = async (companyName: string, steps: string[], titleLabel: string = 'STRATÉGIAI 90 NAPOS TERV', phaseLabel: string = 'FÁZIS') => {
  const content: ContentItem[] = [];
  
  steps.forEach((step, i) => {
    content.push({ type: 'h2', text: `${i + 1}. ${phaseLabel}` });
    content.push({ type: 'p', text: step });
  });

  const filename = `JobRadar_Strategic_Plan_${companyName.replace(/\s+/g, '_')}.pdf`;
  const doc = await createStyledPdf(`90-DAY STRATEGIC IMPACT PLAN`, content);
  doc.save(filename);
};
