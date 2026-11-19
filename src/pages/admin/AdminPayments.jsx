import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../../services/api";
import {
  FiDollarSign,
  FiSearch,
  FiCheckCircle,
  FiClock,
  FiFilter,
  FiTrendingUp,
  FiRefreshCw,
} from "react-icons/fi";
import "./AdminPayments.css";

const PAYMENTS_PER_PAGE = 20;

function AdminPayments() {
  const [payments, setPayments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  // ==========================================
  // FETCH PAYMENTS
  // ==========================================

  const fetchPayments = async (
    page = 1,
    append = false
  ) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const response = await API.get(
        `/payments/all?page=${page}&limit=${PAYMENTS_PER_PAGE}`
      );

      const newPayments =
        response.data?.payments || [];

      if (append) {
        setPayments((prev) => [
          ...prev,
          ...newPayments,
        ]);
      } else {
        setPayments(newPayments);
      }

      setCurrentPage(
        response.data?.page || page
      );

      setHasMore(
        Boolean(response.data?.hasMore)
      );
    } catch (error) {
      console.error(
        "Critical transaction ledger synchronization failure:",
        error
      );

      if (!append) {
        setPayments([]);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    fetchPayments(1, false);
  }, []);

  // ==========================================
  // LOAD MORE
  // ==========================================

  const handleLoadMore = () => {
    if (loadingMore || !hasMore) return;

    fetchPayments(
      currentPage + 1,
      true
    );
  };

  // ==========================================
  // REFRESH
  // ==========================================

  const handleRefresh = () => {
    setCurrentPage(1);
    fetchPayments(1, false);
  };

  // ==========================================
  // SAFE PAYMENT ARRAY
  // ==========================================

  const safePayments = Array.isArray(
    payments
  )
    ? payments
    : [];

  // ==========================================
  // TELEMETRY AGGREGATIONS
  // ==========================================

  const totalRevenue = safePayments
    .filter(
      (payment) =>
        payment.status === "success"
    )
    .reduce(
      (sum, payment) =>
        sum + (payment.amount || 0),
      0
    );

  const successfulCount =
    safePayments.filter(
      (payment) =>
        payment.status === "success"
    ).length;

  const pendingCount =
    safePayments.filter(
      (payment) =>
        payment.status === "pending"
    ).length;

  // ==========================================
  // LOCAL SEARCH + STATUS FILTER
  // ==========================================

  const filteredPayments =
    safePayments.filter((payment) => {
      const search =
        searchTerm.toLowerCase();

      const matchesSearch =
        payment.reference
          ?.toLowerCase()
          .includes(search) ||
        payment.student?.fullName
          ?.toLowerCase()
          .includes(search) ||
        payment.student?.email
          ?.toLowerCase()
          .includes(search) ||
        payment.course?.title
          ?.toLowerCase()
          .includes(search);

      const matchesStatus =
        statusFilter === "all" ||
        payment.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });

  // ==========================================
  // LOADING STATE
  // ==========================================

  if (loading) {
    return (
      <div className="bx-pm-loading-pane">
        <div className="bx-pm-spinner"></div>

        <p className="mt-3 text-muted font-weight-bold">
          Compiling Dynamic Platform Telemetry...
        </p>
      </div>
    );
  }

  return (
    <div className="bx-pm-workspace container-fluid py-4">

      {/* ======================================
          HEADER SECTION
      ====================================== */}

      <header className="bx-pm-header d-flex flex-column gap-3 mb-4">

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">

          <div className="bx-pm-title-zone">

            <div className="d-flex align-items-center gap-3">

              <div className="bx-pm-icon-box">
                <FiDollarSign size={24} />
                <span className="bx-pm-pulse-light" />
              </div>

              <div>

                <div className="d-flex align-items-center gap-2">

                  <h1 className="h3 mb-0 font-weight-bold">
                    Financial Registry Log
                  </h1>

                  <span className="bx-pm-ver-badge">
                    Ecosystem Ledger
                  </span>

                </div>

                <p className="text-muted mb-0 small">
                  Audit system wide transactions,
                  balance reconciliations, and
                  Paystack parameters.
                </p>

              </div>

            </div>

          </div>

          {/* SEARCH */}
          <div className="bx-pm-search-wrapper">

            <FiSearch className="bx-pm-search-icon" />

            <input
              type="text"
              placeholder="Search reference string, user, curriculum..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />

          </div>

        </div>

        {/* ======================================
            FINANCIAL METRICS
        ====================================== */}

        <div className="row g-3 my-1">

          {/* REVENUE */}
          <div className="col-12 col-md-4">

            <div className="bx-pm-stat-card">

              <span className="bx-pm-stat-label">
                Gross Ecosystem Revenue
              </span>

              <div className="d-flex align-items-center justify-content-between mt-1">

                <h2 className="bx-pm-stat-val text-dark mb-0">
                  ₦{totalRevenue.toLocaleString()}
                </h2>

                <div className="bx-pm-stat-icon is-gold">
                  <FiTrendingUp />
                </div>

              </div>

            </div>

          </div>

          {/* SUCCESSFUL */}
          <div className="col-12 col-sm-6 col-md-4">

            <div className="bx-pm-stat-card">

              <span className="bx-pm-stat-label">
                Verified Transactions
              </span>

              <div className="d-flex align-items-center justify-content-between mt-1">

                <h2 className="bx-pm-stat-val text-dark mb-0">
                  {successfulCount}
                </h2>

                <div className="bx-pm-stat-icon is-green">
                  <FiCheckCircle />
                </div>

              </div>

            </div>

          </div>

          {/* PENDING */}
          <div className="col-12 col-sm-6 col-md-4">

            <div className="bx-pm-stat-card">

              <span className="bx-pm-stat-label">
                Unresolved Pipelines
              </span>

              <div className="d-flex align-items-center justify-content-between mt-1">

                <h2 className="bx-pm-stat-val text-dark mb-0">
                  {pendingCount}
                </h2>

                <div className="bx-pm-stat-icon is-amber">
                  <FiClock />
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ======================================
            FILTER BAR
        ====================================== */}

        <div className="bx-pm-filter-bar d-flex align-items-center gap-2 flex-wrap mt-2">

          <div className="bx-pm-filter-label text-muted d-flex align-items-center gap-1 small font-weight-bold">

            <FiFilter size={14} />

            <span>
              Transaction Filter:
            </span>

          </div>

          <div
            className="bx-pm-filter-options d-flex gap-1"
            style={{
              flexWrap: "wrap",
            }}
          >

            {[
              {
                id: "all",
                label: "All Records",
              },
              {
                id: "success",
                label: "Successful",
              },
              {
                id: "pending",
                label: "Pending Verification",
              },
              {
                id: "failed",
                label: "Failed Parameters",
              },
            ].map((tab) => (

              <button
                key={tab.id}
                type="button"
                className={`bx-pm-filter-btn ${
                  statusFilter === tab.id
                    ? "is-active"
                    : ""
                }`}
                onClick={() =>
                  setStatusFilter(tab.id)
                }
              >
                {tab.label}
              </button>

            ))}

          </div>

          {/* REFRESH */}
          <button
            type="button"
            className="bx-pm-refresh-btn"
            onClick={handleRefresh}
            disabled={loadingMore}
            title="Refresh payment registry"
          >

            <FiRefreshCw
              className={
                loadingMore
                  ? "bx-pm-refresh-spinning"
                  : ""
              }
            />

            Refresh

          </button>

        </div>

      </header>

      {/* ======================================
          PAYMENT TABLE
      ====================================== */}

      <div className="bx-pm-card-panel">

        <div className="table-responsive">

          <table className="bx-pm-table w-100">

            <thead>

              <tr>

                <th>
                  Student Profile
                </th>

                <th>
                  Course Name
                </th>

                <th>
                  Payment Reference
                </th>

                <th>
                  Amount
                </th>

                <th>
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredPayments.length > 0 ? (

                filteredPayments.map(
                  (payment, idx) => (

                    <motion.tr
                      key={
                        payment._id || idx
                      }
                      initial={{
                        opacity: 0,
                        y: 5,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay:
                          idx * 0.02,
                      }}
                    >

                      {/* STUDENT */}
                      <td>

                        <div className="bx-pm-profile-cell">

                          <span className="bx-pm-text-primary d-block">
                            {payment.student
                              ?.fullName ||
                              "Unregistered Profiling Entity"}
                          </span>

                          <span className="bx-pm-text-secondary text-muted small">
                            {payment.student
                              ?.email ||
                              "N/A hash"}
                          </span>

                        </div>

                      </td>

                      {/* COURSE */}
                      <td>

                        <span className="bx-pm-text-primary">
                          {payment.course
                            ?.title ||
                            "Deleted Course"}
                        </span>

                      </td>

                      {/* REFERENCE */}
                      <td>

                        <code className="bx-pm-reference-tag">
                          {payment.reference}
                        </code>

                      </td>

                      {/* AMOUNT */}
                      <td>

                        <span className="bx-pm-text-money">
                          ₦
                          {payment.amount?.toLocaleString() ||
                            0}
                        </span>

                      </td>

                      {/* STATUS */}
                      <td>

                        <span
                          className={`bx-pm-status-pill is-${payment.status}`}
                        >
                          {payment.status}
                        </span>

                      </td>

                    </motion.tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan={5}
                    className="text-center py-5 text-muted small"
                  >
                    No matching transactional
                    structures registered on
                    active ecosystem filters.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* ======================================
            LOAD MORE
        ====================================== */}

        {payments.length > 0 && (

          <>

            {hasMore ? (

              <div className="bx-pm-load-more-wrap">

                <button
                  type="button"
                  className="bx-pm-load-more-btn"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                >

                  {loadingMore ? (

                    <>
                      <FiRefreshCw className="bx-pm-load-more-spinner" />
                      Loading Payments...
                    </>

                  ) : (

                    <>
                      <FiDollarSign />
                      Load 20 More
                    </>

                  )}

                </button>

              </div>

            ) : (

              <div className="bx-pm-end-message">

                <FiCheckCircle />

                You've reached the end of the payment registry.

              </div>

            )}

          </>

        )}

      </div>

    </div>
  );
}

export default AdminPayments;