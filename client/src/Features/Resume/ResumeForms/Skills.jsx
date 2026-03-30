import { WandSparklesIcon, X, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { toast } from "react-toastify";
import Skillbttn from '../../Components/Buttons/Skillbtn.jsx';


const Skills = ({ data = [], onChange, template = "classic" }) => {
  const [newSkill, setNewSkill] = useState("");
  const [collapsedCategories, setCollapsedCategories] = useState({});
 
  const [categoryInputs, setCategoryInputs] = useState({});

  // Guard against undefined/null data
  const safeData = Array.isArray(data) ? data : [];

  // Check if data is in ATS format (array of objects with categories)
  const isATSFormat = safeData.length > 0 && typeof safeData[0] === 'object' && safeData[0]?.category !== undefined;

  // Toggle collapse state for a category
  const toggleCollapse = (index) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Simple format handlers
  const addSimpleSkill = () => {
    const skill = newSkill.trim();
    if (!skill) {
      toast.error("Please enter a skill before adding!");
      return;
    }
    if (safeData.includes(skill)) {
      toast.error("This skill is already added!");
      return;
    }
    onChange([...safeData, skill]);
    setNewSkill("");
  };

  const removeSimpleSkill = (index) => {
    onChange(safeData.filter((_, i) => i !== index));
  };

  // ATS format handlers
  const addCategory = () => {
    const newCategory = {
      category: "New Category",
      skills: []           //  always initialise skills array
    };
    const newIndex = safeData.length;
    onChange([...safeData, newCategory]);
    setCollapsedCategories(prev => ({ ...prev, [newIndex]: false }));
    setCategoryInputs(prev => ({ ...prev, [newIndex]: "" }));
  };

  const removeCategory = (index) => {
    onChange(safeData.filter((_, i) => i !== index));
    setCollapsedCategories(prev => {
      const updated = {};
      Object.entries(prev).forEach(([key, val]) => {
        const k = parseInt(key);
        if (k < index) updated[k] = val;
        else if (k > index) updated[k - 1] = val;
      });
      return updated;
    });
    setCategoryInputs(prev => {
      const updated = {};
      Object.entries(prev).forEach(([key, val]) => {
        const k = parseInt(key);
        if (k < index) updated[k] = val;
        else if (k > index) updated[k - 1] = val;
      });
      return updated;
    });
  };

  const updateCategory = (index, field, value) => {
    const updated = [...safeData];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  //  guard skills being undefined before calling .some()
  const addSkillToCategory = (catIndex, skillName, isPrimary = false) => {
    if (!skillName.trim()) {
      toast.error("Skill name cannot be empty");
      return;
    }
    const updated = [...safeData];
    // ensure skills array exists
    if (!updated[catIndex].skills) {
      updated[catIndex] = { ...updated[catIndex], skills: [] };
    }
    const skillExists = updated[catIndex].skills.some(s => s.name === skillName);
    if (skillExists) {
      toast.error("Skill already exists in this category");
      return;
    }
    updated[catIndex] = {
      ...updated[catIndex],
      skills: [...updated[catIndex].skills, { name: skillName, primary: isPrimary }]
    };
    onChange(updated);
  };

  const removeSkillFromCategory = (catIndex, skillIndex) => {
    const updated = [...safeData];
    updated[catIndex] = {
      ...updated[catIndex],
      skills: (updated[catIndex].skills || []).filter((_, i) => i !== skillIndex)
    };
    onChange(updated);
  };

  const togglePrimary = (catIndex, skillIndex) => {
    const updated = [...safeData];
    const skills = [...(updated[catIndex].skills || [])];
    skills[skillIndex] = { ...skills[skillIndex], primary: !skills[skillIndex].primary };
    updated[catIndex] = { ...updated[catIndex], skills };
    onChange(updated);
  };

  const handleKey = (e, callback) => {
    if (e.key === "Enter") {
      e.preventDefault();
      callback();
    }
  };

  // ── ATS format ────────────────────────────────────────────
  if (isATSFormat || template === "ats") {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Skills (Categorized)</h3>
          <p className="text-sm text-gray-500">Organize skills by category for ATS optimization.</p>
        </div>

        <button
          onClick={addCategory}
          className="flex items-center gap-2 text-sm bg-[#1a1f29] text-[#6289ff] px-4 py-2 rounded-lg"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>

        <div className="space-y-4">
          {safeData.map((category, catIndex) => {
            const isCollapsed = !!collapsedCategories[catIndex];
            const inputVal = categoryInputs[catIndex] ?? "";

            return (
              <div key={catIndex} className="border border-gray-300 rounded-lg p-4 bg-white">
                {/* Category Header */}
                <div className="flex justify-between items-center mb-4">
                  <input
                    type="text"
                    value={category.category ?? ""}
                    onChange={(e) => updateCategory(catIndex, "category", e.target.value)}
                    className="text-lg font-semibold px-2 py-1 border border-gray-200 rounded"
                    placeholder="Category name"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleCollapse(catIndex)}
                      className="text-gray-500 hover:text-gray-800 transition-colors"
                    >
                      {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                    </button>
                    <button onClick={() => removeCategory(catIndex)} className="text-red-500 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Collapsible Body */}
                {!isCollapsed && (
                  <>
                    <div className="space-y-3">
                      {(category.skills || []).map((skill, skillIndex) => (
                        <div key={skillIndex} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                          <span className={skill.primary ? "font-bold" : ""}>{skill.name}</span>
                          <button
                            onClick={() => removeSkillFromCategory(catIndex, skillIndex)}
                            className="ml-auto text-red-500 hover:text-red-700"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* use controlled state instead of direct DOM access */}
                    <div className="mt-3 flex gap-2">
                      <input
                        type="text"
                        value={inputVal}
                        placeholder="Add skill (comma-separated for multiple)"
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded"
                        onChange={(e) =>
                          setCategoryInputs(prev => ({ ...prev, [catIndex]: e.target.value }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const val = inputVal.trim();
                            if (val) {
                              val.split(",").forEach(s => addSkillToCategory(catIndex, s.trim(), false));
                              setCategoryInputs(prev => ({ ...prev, [catIndex]: "" }));
                            }
                          }
                        }}
                      />
                      <button
                        onClick={() => {
                          const val = inputVal.trim();
                          if (val) {
                            val.split(",").forEach(s => addSkillToCategory(catIndex, s.trim(), false));
                            setCategoryInputs(prev => ({ ...prev, [catIndex]: "" }));
                          }
                        }}
                        className="bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700"
                      >
                        Add
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {safeData.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <WandSparklesIcon className="w-10 h-10 mx-auto mb-2 text-gray-300" />
            <p>No skill categories added yet.</p>
          </div>
        )}
      </div>
    );
  }

  // ── Simple format ─────────────────────────────────────────
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
        <p className="text-sm text-gray-500">Add your skills.</p>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter a skill (e.g. Java, DSA, React)"
          className="flex-1 px-3 py-2 text-sm border rounded-md"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={(e) => handleKey(e, addSimpleSkill)}
        />
        <Skillbttn onClick={addSimpleSkill} />
      </div>

      {safeData.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {safeData.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              <span>{typeof skill === 'string' ? skill : skill.name}</span>
              <button onClick={() => removeSimpleSkill(index)} className="text-red-500 hover:text-red-700">
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-600">
          <WandSparklesIcon className="w-10 h-10 mx-auto mb-2 text-gray-300" />
          <p>No skills added yet.</p>
          <p className="text-sm text-gray-500">Start by adding your skills.</p>
        </div>
      )}

      <div className="bg-blue-50 p-3 rounded-lg text-sm">
        <strong>Tip:</strong> Add 8–12 relevant skills. Mix technical and soft skills.
      </div>
    </div>
  );
};

export default Skills;