import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { Link, useParams } from 'react-router-dom';
import { dummyResumeData } from '../assets/assets';
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, DownloadCloudIcon, FileText, FolderIcon, GraduationCap, Sparkles, User } from 'lucide-react';
import PersonalInfoForm from '../Components/PersonalInfoForm';
import ResumePreview from '../Components/ResumePreview';
import TemplateSelector from '../Components/templates/TemplateSelector';
import ColorPicker from '../Components/ColorPicker';
import Summary from '../Components/Summary';
import Experience from '../Components/Experience';
import Education from '../Components/Education';
import Project from '../Components/Project';
import Skills from '../Components/Skills';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '@clerk/clerk-react';

const ResumeCreator = () => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
    const { getToken } = useAuth();
    const { resumeId } = useParams();

    const STORAGE_KEY = `resume_${resumeId}`;

    const [resumeData, setResumeData] = useState({
        _id: '',
        title: '',
        personal_info: {
            image: null,
            autoFocus: false
        },
        professional_summary: "",
        experience: [],
        education: [],
        project: [],
        skills: [],
        template: "classic",
        accent_color: "#3B82F6",
    });

    const [activeSectionIndex, setActiveSectionIndex] = useState(0);
    const [removeBackground, setRemoveBackground] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const sections = [
        { id: "personal", name: "Personal Info", icon: User },
        { id: "summary", name: "Summary", icon: FileText },
        { id: "experience", name: "Experience", icon: Briefcase },
        { id: "education", name: "Education", icon: GraduationCap },
        { id: "projects", name: "Projects", icon: FolderIcon },
        { id: "skills", name: "Skills", icon: Sparkles },
    ];

    const activeSection = sections[activeSectionIndex];

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            setResumeData(JSON.parse(saved));
        } else {
            const resume = dummyResumeData.find(r => r._id === resumeId);
            if (resume) {
                setResumeData(resume);
            }
        }
    }, []);

    // Save to localStorage whenever resumeData changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
    }, [resumeData, STORAGE_KEY]);

    const downloadResume = () => {
        window.print();
    };

    const saveResume = async () => {
        setIsSaving(true);
        try {
            const token = await getToken();

            if (!token) {
                toast.error("Authentication required. Please log in.");
                setIsSaving(false);
                return;
            }

            let updatedResumeData = structuredClone(resumeData);

            if (typeof resumeData.personal_info.image === 'object') {
                delete updatedResumeData.personal_info.image;
            }

            const formData = new FormData();
            const finalResumeId = resumeData._id || Date.now().toString();
            formData.append('resumeId', finalResumeId);
            formData.append('resumeData', JSON.stringify(updatedResumeData));

            if (removeBackground) {
                formData.append('removeBackground', 'true');
            }

            if (resumeData.personal_info.image && typeof resumeData.personal_info.image === 'object') {
                formData.append('image', resumeData.personal_info.image);
            }

            const { data } = await axios.post(
                `${backendUrl}/api/resume/update-resume`,
                formData,
                {
                    headers: {
                        token: token
                    }
                }
            );

            if (data.success || data.resume) {
                setResumeData(data.resume);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(data.resume));
                toast.success(data.message || "Resume saved successfully!");
            } else {
                toast.error(data.message || "Save failed");
            }

        } catch (error) {
            console.error("Error saving resume:", error);
            const errorMessage = error.response?.data?.message || "Server Error";
            toast.error(errorMessage);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <>
            <Navbar />
            <div>
                <div className='max-w-7xl mx-auto px-4 py-6'>
                    <Link to={'/resume/yourid'} className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all'>
                        <ArrowLeftIcon className='size-4' /> Go Back!
                    </Link>
                </div>

                <div className='max-w-7xl mx-auto px-4 pb-8'>
                    <div className='grid lg:grid-cols-12 gap-8'>
                        
                        {/* LEFT COLUMN: EDITOR */}
                        <div className='relative lg:col-span-5 rounded-lg '>
                            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-7 pt-1'>

                                {/* Progress Bar */}
                                <hr className='absolute top-0 left-0 right-0 border-2 border-gray-200' />
                                <hr className='absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-2000 ' style={{ width: `${activeSectionIndex * 100 / (sections.length - 1)}%` }} />

                                {/* Navigation & Settings */}
                                <div className='flex justify-between items-center mb-6 border-b border-gray-300 py-2'>
                                    <div className='flex items-center gap-4'>
                                        <TemplateSelector selectedTemplate={resumeData.template} onChange={(template) => setResumeData(prev => ({ ...prev, template }))} />
                                        <ColorPicker selectedColor={resumeData.accent_color} onChange={(color) => setResumeData(prev => ({ ...prev, accent_color: color }))} />
                                    </div>
                                    <div className='flex items-center'>
                                        {activeSectionIndex !== 0 && (
                                            <button onClick={() => setActiveSectionIndex((prevIndex) => Math.max(prevIndex - 1, 0))} className='flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-grey-600 hover:bg-gray-50 transition-all' disabled={activeSectionIndex === 0}>
                                                <ChevronLeft className='size-4' /> Previous
                                            </button>
                                        )}
                                        <button onClick={() => setActiveSectionIndex((prevIndex) => Math.min(prevIndex + 1, sections.length - 1))} className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-grey-600 hover:bg-gray-50 transition-all ${activeSectionIndex === sections.length - 1 && 'opacity-50'} `} disabled={activeSectionIndex === sections.length - 1}> Next
                                            <ChevronRight className='size-4' />
                                        </button>
                                    </div>
                                </div>

                                {/* Form Content */}
                                <div className='space-y-6' >
                                    {activeSection.id === 'personal' && (
                                        <PersonalInfoForm 
                                            data={resumeData.personal_info} 
                                            onChange={(data) => setResumeData(prev => ({ ...prev, personal_info: data }))} 
                                            removeBackground={removeBackground} 
                                            setRemoveBackground={setRemoveBackground}
                                            accentColor={resumeData.accent_color}
                                        />
                                    )}

                                    {activeSection.id === 'summary' && (
                                        <Summary
                                            data={resumeData.professional_summary}
                                            onChange={(data) => setResumeData(prev => ({ ...prev, professional_summary: data }))}
                                        />
                                    )}

                                    {activeSection.id === 'experience' && (
                                        <Experience
                                            data={resumeData.experience}
                                            onChange={(data) => setResumeData(prev => ({ ...prev, experience: data }))}
                                        />
                                    )}
                                    {activeSection.id === 'education' && (
                                        <Education
                                            data={resumeData.education}
                                            onChange={(data) => setResumeData(prev => ({ ...prev, education: data }))}
                                            template={resumeData.template}
                                        />
                                    )}
                                    {activeSection.id === 'projects' && (
                                        <Project
                                            data={resumeData.project}
                                            onChange={(data) => setResumeData(prev => ({ ...prev, project: data }))}
                                        />
                                    )}
                                    {activeSection.id === 'skills' && (
                                        <Skills
                                            data={resumeData.skills}
                                            onChange={(data) => setResumeData(prev => ({ ...prev, skills: data }))}
                                        />
                                    )}
                                </div>
{/* 
                                <button 
                                    onClick={saveResume} 
                                    disabled={isSaving}
                                    className={`w-full bg-gradient-to-b from-green-100 to-green-200 ring-green-300 text-green-700 ring hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                </button> */}

                            </div>
                        </div>

                        {/* RIGHT COLUMN: PREVIEW */}
                        <div className='lg:col-span-7 max-lg:mt-6 '>
                            <div className='relative w-full '>
                                <button onClick={downloadResume} className='flex items-center gap-2 px-6 py-3 text-xs bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-green-300 hover:ring transition-colors ml-[80%] mb-2 '>
                                    <DownloadCloudIcon className='size-4' /> Download
                                </button>
                            </div>
                            <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} />
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default ResumeCreator;

