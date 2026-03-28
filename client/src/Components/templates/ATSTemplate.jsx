import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";

const ATSTemplate = ({ data, accentColor }) => {
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
    const s = formatDate(start);
    const e = isCurrent ? "Present" : formatDate(end);
    return `${s} – ${e}`;
  };

  // Split description into bullet lines
  const toLines = (text) =>
    text
      ? text
          .split("\n")
          .map((l) => l.trim())
          .filter(Boolean)
      : [];

  const accent = accentColor || "#1a1a2e";

  return (
    <div className="max-w-[780px] mx-auto bg-white text-gray-900 text-[13px] leading-[1.5] px-10 py-8 font-sans">

      {/* ── HEADER ─────────────────────────────────────────── */}
      <header className="text-center mb-4">
        <h1
          className="text-[26px] font-bold tracking-wide uppercase mb-1"
          style={{ color: accent }}
        >
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        {data.personal_info?.profession && (
          <p className="text-[13px] font-semibold text-gray-600 uppercase tracking-widest mb-2">
            {data.personal_info.profession}
          </p>
        )}

        {/* Contact row */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11.5px] text-gray-700">
          {data.personal_info?.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {data.personal_info.location}
            </span>
          )}
          {data.personal_info?.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {data.personal_info.phone}
            </span>
          )}
          {data.personal_info?.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {data.personal_info.email}
            </span>
          )}
          {data.personal_info?.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="w-3 h-3" />
              <a
                href={data.personal_info.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                style={{ color: accent }}
              >
                {data.personal_info.linkedin.replace(/^https?:\/\/(www\.)?/, "")}
              </a>
            </span>
          )}
          {data.personal_info?.website && (
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              <a
                href={data.personal_info.website}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                style={{ color: accent }}
              >
                {data.personal_info.website.replace(/^https?:\/\/(www\.)?/, "")}
              </a>
            </span>
          )}
        </div>
      </header>

      {/* ── DIVIDER ─────────────────────────────────────────── */}
      {/* <hr className="border-t-2 mb-3" style={{ borderColor: accent }} /> */}

      {/* ── PROFESSIONAL SUMMARY ────────────────────────────── */}
      {data.professional_summary && (
        <Section title="Summary" accent={accent}>
          <p className="text-gray-800 text-sm leading-relaxed">
            {data.professional_summary}
          </p>
        </Section>
      )}

      {/* ── EDUCATION ──────────────────────────────────────── */}
      {data.education?.length > 0 && (
        <Section title="Education" accent={accent}>
          {data.education.map((edu, i) => (
            <div key={i} className="mb-2 last:mb-0">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-gray-900">{edu.institute}</span>
                <span className="text-gray-600 text-[11.5px] whitespace-nowrap ml-4">
                  {formatRange(edu.start_date, edu.end_date, edu.is_current)}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[12px] text-gray-700">
                {edu.degree && <span className="italic">{edu.degree}</span>}
                {edu.cgpa && !edu.has_backlogs && (
                  <span className="text-gray-500">• CGPA: {edu.cgpa}</span>
                )}
                {edu.has_backlogs && (
                  <span className="text-gray-500">• Backlogs</span>
                )}
              </div>
              {edu.description && (
                <ul className="mt-1 pl-4 space-y-0.5">
                  {toLines(edu.description).map((line, j) => (
                    <BulletLine key={j} text={line} />
                  ))}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

  
{/* ── TECHNICAL SKILLS ──────────────────────────────── */}
{data.skills?.length > 0 && (
  <Section title="Technical Skills" accent={accent}>
    {Array.isArray(data.skills) && data.skills[0]?.category ? (
      // ATS categorized format
      <div className="space-y-1">
        {data.skills.map((category, i) => (
          <p key={i} className="text-gray-800 text-[12.5px] leading-relaxed">
            <span className="font-semibold">{category.category}:</span>{" "}
            {Array.isArray(category.skills) ? category.skills
              .map(s => s.primary ? `${s.name}` : s.name)
              .join(", ") : ""}
          </p>
        ))}
      </div>
    ) : (
      // Simple format
      <p className="text-gray-800 text-[12.5px] leading-relaxed">
        {Array.isArray(data.skills) ? data.skills.join(" • ") : ""}
      </p>
    )}
  </Section>
)}


      {/* ── PROJECTS ──────────────────────────────────────── */}
      {data.project?.length > 0 && (
        <Section title="Projects" accent={accent}>
          {data.project.map((proj, i) => (
            <div key={i} className="mb-3 last:mb-0">
              <div className="flex justify-between items-baseline gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-gray-900">{proj.name}</span>
                  {proj.type && (
                    <span className="text-gray-500 text-[11px] font-medium tracking-wide">
                      | {proj.type}
                    </span>
                  )}
                </div>
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] underline whitespace-nowrap shrink-0"
                    style={{ color: accent }}
                  >
                    View →
                  </a>
                )}
              </div>
              {proj.description && (
                <ul className="mt-0.5 pl-4 space-y-0.5">
                  {toLines(proj.description).map((line, j) => (
                    <BulletLine key={j} text={line} />
                  ))}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* ── EXPERIENCE ─────────────────────────────────────── */}
      {data.experience?.length > 0 && (
        <Section title="Experience" accent={accent}>
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-3 last:mb-0">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-gray-900">{exp.company}</span>
                <span className="text-gray-600 text-[11.5px] whitespace-nowrap ml-4">
                  {formatRange(exp.start_date, exp.end_date, exp.is_current)}
                </span>
              </div>
              <p className="text-[12px] italic text-gray-600">{exp.position}</p>
              {exp.description && (
                <ul className="mt-0.5 pl-4 space-y-0.5">
                  {toLines(exp.description).map((line, j) => (
                    <BulletLine key={j} text={line} />
                  ))}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

    </div>
  );
};

/* ── Reusable Section wrapper ────────────────────────────── */
const Section = ({ title, accent, children }) => (
  <section className="mb-4 break-inside-avoid">
    <div className="flex items-center gap-2 mb-1.5">
      <h2
        className="text-[13px] font-extrabold uppercase tracking-widest whitespace-nowrap"
        style={{ color: accent }}
      >
        {title}
      </h2>
    </div>
      <div className="flex-1 border-t pt-[5px]" style={{ borderColor: accent }} />
    {children}
  </section>
);

/* ── Bullet line ─────────────────────────────────────────── */
const BulletLine = ({ text }) => (
  <li className="flex items-start gap-1.5 text-[12px] text-gray-800">
    <span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-gray-500 shrink-0" />
    <span>{text}</span>
  </li>
);

export default ATSTemplate;