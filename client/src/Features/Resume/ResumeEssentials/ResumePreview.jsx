import React, { useEffect } from 'react'
import ClassicTemplate from '../templates/ClassicTemplate'
import ModernTemplate from '../templates/ModernTemplate'
import MinimalTemplate from '../templates/MinimalTemplate'
import MinimalImageTemplate from '../templates/MinimalImageTemplate'
import ATSTemplate from '../templates/ATSTemplate'
import { FONT_MAP } from '../ResumeUtils/Fontpicker'

// Inject a Google Fonts <link> into <head> dynamically
const injectGoogleFont = (href) => {
  if (!href) return;
  const id = `gfont-${btoa(href).slice(0, 12)}`;
  if (!document.getElementById(id)) {
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }
};

const ResumePreview = ({ data, template, accentColor, font = 'inter', classes = '' }) => {

  // Resolve font metadata from the key
  const fontMeta = FONT_MAP.find((f) => f.value === font) || FONT_MAP[0];

  // Inject font into <head> whenever selection changes
  useEffect(() => {
    if (fontMeta.googleImport) {
      injectGoogleFont(fontMeta.googleImport);
    }
  }, [fontMeta]);

  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />
      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />
      case "ats":
        return <ATSTemplate data={data} accentColor={accentColor} />
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />
    }
  }

  return (
    <div className="w-full bg-gray-100">

      <div
        id="resume-preview"
        className={"border border-gray-500 print:shadow-none print:border-none mt-3 " + classes}
        // Apply selected font to the entire resume
        style={{ fontFamily: fontMeta.fontFamily }}
      >
        {renderTemplate()}
      </div>


<style>
  {`
    ${fontMeta.googleImport ? `@import url('${fontMeta.googleImport}');` : ''}

    @page {
      size: A4;
      margin: 0.3in 0;
    }

    @media print {
      html, body {
        margin: 0;
        padding: 0;
      }

      body * {
        visibility: hidden;
      }

      #resume-preview, #resume-preview * {
        visibility: visible;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        font-family: ${fontMeta.fontFamily} !important;
      }

      #resume-preview {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: auto;
        margin: 0;
        padding: 0;
        box-shadow: none !important;
        border: none !important;
      }
    }
  `}
</style>


    </div>
  )
}

export default ResumePreview