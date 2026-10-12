import "./StudentQuiz.css";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../../services/api";
import {
  FiClock,
  FiCheckCircle,
  FiArrowRight,
  FiArrowLeft,
  FiAward,
  FiAlertCircle,
  FiActivity,
  FiChevronDown,
  FiBookOpen,
  FiHelpCircle,
  FiLock,
  FiRefreshCw
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

function StudentQuiz() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasAttempted, setHasAttempted] = useState(false); // Only locks out if they PASSED

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [serverPassed, setServerPassed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null);

  /* ---------------- FETCH QUIZ + CHECK PRIOR ATTEMPTS ---------------- */
  useEffect(() => {
    const fetchQuizAndStatus = async () => {
      try {
        setLoading(true);

        // Security check: Query progress tracker to see if the user already passed this quiz
        const progressRes = await API.get(`/quizzes/progress`).catch(() => ({ data: [] }));
        
        const alreadyPassed = (progressRes.data || []).some(
          (q) => String(q.quiz?._id || q.quiz) === String(quizId) && q.passed === true
        );

        // If they have already passed, explicitly lock them out
        if (alreadyPassed) {
          setHasAttempted(true);
          setLoading(false);
          return;
        }

        // PRIMARY: quizId route
        let res = await API.get(`/quizzes/${quizId}`).catch(() => null);

        // FALLBACK: module-based quiz lookup
        if (!res?.data) {
          res = await API.get(`/quizzes/module/${quizId}`).catch(() => null);
        }

        const data = res?.data;

        if (!data || !data.questions || data.questions.length === 0) {
          setQuiz(null);
          return;
        }

        setQuiz(data);
        setTimeLeft(data.questions.length * 60); // 1 min per question
      } catch (err) {
        console.log(err);
        setQuiz(null);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizAndStatus();
  }, [quizId]);

  /* ---------------- TIMER ---------------- */
  useEffect(() => {
    if (!quiz || submitted || hasAttempted) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [quiz, submitted, hasAttempted]);

  const formatTime = (sec = 0) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  /* ---------------- SAFETY ---------------- */
  const questions = quiz?.questions || [];
  const question = questions[current];
  const progressPercentage = questions.length > 0 ? ((current + 1) / questions.length) * 100 : 0;

  /* ---------------- ANSWERS ---------------- */
  const handleSelect = (value) => {
    if (submitted || hasAttempted) return;
    setAnswers((prev) => ({
      ...prev,
      [current]: value,
    }));
  };

  /* ---------------- NAVIGATION ---------------- */
  const next = () => {
    if (current < questions.length - 1) {
      setCurrent((p) => p + 1);
    }
  };

  const prev = () => {
    if (current > 0) {
      setCurrent((p) => p - 1);
    }
  };

  /* ---------------- RETAKE RESET TRIGGER ---------------- */
  const handleRetakeReset = () => {
    setAnswers({});
    setCurrent(0);
    setSubmitted(false);
    setScore(0);
    setServerPassed(false);
    setSubmitting(false);
    setSubmitError("");
    if (quiz) {
      setTimeLeft(quiz.questions.length * 60);
    }
  };

  /* ---------------- SUBMIT ---------------- */
  // The browser must never grade a quiz or depend on correctAnswer being
  // present in the quiz payload. Only the server is authoritative for grading.
  const handleSubmit = async () => {
    if (submitted || submitting || !quiz || hasAttempted) return;

    setSubmitting(true);
    setSubmitError("");
    clearInterval(timerRef.current);

    try {
      const res = await API.post(`/quizzes/submit/${quizId}`, { answers });
      const result = res?.data;

      if (
        !result ||
        !Number.isFinite(Number(result.correct)) ||
        typeof result.passed !== "boolean"
      ) {
        throw new Error("The server returned an invalid quiz result. Please try again.");
      }

      setScore(Number(result.correct));
      setServerPassed(result.passed);
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err.response?.data?.message ||
        err.message ||
        "Your quiz could not be submitted. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------------- LOADING STATE ---------------- */
  if (loading) {
    return (
      <div className="scd-loader-container">
        <div className="scd-spinner" />
        <p>Assembling Quiz Environment...</p>
      </div>
    );
  }

  /* ---------------- SECURITY EXPLICIT ATTEMPT GUARDRAIL ---------------- */
  if (hasAttempted) {
    return (
      <div className="scd-loader-container benedex-quiz-lockout">
        <FiCheckCircle size={50} style={{ color: "#10b981", marginBottom: "16px" }} />
        <h2>Assessment Completed Successfully</h2>
        <p style={{ maxWidth: "460px", margin: "0 auto", color: "var(--text-muted)" }}>
          You have already passed this evaluation block. To maintain academic tracking integrity, retakes are restricted once a passing grade is recorded.
        </p>
        <button onClick={() => navigate(-1)} className="nav-control-button buy-action-btn-styled" style={{ marginTop: "24px" }}>
          Return to Learning Workspace
        </button>
      </div>
    );
  }

  /* ---------------- ERROR FALLBACK ---------------- */
  if (!quiz || questions.length === 0) {
    return (
      <div className="scd-loader-container">
        <FiAlertCircle size={40} style={{ color: "var(--accent-red)", marginBottom: "12px" }} />
        <p>No evaluation criteria mapped to this academic track segment yet.</p>
        <button onClick={() => navigate(-1)} className="nav-control-button" style={{ marginTop: "16px" }}>
          Return to Course Experience
        </button>
      </div>
    );
  }

  return (
    <div className="benedex-lms-theme quiz-workspace-layout">
      <div className="benedex-container">

        {!submitted && (
          <div className="quiz-global-progress-wrapper">
            <div className="progress-text-row">
              <span>Milestone Progress</span>
              <strong>{current + 1} of {questions.length} Questions</strong>
            </div>
            <div className="progress-track-bar-bg">
              <div
                className="progress-fill-bar-active"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        <div className="benedex-grid workspace-split-container">

          {/* LEFT PRIMARY TESTING CANVAS */}
          <main className="main-content-flow">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key={current}
                  className="media-player-card quiz-testing-card"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="quiz-card-header-meta">
                    <span className="question-index-tag">QUESTION {String(current + 1).padStart(2, '0')}</span>
                    <div className="live-clock-badge">
                      <FiClock />
                      <span>{formatTime(timeLeft)}</span>
                    </div>
                  </div>

                  <h2 className="quiz-surface-question-text">
                    {question?.question}
                  </h2>

                  <div className="quiz-interactive-options-stack">
                    {(question?.options || []).map((opt, i) => {
                      const isSelected = answers[current] === opt;
                      const alphabetIndex = String.fromCharCode(65 + i);

                      return (
                        <button
                          key={i}
                          className={`quiz-premium-option-row ${isSelected ? "is-selected" : ""}`}
                          onClick={() => handleSelect(opt)}
                        >
                          <span className="option-alphabet-key">{alphabetIndex}</span>
                          <span className="option-text-payload">{opt}</span>
                          <div className="option-radio-visual-target">
                            <div className="inner-radio-core" />
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {submitError && (
                    <div className="quiz-submit-error" role="alert" aria-live="polite">
                      {submitError}
                    </div>
                  )}

                  <div className="workspace-navigation-row-bar quiz-inner-controls">
                    <button
                      className="nav-control-button"
                      onClick={prev}
                      disabled={current === 0 || submitting}
                    >
                      <FiArrowLeft /> <span>Prev</span>
                    </button>

                    {current < questions.length - 1 ? (
                      <button className="nav-control-button next" onClick={next} disabled={submitting}>
                        <span>Next</span> <FiArrowRight />
                      </button>
                    ) : (
                      <button
                        className="nav-control-button center-complete submit-action-trigger"
                        onClick={handleSubmit}
                        disabled={submitting}
                      >
                        {submitting ? "Submitting…" : submitError ? "Retry Submission" : "Submit Assessment"}
                      </button>
                    )}
                  </div>
                </motion.div>
              ) : (
                /* SUBMITTED SCORE REPORT PANEL */
                <motion.div
                  className="media-player-card quiz-results-score-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="results-celebration-graphic">
                    <div className={`award-icon-crown ${serverPassed ? "passed-crown" : "failed-crown"}`}>
                      <FiAward size={44} />
                    </div>
                  </div>

                  <span className="results-sub-heading">EVALUATION METRICS COMPLETED</span>
                  <h2>Performance Scoreboard</h2>

                  <div className="score-numerical-display">
                    <span className="earned-points">{score}</span>
                    <span className="total-possible-points">/ {questions.length}</span>
                  </div>

                  <p className="results-feedback-prose">
                    {serverPassed
                      ? "Excellent track execution! You have demonstrated conceptual mastery over this specific course milestone and unlocked subsequent modules."
                      : "You did not achieve the required pass mark for this segment module. Please review your study resources and attempt the evaluation block again."}
                  </p>

                  <div className="results-action-row-group">
                    {!serverPassed && (
                      <button onClick={handleRetakeReset} className="nav-control-button next retake-btn" style={{ background: "var(--accent-gold)", color: "#000" }}>
                        <FiRefreshCw /> Retake Quiz
                      </button>
                    )}
                    <button onClick={() => navigate(-1)} className="btn-primary-action-buy studio-return-btn" style={{ margin: 0 }}>
                      Return to Studio
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* RIGHT SIDEBAR STATS TRACKER */}
          <aside className="sidebar-sticky-flow">
            <div className="checkout-widget-card quiz-matrix-widget">
              <h4>Assessment Map</h4>
              <p className="matrix-helper-text">Select maps cleanly to skip or jump between criteria blocks directly.</p>

              <div className="quiz-question-grid-matrix">
                {questions.map((_, index) => {
                  const isAnswered = answers[index] !== undefined;
                  const isActive = index === current;

                  return (
                    <button
                      key={index}
                      className={`matrix-node ${isActive ? "is-active" : ""} ${isAnswered ? "is-answered" : ""}`}
                      onClick={() => !submitted && setCurrent(index)}
                      disabled={submitted}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>

              <hr className="divider-line" />

              <div className="matrix-legend-row">
                <div className="legend-item">
                  <span className="legend-dot active" />
                  <span>Current</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot answered" />
                  <span>Answered</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot default" />
                  <span>Pending</span>
                </div>
              </div>
            </div>

            <div className="requirements-widget-card integrity-card">
              <div className="integrity-title-lockup">
                <FiHelpCircle />
                <h3>Examination Rules</h3>
              </div>
              <ul>
                <li>Do not refresh or exit the browser runtime matrix mid-session.</li>
                <li>When the timer track reaches zero, an auto-submit payload fires.</li>
                <li>Retakes are permitted only if your score falls below the required threshold.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>

      <footer className="benedex-footer-wrapper">
        <div className="footer-top-row">
          <div className="footer-brand-column">
            <h3>Benedex Digital</h3>
            <p>© 2026 Benedex Digital Hub.</p>
          </div>
          <div className="footer-links-column">
            <span>Identity Verified</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default StudentQuiz;