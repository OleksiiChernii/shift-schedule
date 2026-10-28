
import "./AppMenu.css";

export default function AppMenu({
  activeTab,
  onChangeTab,
  isOpen,
  onClose,
}) {
  return (
    <>
      {isOpen && (
        <button
          className="menu-backdrop"
          onClick={onClose}
          aria-label="Закрыть меню"
        />
      )}

      <aside className={`app-menu ${isOpen ? "open" : ""}`}>
        <div className="menu-heading">
          <strong>График работы</strong>

          <button
            className="menu-close"
            onClick={onClose}
            aria-label="Закрыть меню"
          >
            ×
          </button>
        </div>

        <nav className="menu-nav">
          <button
            className={`menu-item ${
              activeTab === "schedule" ? "active" : ""
            }`}
            onClick={() => onChangeTab("schedule")}
          >
            <span className="menu-icon">▦</span>
            График смен
          </button>

          <button
            className={`menu-item ${
              activeTab === "teams" ? "active" : ""
            }`}
            onClick={() => onChangeTab("teams")}
          >
            <span className="menu-icon">♟</span>
            Состав смен
          </button>
        </nav>
      </aside>
    </>
  );
}
