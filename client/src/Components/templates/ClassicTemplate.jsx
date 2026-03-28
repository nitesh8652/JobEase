import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

// ── Helper: normalise skills to a flat string[] regardless of format ──
const flattenSkills = (skills) => {
  if (!Array.isArray(skills) || skills.length === 0) return [];
  if (typeof skills[0] === 'string') return skills;
  // ATS categorised format
  return skills.flatMap(cat =>
    (cat.skills || []).map(s => (typeof s === 'string' ? s : s.name))
  );
};

const ClassicTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const formatRange = (start, end, isCurrent) => {
    if (!start) return "";
    const format = (dateStr) => {
      if (!dateStr) return "";
      const [year, month] = dateStr.split("-");
      return new Date(year, month - 1).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });
    };
    return `${format(start)} – ${isCurrent ? "Present" : format(end)}`;
  };

  const skillList = flattenSkills(data.skills);

  return (
    <div className="max-w-4xl mx-auto px-6 py-6 bg-white text-gray-800 text-sm leading-snug">

      {/* Header */}
      <header
        className="text-center mb-6 pb-4 border-b"
        style={{ borderColor: accentColor }}
      >
        <h1
          className="text-2xl font-bold mb-1"
          style={{ color: accentColor }}
        >
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-gray-600">
          {data.personal_info?.email && (
            <div className="flex items-center gap-1">
              <Mail className="size-3" />
              <span>{data.personal_info.email}</span>
            </div>
          )}
          {data.personal_info?.phone && (
            <div className="flex items-center gap-1">
              <Phone className="size-3" />
              <span>{data.personal_info.phone}</span>
            </div>
          )}
          {data.personal_info?.location && (
            <div className="flex items-center gap-1">
              <MapPin className="size-3" />
              <span>{data.personal_info.location}</span>
            </div>
          )}
          {data.personal_info?.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="size-3" />
              <span className="break-all">{data.personal_info.linkedin}</span>
            </div>
          )}
          {data.personal_info?.website && (
            <div className="flex items-center gap-1">
              <Globe className="size-3" />
              <span className="break-all">{data.personal_info.website}</span>
            </div>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {data.professional_summary && (
        <section className="mb-5 break-inside-avoid">
          <h2 className="text-base font-semibold mb-2" style={{ color: accentColor }}>
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-gray-700 text-sm break-words">{data.professional_summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <section className="mb-5 break-inside-avoid">
          <h2 className="text-base font-semibold mb-3" style={{ color: accentColor }}>
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-3">
            {data.experience.map((exp, index) => (
              <div key={index} className="pl-3 border-l" style={{ borderColor: accentColor }}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-sm">{exp.position}</h3>
                    <p className="text-gray-700 text-sm">{exp.company}</p>
                  </div>
                  <div className="text-xs text-gray-600 text-right">
                    {formatDate(exp.start_date)} –{" "}
                    {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </div>
                </div>
                {exp.description && (
                  <div className="text-gray-700 text-sm whitespace-pre-line">{exp.description}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.project?.length > 0 && (
        <section className="mb-5 break-inside-avoid">
          <h2 className="text-base font-semibold mb-3" style={{ color: accentColor }}>
            PROJECTS
          </h2>
          <div className="space-y-3">
            {data.project.map((proj, index) => (
              <div key={index} className="pl-3 border-l" style={{ borderColor: accentColor }}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-sm">{proj.name}</h3>
                  {proj.type && (
                    <span className="text-xs uppercase text-gray-500">{proj.type}</span>
                  )}
                </div>
                {proj.description && (
                  <p className="text-gray-700 text-sm whitespace-pre-line mt-1">{proj.description}</p>
                )}
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs underline mt-1 inline-block"
                    style={{ color: accentColor }}
                  >
                    View →
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <section className="mb-5 break-inside-avoid">
          <h2 className="text-base font-semibold mb-3" style={{ color: accentColor }}>
            EDUCATION
          </h2>
          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div key={index} className="pl-3 border-l" style={{ borderColor: accentColor }}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-sm">{edu.institute}</h3>
                    {edu.degree && <p className="text-gray-700 text-sm">{edu.degree}</p>}
                    {edu.cgpa && !edu.has_backlogs && (
                      <p className="text-xs text-gray-600">CGPA: {edu.cgpa}</p>
                    )}
                  </div>
                  <div className="text-xs text-gray-600 text-right">
                    {formatRange(edu.start_date, edu.end_date, edu.is_current)}
                  </div>
                </div>
                {edu.description && (
                  <p className="mt-1 text-gray-700 text-xs whitespace-pre-line">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills – FIX: use flattened string list */}
      {skillList.length > 0 && (
        <section className="break-inside-avoid">
          <h2 className="text-base font-semibold mb-3" style={{ color: accentColor }}>
            SKILLS
          </h2>
          <div className="flex flex-wrap gap-1">
            {skillList.map((skill, index) => (
              <span key={index} className="px-2 py-0.5 border text-xs rounded">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;