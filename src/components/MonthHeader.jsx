
export default function MonthHeader({
  monthTitle,
  onChangeMonth,
  onGoToday,
}) {
  return (
    <>
      <header className="app-header">
        <div>
          <div className="eyebrow">РАБОЧИЙ КАЛЕНДАРЬ</div>
          <h1>График смен</h1>
          <p className="subtitle">Пять бригад · цикл 15 дней</p>
        </div>

        <button className="today-button" onClick={onGoToday}>
          Сегодня
        </button>
      </header>
{/* 
      <div className="month-toolbar">
        <button
          className="month-arrow"
          onClick={() => onChangeMonth(-1)}
          aria-label="Предыдущий месяц"
        >
          ‹
        </button>

        <h2>{monthTitle}</h2>

        <button
          className="month-arrow"
          onClick={() => onChangeMonth(1)}
          aria-label="Следующий месяц"
        >
          ›
        </button>
      </div> */}
    </>
  );
}
