
import { SHIFT_NAMES, SHIFT_LABELS } from "../utils/shiftUtils";

export default function DayDetails({
  selected,
  selectedShifts,
  workingShifts,
}) {
  return (
    <section className="details-card">
      <div className="details-heading">
        <div>
          <div className="eyebrow">ИНФОРМАЦИЯ НА ДАТУ</div>
          <h2>
            {selected.toLocaleDateString("ru-RU", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </h2>
        </div>

        <span className="working-count">
          Работают: {workingShifts.length} из 5
        </span>
      </div>

      <div className="shift-details">
        {selectedShifts.map((shift) => (
          <div className="detail-row" key={shift.id}>
            <div className="team-name">
              <span className={`team-letter ${shift.type}`}>
                {shift.id}
              </span>
              <span>{shift.name}</span>
            </div>

            <span className={`status-pill ${shift.type}`}>
              {SHIFT_NAMES[shift.type]}
              {shift.type !== "off" && (
                <> · {SHIFT_LABELS[shift.type]}</>
              )}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
