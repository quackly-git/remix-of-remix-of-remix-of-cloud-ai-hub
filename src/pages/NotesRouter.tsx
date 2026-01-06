import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { SubjectsPage } from "./SubjectsPage";
import { NotesPage } from "./Notes";
import { SubmitNotesPage } from "./SubmitNotesPage";
import { Subject } from "@/types";

const NotesRouter = () => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [showSubmitNotes, setShowSubmitNotes] = useState(false);

  const handleBack = () => {
    setSelectedSubject(null);
    setShowSubmitNotes(false);
  };
  return (
    <div>
      {showSubmitNotes ? (
        <SubmitNotesPage onBack={handleBack} />
      ) : selectedSubject ? (
        <NotesPage subject={selectedSubject} onBack={handleBack} />
      ) : (
        <SubjectsPage
          onSubjectSelect={setSelectedSubject}
          onSubmitNotesClick={() => setShowSubmitNotes(true)}
        />
      )}
    </div>
  );
};

export default NotesRouter;
