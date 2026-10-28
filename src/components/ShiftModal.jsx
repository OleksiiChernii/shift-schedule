
import "./ShiftModal.css";

export default function ShiftModal({
  date,
  shift,
  workers,
  onClose,
}) {
  if (!shift) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <section
        className="shift-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Закрыть окно"
        >
          ×
        </button>

        <div className="eyebrow">ИНФОРМАЦИЯ О СМЕНЕ</div>

        <h2 id="modal-title">{shift.name}</h2>

        <p className="modal-date">
          {date.toLocaleDateString("ru-RU", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        <div className={`modal-shift-time ${shift.type}`}>
          {shift.type === "off"
            ? "Выходной"
            : shift.time}
        </div>

        <h3>Кто работает</h3>

        {workers.length > 0 ? (
          <ul className="worker-list">
            {workers.map((worker, index) => (
              <li key={`${worker}-${index}`}>{worker}</li>
            ))}
          </ul>
        ) : (
          <p className="empty-workers">
            Список работников пока не заполнен.
          </p>
        )}

        <button
          className="modal-action"
          onClick={onClose}
        >
          Закрыть
        </button>
      </section>
    </div>
  );
}
