import { PlusIcon, WandSparklesIcon, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from "react-toastify";

const Skills = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    const skill = newSkill.trim();
   
    if(!skill){
      toast.error("Please enter a skill before adding!");
      return;
    }

    if (data.includes(skill)) {
      toast.error("This skill is already added!");
    }

    const removeSkill = (indexRemove) => {
      onChange(data.filter((_index, index) => index !== indexRemove));
    }

    onChange([...data, skill]);
    setNewSkill("");
  };

  const removeSkill = (indexRemove) => {
    onChange(data.filter((_, index) => index !== indexRemove));
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };



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
          onKeyDown={handleKey}
        />

        <button
          onClick={addSkill}
          disabled={!newSkill.trim()}
          className='flex items-center gap-1 text-sm   hover:bg-blue-500 bg-blue-900 text-white transition-all px-3 py-2 rounded-md shadow-sm'
        >
          <PlusIcon className="size-4" />
          Add Skill
        </button>
      </div>

      {data.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {data.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              <span>{skill}</span>
              <button
                onClick={() => removeSkill(index)}
                className="text-red-500 hover:text-red-700"
              >
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
