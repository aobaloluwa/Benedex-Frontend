import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiBookOpen,
  FiActivity,
  FiShield,
  FiArrowRight,
  FiCheckCircle,
  FiMessageSquare,
  FiDatabase,
  FiBriefcase,
  FiZap,
  FiAward,
  FiGlobe,
  FiExternalLink,
  FiMail,
  FiCheckSquare,
  FiCompass,
  FiUsers,
  FiLock,
  FiCpu
} from 'react-icons/fi';
import Navbar from './Navbar';
import Footer from './Footer';
import './BenedexLanding.css';

const BenedexLanding = () => {
  const navigate = useNavigate();

  return (
    <div className="bx-corp-wrapper">
      {/* SHARED BRAND NAVBAR */}
      <Navbar />

      {/* ==========================================
          01 — HERO SECTION
      ========================================== */}
      <section className="bx-hero-section bx-corp-hero-bg">
        <div className="bx-hero-grid-matrix" />

        <div className="bx-hero-container">
          {/* EYEBROW BADGE CHIP */}
          <motion.div
            className="bx-hero-badge-chip"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="bx-hero-badge-icon">⚡</span>
            <span>TECHNOLOGY • DIGITAL SOLUTIONS • PROFESSIONAL DEVELOPMENT</span>
          </motion.div>

          {/* MAIN HEADLINE */}
          <motion.h1
            className="bx-hero-main-title bx-hero-centered-title"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Empowering People and Organisations <br />
            <span className="bx-hero-title-accent text-gradient-corp">
              Through Technology and Innovation
            </span>
          </motion.h1>

          {/* PARAGRAPH BODY */}
          <motion.p
            className="bx-corp-hero-centered-desc"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            At <strong>Benedex Innovations Ltd</strong>, we develop and promote practical digital solutions that enhance communication, improve productivity, support education and professional development, and drive digital transformation. Our work brings together technology, information management, business solutions, digital learning, and innovation to help individuals and organisations connect, learn, work smarter, and grow.
          </motion.p>

          {/* ACTION BUTTONS */}
          <motion.div
            className="bx-hero-action-row justify-center-actions"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <a href="#services" className="bx-hero-btn-primary shadow-navy">
              Explore Our Services <FiArrowRight size={16} />
            </a>
            <Link to="/about" className="bx-hero-btn-secondary">
              About Benedex <FiArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ==========================================
          02 — WHO WE ARE (ABOUT BENEDEX)
      ========================================== */}
      <section id="about" className="bx-section-padding bx-bg-white">
        <div className="bx-container">
          <div className="bx-section-header text-center mb-5">
            <span className="bx-eyebrow-tag">ABOUT BENEDEX</span>
            <h2 className="bx-section-title">Connecting Technology with Real-World Needs</h2>
          </div>

          <div className="bx-about-content-box text-center mx-auto">
            <p className="bx-lead-paragraph text-center">
              <strong>Benedex Innovations Ltd</strong> is a Nigerian technology and innovation company committed to advancing digital transformation through practical solutions, professional development, and emerging technologies.
            </p>
            <p className="bx-body-paragraph text-center">
              Our areas of activity encompass digital communication, information management, business automation, e-learning, digital business solutions, cybersecurity, and technology-driven innovation.
            </p>
            <p className="bx-body-paragraph text-center">
              We believe technology should simplify processes, expand opportunities, improve access to information, and empower individuals and organisations to achieve more. Through our services, digital platforms, and developing initiatives, we aim to respond to evolving educational, professional, business, and societal needs.
            </p>

            <div className="text-center mt-4 d-flex justify-content-center">
              <Link to="/about" className="bx-inline-link">
                Learn More About Us <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          03 — WHAT WE DO (OUR AREAS OF ACTIVITY)
      ========================================== */}
      <section id="services" className="bx-section-padding bx-bg-light">
        <div className="bx-container">
          <div className="bx-section-header text-center mb-5">
            <span className="bx-eyebrow-tag">OUR AREAS OF ACTIVITY</span>
            <h2 className="bx-section-title">Practical Digital Solutions for a Connected World</h2>
            <p className="bx-section-desc">
              Our work spans key areas of technology, education, and digital transformation, with a focus on improving efficiency, expanding access to opportunities, and supporting sustainable growth.
            </p>
          </div>

          {/* 3x2 CARDS GRID */}
          <div className="bx-activity-grid">
            <div className="bx-activity-card">
              <div className="bx-activity-icon-box">
                <FiMessageSquare size={22} />
              </div>
              <h3>Digital Communication & Collaboration</h3>
              <p>
                We explore and support digital communication solutions that enable individuals, teams, and organisations to connect, exchange information, and collaborate effectively across different locations.
              </p>
            </div>

            <div className="bx-activity-card">
              <div className="bx-activity-icon-box">
                <FiDatabase size={22} />
              </div>
              <h3>Information Management & Business Automation</h3>
              <p>
                We focus on solutions that simplify information collection, storage, retrieval, and sharing, while supporting workflow automation, operational efficiency, and informed decision-making.
              </p>
            </div>

            <div className="bx-activity-card">
              <div className="bx-activity-icon-box">
                <FiBookOpen size={22} />
              </div>
              <h3>Digital Learning & Professional Development</h3>
              <p>
                We promote accessible education, skills development, and continuous professional learning through digital learning environments, structured training programmes, virtual classrooms, and educational resources.
              </p>
            </div>

            <div className="bx-activity-card">
              <div className="bx-activity-icon-box">
                <FiBriefcase size={22} />
              </div>
              <h3>Digital Business & Technology Solutions</h3>
              <p>
                We support the adoption of digital tools and technologies that enhance business operations, e-commerce, digital marketing, remote collaboration, and organisational transformation.
              </p>
            </div>

            <div className="bx-activity-card">
              <div className="bx-activity-icon-box">
                <FiShield size={22} />
              </div>
              <h3>Cybersecurity & Information Protection</h3>
              <p>
                We promote responsible digital practices, information security, data protection, access control, and the use of appropriate technologies to safeguard digital information and systems.
              </p>
            </div>

            <div className="bx-activity-card">
              <div className="bx-activity-icon-box">
                <FiZap size={22} />
              </div>
              <h3>Research, Technology & Innovation</h3>
              <p>
                We explore emerging technologies, innovative ideas, and practical digital solutions that address evolving challenges and create opportunities for individuals, businesses, and communities.
              </p>
            </div>
          </div>

          <div className="text-center mt-5">
            <Link to="/services" className="bx-inline-link">
              Discover Our Services <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================
          04 — OUR PLATFORMS & INITIATIVES
      ========================================== */}
      <section id="solutions" className="bx-section-padding bx-bg-white">
        <div className="bx-container">
          <div className="bx-section-header text-center mb-5">
            <span className="bx-eyebrow-tag">OUR PLATFORMS & INITIATIVES</span>
            <h2 className="bx-section-title">Turning Ideas into Practical Digital Experiences</h2>
            <p className="bx-section-desc">
              At Benedex Innovations Ltd, we are building and developing digital platforms designed to address specific needs in education, professional development, healthcare, and everyday life. Our initiatives reflect our commitment to making technology more accessible, practical, and beneficial.
            </p>
          </div>

          <div className="bx-platforms-dual-grid">
            {/* PLATFORM 1: E-LEARNING */}
            <div className="bx-platform-card card-elearning">
              <div className="bx-platform-card-header">
                <span className="bx-status-badge badge-active">
                  <FiCheckCircle size={12} /> Existing Platform
                </span>
                <span className="bx-platform-tagline">Learn. Develop. Achieve.</span>
              </div>
              <h3>Benedex E-Learning</h3>
              <p>
                Benedex E-Learning is our digital learning platform designed to support education, professional training, skills acquisition, and lifelong learning. The platform provides an environment for structured courses, virtual learning experiences, educational resources, learner engagement, and professional development.
              </p>
              <p className="bx-platform-subtext">
                Our goal is to make learning more accessible, flexible, and relevant to the evolving needs of students, professionals, educators, and organisations.
              </p>
              <div className="bx-platform-action">
                <button
                  onClick={() => navigate('/login')}
                  className="bx-hero-btn-primary shadow-navy"
                >
                  <FiBookOpen size={16} /> Explore Benedex E-Learning <FiArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* PLATFORM 2: VITALTRON HEALTH */}
            <div className="bx-platform-card card-vitaltron">
              <div className="bx-platform-card-header">
                <span className="bx-status-badge badge-dev">
                  <FiCompass size={12} /> In Development
                </span>
                <span className="bx-platform-tagline">Your Health. Your Identity. Your Journey.</span>
              </div>
              <h3>Vitaltron Health</h3>
              <p>
                Vitaltron Health is an emerging digital health initiative focused on improving how individuals access, organise, and manage their personal health information.
              </p>
              <p className="bx-platform-subtext">
                The platform is being developed with a vision to support personal health records, health tracking, and convenient access to relevant health information through a secure and user-friendly digital experience.
              </p>
              <div className="bx-platform-action">
                <Link to="/vitaltron" className="bx-hero-btn-secondary">
                  <FiActivity size={16} /> Discover Vitaltron Health <FiArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          05 — TRAINING & PROFESSIONAL DEVELOPMENT
      ========================================== */}
      <section id="training" className="bx-section-padding bx-bg-light">
        <div className="bx-container">
          <div className="bx-section-header text-center mb-5">
            <span className="bx-eyebrow-tag">PROFESSIONAL LEARNING</span>
            <h2 className="bx-section-title">Advancing Knowledge. Building Skills. Creating Opportunities.</h2>
          </div>

          <div className="bx-training-overview-box mb-5">
            <p className="bx-lead-paragraph text-center">
              At Benedex Innovations Ltd, we recognise the importance of continuous learning in an increasingly digital and competitive world.
            </p>
            <p className="bx-body-paragraph text-center">
              Through our educational initiatives, we aim to provide accessible, relevant, and practical learning opportunities that support academic advancement, professional competence, career development, and lifelong learning. Our training interests span digital skills, technology, professional education, business development, and other emerging areas of knowledge.
            </p>
          </div>

          {/* CPD PROVIDER RECOGNITION BOX */}
          <div className="bx-cpd-showcase-card">
            <div className="bx-cpd-badge-header">
              <FiAward size={28} className="text-navy" />
              <div>
                <span className="bx-cpd-eyebrow">STANDARDS & ACCREDITATION</span>
                <h3>Committed to Professional Learning Standards</h3>
              </div>
            </div>

            <p className="bx-cpd-body-text">
              Benedex Innovations Ltd is an <strong>Approved CPD Provider with The CPD Group</strong>, reflecting an important milestone in our commitment to structured professional development. As we continue to develop our training portfolio, we aim to deliver programmes that promote meaningful learning experiences and practical skills development.
            </p>

            <div className="bx-cpd-actions-row">
              <Link to="/training" className="bx-hero-btn-primary">
                Explore Learning Opportunities <FiArrowRight />
              </Link>
              <a
                href="https://thecpdregister.com/providers/cpd-group--providers--791495"
                target="_blank"
                rel="noopener noreferrer"
                className="bx-inline-link d-inline-flex align-items-center gap-2"
              >
                View Our CPD Provider Listing <FiExternalLink />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          06 — WHY BENEDEX? (OUR APPROACH)
      ========================================== */}
      <section className="bx-section-padding bx-bg-white">
        <div className="bx-container">
          <div className="bx-section-header text-center mb-5">
            <span className="bx-eyebrow-tag">OUR APPROACH</span>
            <h2 className="bx-section-title">Driven by Innovation. Focused on Impact.</h2>
          </div>

          <div className="bx-approach-pillars-grid">
            <div className="bx-pillar-card">
              <div className="bx-pillar-num">01</div>
              <h3>Practical Solutions</h3>
              <p>We focus on technologies and approaches that address real-world challenges, simplify processes, and improve everyday experiences.</p>
            </div>

            <div className="bx-pillar-card">
              <div className="bx-pillar-num">02</div>
              <h3>Continuous Learning</h3>
              <p>We recognise knowledge and skills development as essential foundations for personal, professional, and organisational growth.</p>
            </div>

            <div className="bx-pillar-card">
              <div className="bx-pillar-num">03</div>
              <h3>Innovation & Adaptability</h3>
              <p>We embrace new ideas, emerging technologies, and opportunities for continuous improvement in a changing digital environment.</p>
            </div>

            <div className="bx-pillar-card">
              <div className="bx-pillar-num">04</div>
              <h3>Responsible Technology</h3>
              <p>We value privacy, information security, ethical practices, and responsible technology adoption.</p>
            </div>

            <div className="bx-pillar-card bx-pillar-wide">
              <div className="bx-pillar-num">05</div>
              <h3>People-Centred Approach</h3>
              <p>We place individuals, learners, professionals, and organisations at the centre of our thinking and development priorities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          07 — OUR VISION
      ========================================== */}
      <section className="bx-section-padding bx-bg-light">
        <div className="bx-container text-center">
          <span className="bx-eyebrow-tag">LOOKING AHEAD</span>
          <h2 className="bx-section-title mb-4">Building a Future of Possibilities Through Technology</h2>

          <div className="bx-vision-card mx-auto">
            <p className="bx-vision-quote">
              “We envision a world where technology expands access to knowledge, strengthens communication, improves productivity, and creates opportunities for individuals and organisations to thrive. At Benedex Innovations Ltd, we are committed to contributing to that future through continuous learning, responsible innovation, and practical digital solutions.”
            </p>
          </div>
        </div>
      </section>

      {/* ==========================================
          08 — FINAL CALL TO ACTION (CTA)
      ========================================== */}
      <section className="bx-cta-section">
        <div className="bx-container">
          <div className="bx-cta-navy-card">
            <div className="bx-cta-inner-content text-center">
              <h2 className="bx-cta-heading">Let’s Build Something Meaningful</h2>
              <p className="bx-cta-desc">
                Whether you are seeking professional development, exploring digital solutions, or interested in technology-driven collaboration, we welcome opportunities to connect and explore possibilities.
              </p>
              <div className="bx-cta-btn-cluster">
                <Link to="/services" className="bx-btn-primary-green">
                  Explore Our Services <FiArrowRight />
                </Link>
                <Link to="/contact" className="bx-btn-secondary-outline">
                  Contact Us <FiArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          09 — FOOTER
      ========================================== */}
      <Footer />
    </div>
  );
};

export default BenedexLanding;
