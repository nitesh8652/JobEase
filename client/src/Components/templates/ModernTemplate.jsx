import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ModernTemplate = ({ data, accentColor }) => {
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
      const [y, m] = dateStr.split("-");
      return new Date(y, m - 1).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });
    };
    return `${format(start)} – ${isCurrent ? "Present" : format(end)}`;
  };

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-800 text-sm leading-snug">

      {/* Header */}
      <header
        className="px-6 py-5 text-white"
        style={{ backgroundColor: accentColor }}
      >
        <h1 className="text-3xl font-light mb-2">
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs">
          {data.personal_info?.email && (
            <div className="flex items-center gap-2">
              <Mail className="size-3" />
              <span>{data.personal_info.email}</span>
            </div>
          )}
          {data.personal_info?.phone && (
            <div className="flex items-center gap-2">
              <Phone className="size-3" />
              <span>{data.personal_info.phone}</span>
            </div>
          )}
          {data.personal_info?.location && (
            <div className="flex items-center gap-2">
              <MapPin className="size-3" />
              <span>{data.personal_info.location}</span>
            </div>
          )}
          {data.personal_info?.linkedin && (
            <a
              target="_blank"
              rel="noreferrer"
              href={data.personal_info.linkedin}
              className="flex items-center gap-2"
            >
              <Linkedin className="size-3" />
              <span className="break-all">
                {data.personal_info.linkedin.replace("https://www.", "")}
              </span>
            </a>
          )}
          {data.personal_info?.website && (
            <a
              target="_blank"
              rel="noreferrer"
              href={data.personal_info.website}
              className="flex items-center gap-2"
            >
              <Globe className="size-3" />
              <span className="break-all">
                {data.personal_info.website.replace("https://", "")}
              </span>
            </a>
          )}
        </div>
      </header>

      <div className="px-6 py-6">

        {/* Professional Summary */}
        {data.professional_summary && (
          <section className="mb-6 break-inside-avoid">
            <h2 className="text-lg font-medium mb-2 border-b border-gray-200 pb-1">
              Professional Summary
            </h2>
            <p className="text-gray-700 text-sm">
              {data.professional_summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <section className="mb-6 break-inside-avoid">
            <h2 className="text-lg font-medium mb-3 border-b border-gray-200 pb-1">
              Experience
            </h2>

            <div className="space-y-4">
              {data.experience.map((exp, index) => (
                <div
                  key={index}
                  className="relative pl-4 border-l"
                  style={{ borderLeftColor: accentColor }}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-sm">
                        {exp.position}
                      </h3>
                      <p
                        className="text-sm font-medium"
                        style={{ color: accentColor }}
                      >
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatDate(exp.start_date)} –{" "}
                      {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </div>
                  </div>

                  {exp.description && (
                    <div className="text-gray-700 text-sm whitespace-pre-line">
                      {exp.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.project?.length > 0 && (
          <section className="mb-6 break-inside-avoid">
            <h2 className="text-lg font-medium mb-3 border-b border-gray-200 pb-1">
              Projects
            </h2>

            <div className="space-y-4">
              {data.project.map((p, index) => (
                <div
                  key={index}
                  className="relative pl-4 border-l"
                  style={{ borderLeftColor: accentColor }}
                >
                  <h3 className="font-semibold text-sm">{p.name}</h3>

                  {p.type && (
                    <p
                      className="text-xs font-medium"
                      style={{ color: accentColor }}
                    >
                      {p.type}
                    </p>
                  )}

                  {p.description && (
                    <div className="text-gray-700 text-sm whitespace-pre-line mt-1">
                      {p.description}
                    </div>
                  )}

                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs underline mt-1 inline-block"
                      style={{ color: accentColor }}
                    >
                      Link →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <section className="mb-6 break-inside-avoid">
            <h2 className="text-lg font-medium mb-3 border-b border-gray-200 pb-1">
              Education
            </h2>

            <div className="space-y-3">
              {data.education.map((edu, index) => (
                <div
                  key={index}
                  className="relative pl-4 border-l"
                  style={{ borderLeftColor: accentColor }}
                >
                  <h3 className="font-semibold text-sm">
                    {edu.institute}
                  </h3>

                  <p
                    className="text-sm"
                    style={{ color: accentColor }}
                  >
                    {edu.degree}
                  </p>

                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>
                      {formatRange(
                        edu.start_date,
                        edu.end_date,
                        edu.is_current
                      )}
                    </span>

                    {edu.cgpa && !edu.has_backlogs && (
                      <span>CGPA: {edu.cgpa}</span>
                    )}
                  </div>

                  {edu.description && (
                    <p className="text-gray-700 text-xs whitespace-pre-line mt-1">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills?.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className="text-lg font-medium mb-3 border-b border-gray-200 pb-1">
              Skills
            </h2>

            <div className="flex flex-wrap gap-1">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 text-xs text-white rounded"
                  style={{ backgroundColor: accentColor }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ModernTemplate;