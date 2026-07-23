const PAGE_MARGIN = 32; // pt
const BLOCK_GAP = 14; // pt, vertical space between stacked blocks on a page
const BG_RGB = [18, 12, 34]; // #120c22

function fillPageBackground(pdf) {
  const w = pdf.internal.pageSize.getWidth();
  const h = pdf.internal.pageSize.getHeight();
  pdf.setFillColor(...BG_RGB);
  pdf.rect(0, 0, w, h, 'F');
}

/**
 * Renders one already-captured canvas into the PDF, slicing it across as
 * many pages as needed. Only used as a fallback for a single block that's
 * taller than one full page on its own (e.g. a very long opening scene) —
 * the normal path never needs this, since blocks are captured individually
 * and only whole blocks get pushed to the next page.
 */
function addSlicedCanvas(pdf, canvas, usableWidth, usableHeight) {
  const imgWidth = usableWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  const imgData = canvas.toDataURL('image/jpeg', 0.92);

  let renderedHeight = 0;
  let first = true;

  while (renderedHeight < imgHeight) {
    if (!first) {
      pdf.addPage();
      fillPageBackground(pdf);
    }
    pdf.addImage(imgData, 'JPEG', PAGE_MARGIN, PAGE_MARGIN - renderedHeight, imgWidth, imgHeight);
    renderedHeight += usableHeight;
    first = false;
  }

  return imgHeight % usableHeight === 0 ? usableHeight : imgHeight % usableHeight;
}

/**
 * Captures each element in `blocks` as its own image and lays them out
 * stacked in a single-column A4 PDF, starting a new page whenever the next
 * block wouldn't fully fit in the remaining space. Because each block
 * (a section, a title, an entry group) is captured whole, page breaks land
 * between blocks instead of slicing straight through a paragraph — so text
 * never gets cut off mid-line the way a single full-page screenshot would.
 *
 * jsPDF and html2canvas are dynamically imported so they load only when
 * someone actually clicks "Export as PDF", not on initial page load.
 */
export async function exportBlocksAsPdf(blocks, filename = 'mythforge-story-kit.pdf') {
  const elements = (blocks || []).filter(Boolean);
  if (!elements.length) throw new Error('exportBlocksAsPdf: no blocks provided');

  const [{ jsPDF }, { default: html2canvas }] = await Promise.all([
    import('jspdf'),
    import('html2canvas-pro'),
  ]);

  const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const usableWidth = pageWidth - PAGE_MARGIN * 2;
  const usableHeight = pageHeight - PAGE_MARGIN * 2;

  fillPageBackground(pdf);
  let cursorY = PAGE_MARGIN;

  for (const el of elements) {
    const canvas = await html2canvas(el, {
      backgroundColor: `rgb(${BG_RGB.join(',')})`,
      scale: Math.min(2, window.devicePixelRatio || 1.5),
      useCORS: true,
    });

    const imgWidth = usableWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    if (imgHeight > usableHeight) {
      // Single block too tall for one page on its own — start it at the
      // top of a fresh page and slice just that block.
      if (cursorY > PAGE_MARGIN) {
        pdf.addPage();
        fillPageBackground(pdf);
      }
      const leftoverOnLastPage = addSlicedCanvas(pdf, canvas, usableWidth, usableHeight);
      cursorY = PAGE_MARGIN + leftoverOnLastPage + BLOCK_GAP;
      continue;
    }

    if (cursorY + imgHeight > PAGE_MARGIN + usableHeight && cursorY > PAGE_MARGIN) {
      pdf.addPage();
      fillPageBackground(pdf);
      cursorY = PAGE_MARGIN;
    }

    const imgData = canvas.toDataURL('image/jpeg', 0.92);
    pdf.addImage(imgData, 'JPEG', PAGE_MARGIN, cursorY, imgWidth, imgHeight);
    cursorY += imgHeight + BLOCK_GAP;
  }

  pdf.save(filename);
}
