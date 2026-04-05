import React, { useEffect, useState } from 'react'
import Navbar from '../../../Components/Navbar.jsx'
import { Link, useParams, useNavigate } from 'react-router-dom';

import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  FileText,
  FolderIcon,
  GraduationCap,
  Sparkles,
  User
} from 'lucide-react';

import PersonalInfoForm from '../ResumeForms/PersonalInfoForm.jsx';
import ResumePreview from '../ResumeEssentials/ResumePreview';
import TemplateSelector from '../templates/TemplateSelector.jsx';
import ColorPicker from '../ResumeUtils/ColorPicker.jsx';
import FontPicker from '../ResumeUtils/Fontpicker.jsx';
import Summary from '../ResumeForms/Summary.jsx';
import Experience from '../ResumeForms/Experience';
import Education from '../ResumeForms/Education';
import Project from '../ResumeForms/Project.jsx';
import Skills from '../ResumeForms/Skills';
import Loading from '../../../Components/Loading.jsx';
import { toast } from 'react-toastify';
import { useUser } from '@clerk/clerk-react';
import Download from '../../../Components/Buttons/Downloadbtt.jsx';


// ── Helper: detect which format the skills array is in ──────
const isATSSkills = (skills) =>
  Array.isArray(skills) && skills.length > 0 &&
  typeof skills[0] === 'object' && skills[0]?.category !== undefined;

const isSimpleSkills = (skills) =>
  Array.isArray(skills) && skills.length > 0 && typeof skills[0] === 'string';

// Convert simple string[] → ATS [{category, skills:[]}]
const toATSFormat = (skills) => [{
  category: 'Technical Skills',
  skills: skills.map(s => ({ name: s, primary: false }))
}];

// Convert ATS → simple string[]
const toSimpleFormat = (skills) =>
  skills.flatMap(cat => (cat.skills || []).map(s => (typeof s === 'string' ? s : s.name)));

const ResumeCreator = () => {

  const { isSignedIn, user, isLoaded } = useUser();
  const navigate = useNavigate();
  const { resumeId } = useParams();
   const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
   const STORAGE_KEY = user?.id ? `resume_${user.id}_${resumeId}` : null;
  

  const [isDownloading, setIsDownloading] = useState(false);
  const [resumeData, setResumeData] = useState({
    _id: '',
    title: '',
    personal_info: { image: null },
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#475569",
    font: "inter",
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  const activeSection = sections[activeSectionIndex];

    useEffect(() => {
    if (isLoaded && isSignedIn && STORAGE_KEY) {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          setResumeData(JSON.parse(saved));
        } catch (e) {
          console.error('Failed to parse saved resume:', e);
        }
      }
    }
  }, [isLoaded, isSignedIn, STORAGE_KEY]);

    useEffect(() => {
    if (STORAGE_KEY) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
    }
  }, [resumeData, STORAGE_KEY])



useEffect(() => {
    if (isLoaded && !isSignedIn) {
      toast.error("Please login to create resume!");
      navigate('/');
    }
  }, [isLoaded, isSignedIn, navigate]);

   if (!isLoaded) {
    return <Loading />;
  }

  // Redirect if not signed in (after isLoaded is true)
  if (!isSignedIn) {
    return null;
  }

  // auto-convert skills when switching templates ──────
  const handleTemplateChange = (newTemplate) => {
    setResumeData(prev => {
      let skills = prev.skills ?? [];

      if (newTemplate === 'ats') {
        if (isSimpleSkills(skills)) {
          skills = toATSFormat(skills);
        }
      } else {
        if (isATSSkills(skills)) {
          skills = toSimpleFormat(skills);
        }
      }

      return { ...prev, template: newTemplate, skills };
    });
  };

  const downloadResume = () => {
    window.print();
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Back Button */}
        <Link
          to={`/resume/${user?.id}`}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Go Back
        </Link>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mt-6">

          {/* LEFT SIDE - EDITOR */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-7 relative">

              {/* Progress Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 rounded-t-xl" />
              <div
                className="absolute top-0 left-0 h-1 bg-linear-to-r from-blue-300 to-blue-900 rounded-t-xl transition-all duration-500"
                style={{
                  width: `${(activeSectionIndex / (sections.length - 1)) * 100}%`
                }}
              />

              {/* Navigation + Settings */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 mt-4 border-b pb-4">

                {/* Toolbar: Template | Accent | Font */}
                <div className="flex items-center gap-3 flex-wrap">
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={handleTemplateChange}
                  />
                  <ColorPicker
                    selectedColor={resumeData.accent_color}
                    onChange={(color) =>
                      setResumeData(prev => ({ ...prev, accent_color: color }))
                    }
                  />
                  <FontPicker
                    selectedFont={resumeData.font}
                    onChange={(font) =>
                      setResumeData(prev => ({ ...prev, font }))
                    }
                  />
                </div>

              </div>

              {/* Dynamic Form Sections */}
              <div className="space-y-6">
                {activeSection.id === 'personal' && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(data) =>
                      setResumeData(prev => ({ ...prev, personal_info: data }))
                    }
                  />
                )}

                {activeSection.id === 'summary' && (
                  <Summary
                    data={resumeData.professional_summary}
                    onChange={(data) =>
                      setResumeData(prev => ({ ...prev, professional_summary: data }))
                    }
                  />
                )}

                {activeSection.id === 'experience' && (
                  <Experience
                    data={resumeData.experience}
                    onChange={(data) =>
                      setResumeData(prev => ({ ...prev, experience: data }))
                    }
                  />
                )}

                {activeSection.id === 'education' && (
                  <Education
                    data={resumeData.education}
                    onChange={(data) =>
                      setResumeData(prev => ({ ...prev, education: data }))
                    }
                    template={resumeData.template}
                  />
                )}

                {activeSection.id === 'projects' && (
                  <Project
                    data={resumeData.project}
                    onChange={(data) =>
                      setResumeData(prev => ({ ...prev, project: data }))
                    }
                  />
                )}

                {activeSection.id === 'skills' && (
                  <Skills
                    data={resumeData.skills}
                    onChange={(data) =>
                      setResumeData(prev => ({ ...prev, skills: data }))
                    }
                    template={resumeData.template}
                  />
                )}
              </div>

              {/* Prev / Next */}
              <div className="flex items-center gap-2 justify-end mt-5.75">
                {activeSectionIndex !== 0 && (
                  <button
                    onClick={() => setActiveSectionIndex(prev => prev - 1)}
                    className="flex items-center gap-1 text-sm px-3 py-2 rounded-md hover:text-blue-950 transition bg-[#f7f7f7]"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Prev
                  </button>
                )}

                <button
                  onClick={() =>
                    setActiveSectionIndex(prev =>
                      Math.min(prev + 1, sections.length - 1)
                    )
                  }
                  className={`flex items-center gap-1 text-sm px-3 py-2 rounded-md bg-blue-950 text-white hover:text-blue-950 transition hover:bg-[#f7f7f7] ${activeSectionIndex === sections.length - 1
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                    }`}
                  disabled={activeSectionIndex === sections.length - 1}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE - PREVIEW */}
          <div className="lg:col-span-7 w-full mt-6 lg:mt-0">

            {/* Download button */}
            <div className="flex justify-end mb-4">
              <Download onClick={downloadResume} />
            </div>

            <div className="bg-gray-100 p-4 sm:p-6 rounded-xl overflow-x-auto">
              <ResumePreview
                data={resumeData}
                template={resumeData.template}
                accentColor={resumeData.accent_color}
                font={resumeData.font}
              />
            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default ResumeCreator;