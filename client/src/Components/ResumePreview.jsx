import React from 'react'
import ClassicTemplate from './templates/ClassicTemplate'
import ModernTemplate from './templates/ModernTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'
import ATSTemplate from './templates/AtsTemplate'

const ResumePreview = ({ data, template, accentColor, classes = '' }) => {

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
      >
        {renderTemplate()}
      </div>

      <style>
        {`
          @page {
            size: letter;
            margin: 0;
          }

          @media print {
            html, body {
              height: 11in;
              width: 8.5in;
              overflow: hidden;
            }

            body * {
              visibility: hidden;
            }

            #resume-preview, #resume-preview * {
              visibility: visible;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
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
              background-clip: padding-box;
            }
          }
        `}
      </style>

    </div>
  )
}

export default ResumePreview