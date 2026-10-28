
import {
  SHIFTS,
  SHIFT_LABELS,
  SHIFT_NAMES,
  dateKey,
  getShiftForDate,
} from "../utils/shiftUtils";

export default function ShiftTable({
  year,
  month,
  daysInMonth,
  today,
  selectedDate,
  onSelectDay,
}) {
  return (
    <>
      <div className="calendar-scroll">
        <table className="calendar">
          <thead>
            <tr>
              <th className="date-column">Число</th>
              {SHIFTS.map((shift) => (
                <th key={shift.id}>{shift.id}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.from(
              { length: daysInMonth },
              (_, i) => i + 1
            ).map((day) => {
              const date = new Date(year, month, day);
              const key = dateKey(date);
              const isToday = key === dateKey(today);
              const isSelected = key === selectedDate;
              const isWeekend =
                date.getDay() === 0 || date.getDay() === 6;

              const rowClass = [
                isToday ? "today-row" : "",
                isSelected ? "selected-row" : "",
                isWeekend ? "weekend-row" : "",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <tr key={key} className={rowClass}>
                  <td>
                    <button
                      className="date-button"
                      onClick={() => onSelectDay(day)}
                      aria-pressed={isSelected}
                    >
                      <span>{String(day).padStart(2, "0")}</span>
                      <span className="weekday">
                        {new Intl.DateTimeFormat("ru-RU", {
                          weekday: "short",
                        })
                          .format(date)
                          .replace(".", "")}
                      </span>
                    </button>
                  </td>

                  {SHIFTS.map((shift) => {
                    const type = getShiftForDate(date, shift);

                    return (
                      <td key={shift.id}>
                        <button
                          className={`shift-cell ${type} ${
                            isSelected ? "selected-cell" : ""
                          }`}
                          onClick={() => onSelectDay(day, shift, type)}
                          title={`${shift.name}: ${SHIFT_NAMES[type]}`}
                        >
                          {SHIFT_LABELS[type]}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="legend">
        <span><i className="dot night-dot" /> Ночная</span>
        <span><i className="dot day-dot" /> Дневная</span>
        <span><i className="dot evening-dot" /> Вечерняя</span>
        <span><i className="dot off-dot" /> Выходной</span>
      </div>
    </>
  );
}
