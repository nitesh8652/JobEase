const MinimalTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short"
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white text-gray-900 font-light">
      {/* Header */}
      <header className="mb-5">
        <h1 className="text-3xl font-thin mb-2 tracking-wide">
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {data.personal_info?.email && <span>{data.personal_info.email}</span>}
          {data.personal_info?.phone && <span>{data.personal_info.phone}</span>}
          {data.personal_info?.location && <span>{data.personal_info.location}</span>}
          {data.personal_info?.linkedin && (
            <span className="break-all">{data.personal_info.linkedin}</span>
          )}
          {data.personal_info?.website && (
            <span className="break-all">{data.personal_info.website}</span>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {data.professional_summary && (
        <section className="mb-5 break-inside-avoid">
          <p className="text-sm text-gray-700 leading-relaxed">
            {data.professional_summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm uppercase tracking-widest mb-3 font-medium" style={{ color: accentColor }}>
            Experience
          </h2>

          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index} className="break-inside-avoid">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-medium">{exp.position}</h3>
                  <span className="text-xs text-gray-500">
                    {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{exp.company}</p>
                {exp.description && (
                  <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.project && data.project.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm uppercase tracking-widest mb-3 font-medium" style={{ color: accentColor }}>
            Projects
          </h2>
          
          <div className="space-y-4">
            {data.project.map((proj, index) => (
              <div key={index} className="flex flex-col gap-1 break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-base font-medium">
                    {proj.name}
                  </h3>
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs underline"
                      style={{ color: accentColor }}
                    >
                      View Project →
                    </a>
                  )}
                </div>

                {proj.type && (
                  <span className="text-xs uppercase tracking-widest text-gray-500">
                    {proj.type}
                  </span>
                )}

                {proj.description && (
                  <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm uppercase tracking-widest mb-3 font-medium" style={{ color: accentColor }}>
            Education
          </h2>

          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div key={index} className="flex justify-between items-baseline break-inside-avoid">
                <div>
                  <h3 className="text-base font-medium">
                    {edu.degree}
                  </h3>

                  {edu.institute && (
                    <p className="text-sm text-gray-600">
                      {edu.institute}
                    </p>
                  )}

                  {edu.cgpa && !edu.has_backlogs && (
                    <p className="text-xs text-gray-500 mt-1">
                      CGPA: {edu.cgpa}
                    </p>
                  )}

                  {edu.has_backlogs && (
                    <p className="text-xs text-gray-500 mt-1">
                      Backlogs
                    </p>
                  )}

                  {edu.description && (
                    <p className="text-sm text-gray-700 mt-1 whitespace-pre-line leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                </div>

                <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                  {formatDate(edu.start_date)} – {edu.is_current ? "Present" : formatDate(edu.end_date)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section className="break-inside-avoid">
          <h2 className="text-sm uppercase tracking-widest mb-3 font-medium" style={{ color: accentColor }}>
            Skills
          </h2>

          <div className="text-sm text-gray-700 leading-relaxed">
            {data.skills.join(" • ")}
          </div>
        </section>
      )}
    </div>
  );
}

export default MinimalTemplate;