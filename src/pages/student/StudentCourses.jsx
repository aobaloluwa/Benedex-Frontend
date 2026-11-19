import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiBookOpen,
  FiChevronDown,
  FiClock,
  FiFilter,
  FiLayers,
  FiPlayCircle,
  FiStar,
  FiUsers,
} from "react-icons/fi";

import API from "../../services/api";
import styles from "./StudentCourses.module.css";

function StudentCourses() {
  const [courses, setCourses] = useState([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [selectedTrack, setSelectedTrack] = useState("All programs");
  const [sortBy, setSortBy] = useState("popular");
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const [coursesRes, dashboardRes] = await Promise.all([
          API.get("/courses"),
          API.get("/dashboard/student"),
        ]);

        setCourses(coursesRes.data || []);

        const enrolledIds = new Set(
          (dashboardRes.data?.enrolledCourses || []).map((course) => course._id)
        );

        setEnrolledCourseIds(enrolledIds);
      } catch (error) {
        console.error("Error fetching courses catalog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const enrolledCourses = useMemo(() => {
    return courses.filter((course) => enrolledCourseIds.has(course._id));
  }, [courses, enrolledCourseIds]);

  const marketplaceCourses = useMemo(() => {
    return courses.filter((course) => !enrolledCourseIds.has(course._id));
  }, [courses, enrolledCourseIds]);

  const tracks = useMemo(() => {
    const uniqueTools = marketplaceCourses.flatMap((course) => course.tools || []).filter(Boolean);
    return ["All programs", ...new Set(uniqueTools)].slice(0, 6);
  }, [marketplaceCourses]);

  const stats = useMemo(() => {
    const uniqueInstructors = new Set(
      courses.map((course) => course.instructor?._id || course.instructor?.fullName || course.instructor)
    );
    const uniqueTools = new Set(courses.flatMap((course) => course.tools || []));

    return [
      { label: "Programs", value: courses.length, icon: <FiBookOpen /> },
      { label: "Enrolled", value: enrolledCourseIds.size, icon: <FiLayers /> },
      { label: "Mentors", value: uniqueInstructors.size, icon: <FiUsers /> },
      { label: "Tracks", value: uniqueTools.size, icon: <FiStar /> },
    ];
  }, [courses, enrolledCourseIds]);

  const visibleMarketplaceCourses = useMemo(() => {
    const filtered = marketplaceCourses.filter((course) => {
      if (selectedTrack === "All programs") return true;
      return (course.tools || []).includes(selectedTrack);
    });

    const sorted = [...filtered].sort((left, right) => {
      const leftPopularity = left.students?.length || 0;
      const rightPopularity = right.students?.length || 0;

      if (sortBy === "price-low") return left.price - right.price;
      if (sortBy === "price-high") return right.price - left.price;
      if (sortBy === "title") return left.title.localeCompare(right.title);
      return rightPopularity - leftPopularity;
    });

    return sorted.slice(0, visibleCount);
  }, [marketplaceCourses, selectedTrack, sortBy, visibleCount]);

  const filteredMarketplaceCount = useMemo(() => {
    return marketplaceCourses.filter((course) => {
      if (selectedTrack === "All programs") return true;
      return (course.tools || []).includes(selectedTrack);
    }).length;
  }, [marketplaceCourses, selectedTrack]);

  const featuredInstructors = useMemo(() => {
    const seen = new Map();
    courses.forEach((course) => {
      const instructor = course.instructor;
      if (instructor?._id && !seen.has(instructor._id)) {
        seen.set(instructor._id, instructor);
      }
    });
    return Array.from(seen.values()).slice(0, 4);
  }, [courses]);

  const handleEnroll = async (courseId) => {
    try {
      const res = await API.post("/payments/initialize", {
        courseId,
        callbackUrl: `${window.location.origin}/payments/callback`,
      });

      const url = res.data.authorization_url;
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Payment routing engine error:", error);
    }
  };

  const getLevel = (course, index) => {
    if (course.price >= 120000 || index % 3 === 2) return "Advanced";
    if (course.price >= 65000 || index % 3 === 1) return "Intermediate";
    return "Beginner";
  };

  const formatPrice = (value) => `₦${Number(value || 0).toLocaleString()}`;

  const formatStudents = (value) => {
    const count = Number(value || 0);
    if (count >= 1000) return `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}k students`;
    return `${count} students`;
  };

  if (loading) {
    return (
      <div className={styles.loadingPane}>
        <div className={styles.spinner} />
        <p>Loading Course Catalog & Enrollment Data...</p>
      </div>
    );
  }

  return (
    <motion.div
      className={styles.catalogPage}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {/* HERO SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.heroCopy}>
          <p className={styles.heroKicker}>Education / Programs</p>
          <h1>Explore Our Programs</h1>
          <p className={styles.heroIntro}>
            Master the digital economy with industry-leading programs designed for the African context.
            Built for practical growth, premium delivery, and clear next steps.
          </p>

          <div className={styles.avatarRow}>
            <div className={styles.avatarStack}>
              {featuredInstructors.map((instructor, index) => (
                <span key={instructor._id || index} className={styles.avatar}>
                  {(instructor.fullName || "Instructor")
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </span>
              ))}
              <span className={`${styles.avatar} ${styles.avatarCount}`}>
                +{Math.max(0, courses.length - featuredInstructors.length)}
              </span>
            </div>
            <div className={styles.avatarCopy}>
              <strong>Top instructors joining daily</strong>
              <span>Fresh guidance, premium mentoring, and a growing program library.</span>
            </div>
          </div>
        </div>

        <div className={styles.heroSide}>
          <div className={styles.statsGrid}>
            {stats.map((item, index) => (
              <motion.article
                key={item.label}
                className={styles.statCard}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <span className={styles.statIcon}>{item.icon}</span>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 1: MY REGISTERED COURSES */}
      {enrolledCourses.length > 0 && (
        <section className={styles.sectionWrap}>
          <div className={styles.sectionHeadRow}>
            <div className={styles.sectionBadgeTitle}>
              <span className={styles.liveIndicator}></span>
              <h2>My Active Programs</h2>
            </div>
            <p className={styles.sectionSubtitle}>Continue where you left off with your active modules</p>
          </div>

          <div className={styles.coursesGrid}>
            {enrolledCourses.map((course, index) => {
              const level = getLevel(course, index);
              const instructorName = course.instructor?.fullName || "Benedex Mentor";
              const tools = course.tools || [];
              const studentCount = course.students?.length || 0;

              return (
                <motion.article
                  key={`enrolled-${course._id}`}
                  className={styles.courseCard}
                  whileHover={{ y: -6 }}
                >
                  <div className={styles.cardPreview}>
                    {course.image ? (
                      <img src={course.image} alt={course.title} />
                    ) : (
                      <div className={styles.cardFallback}><FiPlayCircle /></div>
                    )}
                    <div className={styles.cardBadges}>
                      <span>{tools[0] || "Premium Track"}</span>
                      <span className={styles.hotBadge}>Active</span>
                    </div>
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.cardTopMeta}>
                      <span><FiLayers /> {level}</span>
                      <span><FiStar /> Enrolled</span>
                    </div>

                    <h3>{course.title}</h3>
                    <p>{course.description}</p>

                    {/* <div className={styles.tagsContainer}>
                      {(tools.length > 0 ? tools : ["Strategy"]).slice(0, 3).map((tool) => (
                        <span key={tool}>{tool}</span>
                      ))}
                    </div> */}

                    {/* <div className={styles.statsContainer}>
                      <span><FiUsers /> {formatStudents(studentCount)}</span>
                      <span><FiClock /> {course.duration || "3 Months"}</span>
                    </div> */}

                    <div className={styles.cardFooter}>
                      <div className={styles.priceContainer}>
                        <span>Status</span>
                        <strong>Active</strong>
                      </div>
                      <div className={styles.instructorMini}>
                        <span>{instructorName.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase()}</span>
                        <strong>{instructorName}</strong>
                      </div>
                    </div>

                    <div className={`${styles.cardActions} ${styles.singleAction}`}>
                      <Link className={styles.enrollButton} to={`/student/courses/${course._id}`}>
                        Enter Classroom <FiArrowRight />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>
      )}

      {/* SECTION 2: EXPLORE CATALOG / MARKETPLACE */}
      <section className={styles.sectionWrap}>
        <div className={styles.sectionHeadRow}>
          <h2>Explore Marketplace</h2>
          <p className={styles.sectionSubtitle}>Discover new tracks and upgrade your skills architecture</p>
        </div>

        {/* TOOLBAR CONTROLS */}
        <div className={styles.toolbar}>
          <div className={styles.filtersWrapper}>
            {tracks.map((track) => (
              <button
                key={track}
                type="button"
                className={`${styles.chipFilter} ${selectedTrack === track ? styles.isActive : ""}`}
                onClick={() => {
                  setSelectedTrack(track);
                  setVisibleCount(4);
                }}
              >
                {track}
              </button>
            ))}
          </div>

          <div className={styles.controlsWrapper}>
            <button type="button" className={styles.moreFiltersBtn}>
              <FiFilter /> Filters
            </button>
            <label className={styles.sorterLabel}>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="title">A to Z</option>
              </select>
              <FiChevronDown />
            </label>
          </div>
        </div>

        <div className={styles.gridHeaderCount}>
          <p>Showing {Math.min(visibleMarketplaceCourses.length, filteredMarketplaceCount)} of {filteredMarketplaceCount} premium streams</p>
        </div>

        {/* GRID */}
        <div className={styles.coursesGrid}>
          {visibleMarketplaceCourses.map((course, index) => {
            const level = getLevel(course, index);
            const instructorName = course.instructor?.fullName || "Benedex Mentor";
            const tools = course.tools || [];
            const studentCount = course.students?.length || 0;

            return (
              <motion.article
                key={course._id}
                className={styles.courseCard}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                whileHover={{ y: -6 }}
              >
                <div className={styles.cardPreview}>
                  {course.image ? (
                    <img src={course.image} alt={course.title} />
                  ) : (
                    <div className={styles.cardFallback}><FiPlayCircle /></div>
                  )}
                  <div className={styles.cardBadges}>
                    <span>{tools[0] || "Premium Track"}</span>
                    <span className={styles.hotBadge}>Hot</span>
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.cardTopMeta}>
                    <span><FiLayers /> {level}</span>
                    <span><FiStar /> Premium</span>
                  </div>

                  <h3>{course.title}</h3>
                  <p>{course.description}</p>

                  <div className={styles.tagsContainer}>
                    {(tools.length > 0 ? tools : ["Strategy"]).slice(0, 3).map((tool) => (
                      <span key={tool}>{tool}</span>
                    ))}
                  </div>

                  <div className={styles.statsContainer}>
                    {/* <span><FiUsers /> {formatStudents(studentCount)}</span> */}
                    <span><FiClock /> {course.duration || "3 Months"}</span>
                  </div>

                  <div className={styles.cardFooter}>
                    <div className={styles.priceContainer}>
                      <span>Price</span>
                      <strong>{formatPrice(course.price)}</strong>
                    </div>
                    <div className={styles.instructorMini}>
                      <span>{instructorName.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase()}</span>
                      <strong>{instructorName}</strong>
                    </div>
                  </div>

                  <div className={styles.cardActions}>
                    <button
                      type="button"
                      className={styles.enrollButton}
                      onClick={() => handleEnroll(course._id)}
                    >
                      Enroll Now
                    </button>
                    <Link className={styles.viewButton} to={`/student/courses/${course._id}`}>
                      Details <FiArrowRight />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {filteredMarketplaceCount > visibleCount && (
          <div className={styles.moreRow}>
            <button
              type="button"
              className={styles.moreButton}
              onClick={() => setVisibleCount((c) => c + 4)}
            >
              Show More Programs <FiChevronDown />
            </button>
          </div>
        )}
      </section>

      {/* CTA FOOTER BRIDGES */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaCopy}>
          <h2>Not sure where to start?</h2>
          <p>Take a quick assessment, review your learning path, and move into the right track with confidence.</p>
        </div>
        <div className={styles.ctaActions}>
          <Link className={styles.ctaPrimary} to="/student/assignments">
            Start Free Assessment <FiArrowRight />
          </Link>
          <Link className={styles.ctaSecondary} to="/student/messages">
            Talk to a Career Coach
          </Link>
        </div>
      </section>
    </motion.div>
  );
}

export default StudentCourses;