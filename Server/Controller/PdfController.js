import puppeteer from 'puppeteer';

export const generatePdf = async (req, res) => {
  try {
    const { html, css, fontUrl } = req.body;

    if (!html) {
      return res.json({ success: false, message: 'HTML content is required' });
    }

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Inject CSS and fonts
    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          ${fontUrl ? `<link href="${fontUrl}" rel="stylesheet">` : ''}
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: inherit; }
            @page { margin: 0.5in; }
            ${css || ''}
          </style>
        </head>
        <body>
          ${html}
        </body>
      </html>
    `;

    await page.setContent(fullHtml, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'A4', margin: { top: '0.5in', bottom: '0.5in', left: '0.5in', right: '0.5in' } });

    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="resume.pdf"');
    res.send(pdfBuffer);

  } catch (error) {
    console.error('PDF generation error:', error);
    res.json({ success: false, message: error.message });
  }
};
