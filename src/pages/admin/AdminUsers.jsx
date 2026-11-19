import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../services/api";
import {
  FiUsers,
  FiShield,
  FiUserCheck,
  FiTrash2,
  FiAlertCircle,
  FiSearch,
  FiX,
  FiActivity,
  FiFilter,
  FiRefreshCw,
  FiCheck,
} from "react-icons/fi";
import "./AdminUsers.css";

const USERS_PER_PAGE = 20;

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  // MODAL STATES
  const [modal, setModal] = useState({
    isOpen: false,
    type: null,
    user: null,
    processing: false,
  });

  // =========================
  // FETCH USERS
  // =========================

  const fetchUsers = async (
    page = 1,
    append = false,
    search = searchTerm,
    role = roleFilter
  ) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const response = await API.get(
        `/users?page=${page}&limit=${USERS_PER_PAGE}&search=${encodeURIComponent(
          search
        )}&role=${role}`
      );

      const newUsers = response.data?.users || [];

      if (append) {
        setUsers((prev) => [...prev, ...newUsers]);
      } else {
        setUsers(newUsers);
      }

      setCurrentPage(response.data?.page || page);
      setHasMore(Boolean(response.data?.hasMore));
    } catch (error) {
      console.error("Registry fetch failure:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchUsers(1, false);
  }, []);

  // =========================
  // SEARCH
  // =========================

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      setCurrentPage(1);
      fetchUsers(1, false, searchTerm, roleFilter);
    }, 400);

    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  // =========================
  // ROLE FILTER
  // =========================

  const handleRoleFilter = (role) => {
    setRoleFilter(role);
    setCurrentPage(1);

    fetchUsers(1, false, searchTerm, role);
  };

  // =========================
  // LOAD MORE
  // =========================

  const handleLoadMore = () => {
    if (loadingMore || !hasMore) return;

    fetchUsers(
      currentPage + 1,
      true,
      searchTerm,
      roleFilter
    );
  };

  // =========================
  // REFRESH
  // =========================

  const handleRefresh = () => {
    setCurrentPage(1);

    fetchUsers(
      1,
      false,
      searchTerm,
      roleFilter
    );
  };

  // =========================
  // MODALS
  // =========================

  const openModal = (type, user) => {
    setModal({
      isOpen: true,
      type,
      user,
      selectedRole: user?.role || "student",
      processing: false,
    });
  };

  const closeModal = () => {
    setModal({
      isOpen: false,
      type: null,
      user: null,
      selectedRole: "student",
      processing: false,
    });
  };

  // =========================
  // USER ACTIONS
  // =========================

  const handleAction = async (overridePayload) => {
    const { type, user, selectedRole } = modal;
    const targetRole = overridePayload || selectedRole;

    setModal((prev) => ({
      ...prev,
      processing: true,
    }));

    try {
      if (type === "delete") {
        await API.delete(`/users/${user._id}`);

        setUsers((prev) =>
          prev.filter((u) => u._id !== user._id)
        );
      }

      if (type === "role") {
        await API.put(`/users/role/${user._id}`, {
          role: targetRole,
        });

        setUsers((prev) =>
          prev.map((u) =>
            u._id === user._id
              ? { ...u, role: targetRole }
              : u
          )
        );
      }

      if (type === "status") {
        const newStatus =
          user.status === "suspended"
            ? "active"
            : "suspended";

        await API.put(`/users/status/${user._id}`, {
          status: newStatus,
        });

        setUsers((prev) =>
          prev.map((u) =>
            u._id === user._id
              ? { ...u, status: newStatus }
              : u
          )
        );
      }

      closeModal();
    } catch (error) {
      alert(
        "Transactional Failure: " +
          (error.response?.data?.message ||
            error.message)
      );

      setModal((prev) => ({
        ...prev,
        processing: false,
      }));
    }
  };

  // =========================
  // LOADING STATE
  // =========================

  if (loading) {
    return (
      <div className="bx-ur-loading-pane">
        <div className="bx-ur-spinner"></div>
        <p>Synchronizing Registry...</p>
      </div>
    );
  }

  return (
    <div className="bx-ur-workspace container-fluid py-4">

      {/* HEADER CONTROLS ZONE */}
      <header className="bx-ur-header d-flex flex-column gap-3 mb-4">

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">

          <div className="bx-ur-title-zone">
            <div className="d-flex align-items-center gap-2 mb-1">
              <FiShield className="text-muted" />

              <h1 className="h3 mb-0 font-weight-bold">
                Identity Management
              </h1>
            </div>

            <p className="text-muted mb-0 small">
              Audit, manage, and assign platform user accounts and permissions.
            </p>
          </div>

          <div className="bx-ur-search-wrapper">
            <FiSearch className="bx-ur-search-icon" />

            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />
          </div>
        </div>

        {/* ROLE FILTER */}
        <div className="bx-ur-filter-bar d-flex align-items-center gap-2 flex-wrap">

          <div className="bx-ur-filter-label text-muted d-flex align-items-center gap-1 small font-weight-bold">
            <FiFilter size={14} />
            <span>Clearance Filter:</span>
          </div>

          <div
            className="bx-ur-filter-options d-flex gap-1"
            style={{ flexWrap: "wrap" }}
          >
            {[
              {
                id: "all",
                label: "All Users",
              },
              {
                id: "superadmin",
                label: "Super Admins",
              },
              {
                id: "admin",
                label: "Administrators",
              },
              {
                id: "instructor",
                label: "Instructors",
              },
              {
                id: "student",
                label: "Students",
              },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`bx-ur-filter-btn ${
                  roleFilter === tab.id
                    ? "is-active"
                    : ""
                }`}
                onClick={() =>
                  handleRoleFilter(tab.id)
                }
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* REFRESH */}
          <button
            type="button"
            className="bx-ur-refresh-btn"
            onClick={handleRefresh}
            disabled={loadingMore}
            title="Refresh users"
          >
            <FiRefreshCw
              className={
                loadingMore
                  ? "bx-ur-refresh-spinning"
                  : ""
              }
            />
            Refresh
          </button>
        </div>
      </header>

      {/* REGISTRY TABLE */}
      <div className="bx-ur-card-panel">

        <div className="table-responsive">

          <table className="bx-ur-table w-100">

            <thead>
              <tr>
                <th>User Profile</th>
                <th>System Role</th>
                <th>Status</th>
                <th className="text-end">
                  Authorized Actions
                </th>
              </tr>
            </thead>

            <tbody>

              {users.length > 0 ? (
                users.map((user, idx) => (
                  <motion.tr
                    key={user._id}
                    initial={{
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: idx * 0.02,
                    }}
                  >

                    {/* PROFILE */}
                    <td>
                      <div className="bx-ur-user-info">

                        <div
                          className={`bx-ur-avatar is-${user.role}`}
                        >
                          {user.fullName?.charAt(0)}
                        </div>

                        <div>
                          <span className="bx-ur-name d-block">
                            {user.fullName}
                          </span>

                          <span className="bx-ur-email text-muted small">
                            {user.email}
                          </span>
                        </div>

                      </div>
                    </td>

                    {/* ROLE */}
                    <td>
                      <span
                        className={`bx-ur-role-badge is-${user.role}`}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* STATUS */}
                    <td>
                      <div
                        className={`bx-ur-status-indicator is-${
                          user.status || "active"
                        }`}
                      >
                        <span className="bx-ur-dot"></span>

                        <span className="text-capitalize">
                          {user.status || "active"}
                        </span>
                      </div>
                    </td>

                    {/* ACTIONS */}
                    <td className="text-end">

                      <div className="d-flex justify-content-end gap-2">

                        <button
                          className="bx-ur-action-btn"
                          title="Modify System Role"
                          onClick={() =>
                            openModal("role", user)
                          }
                        >
                          <FiUserCheck />
                        </button>

                        <button
                          className="bx-ur-action-btn"
                          title="Toggle Status"
                          onClick={() =>
                            openModal("status", user)
                          }
                        >
                          <FiActivity />
                        </button>

                        <button
                          className="bx-ur-action-btn is-danger"
                          title="Purge Account"
                          onClick={() =>
                            openModal("delete", user)
                          }
                        >
                          <FiTrash2 />
                        </button>

                      </div>

                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-5 text-muted small"
                  >
                    No registry assets map to your active query vectors.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

        {/* LOAD MORE */}
        {users.length > 0 && (
          <>
            {hasMore ? (
              <div className="bx-ur-load-more-wrap">

                <button
                  type="button"
                  className="bx-ur-load-more-btn"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                >
                  {loadingMore ? (
                    <>
                      <FiRefreshCw className="bx-ur-load-more-spinner" />
                      Loading Users...
                    </>
                  ) : (
                    <>
                      <FiUsers />
                      Load 20 More
                    </>
                  )}
                </button>

              </div>
            ) : (
              <div className="bx-ur-end-message">
                <FiShield />
                You've reached the end of the user registry.
              </div>
            )}
          </>
        )}

      </div>

      {/* ACTION MODAL SYSTEM REDESIGN */}
      <AnimatePresence>
        {modal.isOpen && (
          <div className="bx-ur-modal-overlay">
            <motion.div
              className="bx-ur-modal-card"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              {/* MODAL HEADER */}
              <div className="bx-ur-modal-header">
                <div className="d-flex align-items-center gap-3">
                  <div className={`bx-ur-modal-badge is-${modal.type}`}>
                    {modal.type === "delete" && <FiTrash2 size={20} />}
                    {modal.type === "status" && <FiAlertCircle size={20} />}
                    {modal.type === "role" && <FiShield size={20} />}
                  </div>

                  <div>
                    <span className="bx-ur-modal-eyebrow">
                      {modal.type === "delete" && "DANGER ZONE"}
                      {modal.type === "status" && "ACCOUNT ACCESS"}
                      {modal.type === "role" && "ROLE CLEARANCE"}
                    </span>

                    <h3 className="bx-ur-modal-title mb-0">
                      {modal.type === "delete" && "Delete User Account"}
                      {modal.type === "status" &&
                        (modal.user?.status === "suspended"
                          ? "Reactivate Account Access"
                          : "Suspend Account Access")}
                      {modal.type === "role" && "Change User Role"}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  className="bx-ur-close-modal"
                  onClick={closeModal}
                  title="Cancel"
                >
                  <FiX />
                </button>
              </div>

              {/* MODAL BODY */}
              <div className="bx-ur-modal-body">
                <p className="bx-ur-modal-desc mb-0">
                  {modal.type === "delete" && (
                    <>
                      Are you sure you want to permanently delete{" "}
                      <strong>{modal.user?.fullName}</strong>? This action will purge all associated user records and cannot be undone.
                    </>
                  )}

                  {modal.type === "status" && (
                    <>
                      Are you sure you want to{" "}
                      <strong>
                        {modal.user?.status === "suspended"
                          ? "reactivate account access for"
                          : "suspend access for"}
                      </strong>{" "}
                      <strong>{modal.user?.fullName}</strong>?
                    </>
                  )}

                  {modal.type === "role" && (
                    <>
                      Select a new access clearance role for{" "}
                      <strong>{modal.user?.fullName}</strong>.
                    </>
                  )}
                </p>

                {/* ROLE SELECTOR GRID */}
                {modal.type === "role" && (
                  <div className="bx-ur-role-grid mt-3">
                    {["student", "instructor", "admin", "superadmin"].map((r) => {
                      const isSelected = modal.selectedRole === r;
                      return (
                        <button
                          key={r}
                          type="button"
                          className={`bx-ur-role-card ${isSelected ? "active" : ""}`}
                          onClick={() =>
                            setModal((prev) => ({ ...prev, selectedRole: r }))
                          }
                          disabled={modal.processing}
                        >
                          <span className="text-capitalize">{r}</span>
                          {isSelected && <FiCheck size={14} className="ms-auto text-success" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* MODAL FOOTER WITH CLEAR CTAS */}
              <div className="bx-ur-modal-footer">
                <button
                  type="button"
                  className="bx-ur-btn-cancel"
                  onClick={closeModal}
                  disabled={modal.processing}
                >
                  Cancel
                </button>

                {modal.type === "delete" && (
                  <button
                    type="button"
                    className="bx-ur-btn-danger"
                    onClick={() => handleAction()}
                    disabled={modal.processing}
                  >
                    {modal.processing ? "Deleting..." : "Delete User"}
                  </button>
                )}

                {modal.type === "status" && (
                  <button
                    type="button"
                    className={`bx-ur-btn-action ${
                      modal.user?.status === "suspended" ? "is-activate" : "is-suspend"
                    }`}
                    onClick={() => handleAction()}
                    disabled={modal.processing}
                  >
                    {modal.processing
                      ? "Updating..."
                      : modal.user?.status === "suspended"
                      ? "Reactivate Account"
                      : "Suspend Account"}
                  </button>
                )}

                {modal.type === "role" && (
                  <button
                    type="button"
                    className="bx-ur-btn-primary"
                    onClick={() => handleAction(modal.selectedRole)}
                    disabled={modal.processing}
                  >
                    {modal.processing ? "Updating..." : "Save Role"}
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default AdminUsers;
