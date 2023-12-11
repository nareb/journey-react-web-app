import React from "react";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import db from "../../Database";

function ModuleList() {
  const { courseId } = useParams();
  const [modules, setModules] = useState([]);
  const [newModule, setNewModule] = useState({ name: "", title: "" });
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedModuleName, setSelectedModuleName] = useState(""); // Separate state for name
  const [selectedModuleTitle, setSelectedModuleTitle] = useState(""); // Separate state for title

  const addNewModule = () => {
    if (newModule.name && newModule.title) {
      const newModuleObject = {
        _id: new Date().getTime(),
        course: courseId,
        ...newModule,
      };
      setModules([...modules, newModuleObject]);
      setNewModule({ name: "", title: "" });
    }
  };

  const deleteSelectedModule = (moduleId) => {
    setModules(modules.filter((module) => module._id !== moduleId));
  };

  const editModule = (moduleToEdit) => {
    setSelectedModule(moduleToEdit);
    setSelectedModuleName(moduleToEdit.name); // Set separate state for name
    setSelectedModuleTitle(moduleToEdit.title); // Set separate state for title
  };

  const updateSelectedModule = () => {
    if (selectedModule) {
      setModules((prevModules) =>
        prevModules.map((module) =>
          module._id === selectedModule._id
            ? { ...selectedModule, name: selectedModuleName, title: selectedModuleTitle }
            : module
        )
      );
      setSelectedModule(null);
    }
  };

  useEffect(() => {
    // Load modules from API or database.
    setModules(db.modules);
  }, []);

  return (
    <div>
      <ul className="list-group">
        {modules
          .filter((module) => module.course === courseId)
          .map((module, index) => (
            <li key={module._id} className="list-group-item">
              <h3>{module.name}</h3>
              <h4>{module.title}</h4>
              <button onClick={() => deleteSelectedModule(module._id)}>
                Delete
              </button>
              <button onClick={() => editModule(module)}>Edit</button>
            </li>
          ))}
      </ul>
      <form>
        <input
          type="text"
          placeholder="Module name"
          value={newModule.name}
          onChange={(e) =>
            setNewModule({ ...newModule, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Module title"
          value={newModule.title}
          onChange={(e) =>
            setNewModule({ ...newModule, title: e.target.value })
          }
        />
        <button onClick={addNewModule}>Add Module</button>
      </form>
      {selectedModule && (
        <form>
          <input
            type="text"
            value={selectedModuleName}
            onChange={(e) => setSelectedModuleName(e.target.value)}
          />
          <input
            type="text"
            value={selectedModuleTitle}
            onChange={(e) => setSelectedModuleTitle(e.target.value)}
          />
          <button onClick={updateSelectedModule}>Update Module</button>
        </form>
      )}
    </div>
  );
}

export default ModuleList;