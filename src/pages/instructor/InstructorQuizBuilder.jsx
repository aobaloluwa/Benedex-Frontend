import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../services/api";
import {
  FiPlus,
  FiTrash2,
  FiCheckCircle,
  FiHelpCircle,
  FiSave,
  FiArrowLeft,
  FiSliders,
  FiDisc,
  FiInfo
} from "react-icons/fi";
import "./InstructorQuizBuilder.css";

function InstructorQuizBuilder() {
  const { moduleId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    passMark: 70
  });

  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: ""
    }
  ]);

  const handleQuizChange = (e) => {
    setQuizData({
      ...quizData,
      [e.target.name]: e.target.value
    });
  };

  const handleQuestionChange = (index, value) => {
    const updated = [...questions];
    updated[index].question = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optionIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optionIndex] = value;
    
    // Auto-update correctAnswer if it matches the modified option string
    if (updated[qIndex].correctAnswer === updated[qIndex].options[optionIndex]) {
      updated[qIndex].correctAnswer = value;
    }
    
    setQuestions(updated);
  };

  const handleCorrectAnswer = (qIndex, value) => {
    const updated = [...questions];
    updated[qIndex].correctAnswer = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: ""
      }
    ]);
  };

  const removeQuestion = (index) => {
    if (questions.length === 1) return;
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Functional validation check before compilation dispatch
    const brokenQuestionIdx = questions.findIndex(q => !q.correctAnswer || q.options.some(opt => !opt.trim()));
    if (brokenQuestionIdx !== -1) {
      alert(`Validation Failure: Question ${brokenQuestionIdx + 1} must have all option strings populated and an explicitly designated correct answer option.`);
      return;
    }

    try {
      setLoading(true);
      await API.post("/quizzes", {
        title: quizData.title.trim(),
        description: quizData.description.trim(),
        passMark: Number(quizData.passMark),
        module: moduleId,
        questions
      });

      alert("Evaluation Quiz architecture deployed successfully.");
      navigate(-1);
    } catch (error) {
      console.error("Downstream compiler transaction error:", error);
      alert(error.response?.data?.message || "Failed to commit assessment data mapping.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bx-qb-workspace container-fluid py-4">
      
      {/* HEADER CONTROL COMPILER DASHBOARD CONSOLE */}
      <header className="bx-qb-header d-flex align-items-center gap-3 mb-4 pb-4 border-bottom">
        <button 
          type="button" 
          className="bx-qb-back-btn" 
          onClick={() => navigate(-1)}
          title="Return to structural module timeline"
        >
          <FiArrowLeft />
        </button>
        <div className="bx-qb-title-zone">
          <div className="d-flex align-items-center gap-2 text-dark mb-1">
            <FiHelpCircle className="text-muted" size={22} />
            <h1 className="h3 mb-0 font-weight-bold">Evaluation Quiz Builder</h1>
          </div>
          <p className="text-muted mb-0 small">Formulate criteria nodes, multiple-choice options, and score validation parameters for this instructional block.</p>
        </div>
      </header>

      {/* CORE FORM EXECUTION SYSTEM WRAPPER */}
      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          
          {/* LEFT COLUMN PANEL: METADATA & CONTROL PARAMETERS */}
          <div className="col-12 col-lg-4">
            <div className="bx-qb-sticky-panel d-flex flex-column gap-3">
              <div className="bx-qb-card-panel">
                <h3 className="bx-qb-panel-title mb-4">
                  <FiSliders />
                  <span>Assessment Configurations</span>
                </h3>

                <div className="d-flex flex-column gap-3">
                  <div className="bx-qb-form-group">
                    <label className="bx-qb-label">Quiz Assessment Title</label>
                    <input
                      type="text"
                      name="title"
                      value={quizData.title}
                      onChange={handleQuizChange}
                      placeholder="e.g., Module 1 Comprehensive Exam"
                      required
                    />
                  </div>

                  <div className="bx-qb-form-group">
                    <label className="bx-qb-label">Operational Instructions</label>
                    <textarea
                      rows={4}
                      name="description"
                      value={quizData.description}
                      onChange={handleQuizChange}
                      placeholder="Outline benchmark targets, exam instructions, time restrictions, or core curriculum objectives..."
                    />
                  </div>

                  <div className="bx-qb-form-group">
                    <label className="bx-qb-label">Minimum Passing Score Threshold (%)</label>
                    <div className="bx-qb-input-wrapper">
                      <input
                        type="number"
                        min="1"
                        max="100"
                        name="passMark"
                        value={quizData.passMark}
                        onChange={handleQuizChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ACTION MATRIX CONSOLE BAR */}
              <div className="bx-qb-card-panel bg-light border-dashed">
                <div className="d-flex flex-column gap-2">
                  <button
                    type="button"
                    className="bx-qb-secondary-btn w-100"
                    onClick={addQuestion}
                  >
                    <FiPlus />
                    <span>Append Question Block</span>
                  </button>

                  <button
                    type="submit"
                    className="bx-qb-submit-btn w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="bx-qb-spinner-sm" />
                        <span>Saving Quiz...</span>
                      </>
                    ) : (
                      <>
                        <FiSave />
                        <span>Compile & Commit Quiz</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN PANEL: INFINITE QUESTION REGISTER BLOCKS */}
          <div className="col-12 col-lg-8">
            <div className="d-flex flex-column gap-4">
              <AnimatePresence initial={false}>
                {questions.map((question, qIndex) => (
                  <motion.div
                    key={qIndex}
                    className="bx-qb-card-panel bx-qb-question-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bx-qb-question-top d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                      <div className="d-flex align-items-center gap-2">
                        <span className="bx-qb-index-badge">#{qIndex + 1}</span>
                        <h3 className="h6 font-weight-bold mb-0 text-dark">Quiz Question</h3>
                      </div>
                      
                      <button
                        type="button"
                        className="bx-qb-delete-btn"
                        onClick={() => removeQuestion(qIndex)}
                        disabled={questions.length === 1}
                        title={questions.length === 1 ? "Cannot delete the baseline core question block" : "Purge question block object"}
                      >
                        <FiTrash2 />
                      </button>
                    </div>

                    <div className="bx-qb-form-group mb-3">
                      <label className="bx-qb-label">Question Invalidation / Prompt String</label>
                      <input
                        type="text"
                        placeholder="e.g., Which register tracking array points directly to the execution pipeline address stack?"
                        value={question.question}
                        onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                        required
                      />
                    </div>

                    {/* MULTIPLE CHOICE CAPTURE SYSTEM OPTION SELECTION GRID */}
                    <label className="bx-qb-label mb-2">Configure Multiple-Choice Variable Registers</label>
                    <div className="row g-2 mb-3">
                      {question.options.map((option, optionIndex) => (
                        <div className="col-12 col-md-6" key={optionIndex}>
                          <div className="bx-qb-option-input-wrapper">
                            <span className="bx-qb-option-prefix">{String.fromCharCode(65 + optionIndex)}</span>
                            <input
                              type="text"
                              placeholder={`Populate variant option string variable...`}
                              value={option}
                              onChange={(e) => handleOptionChange(qIndex, optionIndex, e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* METADATA DROPDOWN FOR CORRECT FIELD SELECTOR */}
                    <div className="bx-qb-form-group">
                      <label className="bx-qb-label d-flex align-items-center gap-1">
                        <FiCheckCircle className="text-success" />
                        <span>Designate Target Correct Answer Matrix Row</span>
                      </label>
                      <div className="bx-qb-select-wrapper">
                        <select
                          value={question.correctAnswer}
                          onChange={(e) => handleCorrectAnswer(qIndex, e.target.value)}
                          required
                        >
                          <option value="">-- Choose verified programmatic target answer string --</option>
                          {question.options.map((option, index) => {
                            const populatedText = option.trim();
                            return (
                              <option key={index} value={populatedText} disabled={!populatedText}>
                                {populatedText ? `Option ${String.fromCharCode(65 + index)}: ${populatedText}` : `[Empty Slot Row ${String.fromCharCode(65 + index)}]`}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>

                  </motion.div>
                ))}
              </AnimatePresence>

              {/* TIMELINE END APPRENDER ATTACH ACTION HUB */}
              <div className="text-center py-2">
                <button
                  type="button"
                  className="bx-qb-add-block-dashed-btn d-inline-flex align-items-center gap-2 justify-content-center"
                  onClick={addQuestion}
                >
                  <FiPlus />
                  <span>Insert Additional Evaluation Row Object</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </form>

    </div>
  );
}

export default InstructorQuizBuilder;