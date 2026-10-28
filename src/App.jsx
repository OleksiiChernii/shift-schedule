import { useEffect, useState } from "react";
import "./App.css";
import { loadWorkers, saveWorkers, DAY_PERSONNEL } from "./utils/workerStorage";

import AppMenu from "./components/AppMenu";
import MonthHeader from "./components/MonthHeader";
import ShiftTable from "./components/ShiftTable";
import DayDetails from "./components/DayDetails";
import ShiftModal from "./components/ShiftModal";
import ShiftTeams from "./components/ShiftTeams";

import {
  SHIFTS,
  WORKERS,
  SHIFT_LABELS,
  dateKey,
  parseDate,
  getShiftForDate,
} from "./utils/shiftUtils";

export default function App() {
  const [today] = useState(() => new Date());

  const [workers, setWorkers] = useState(loadWorkers);

  useEffect(() => {
    saveWorkers(workers);
  }, [workers]);

  // Добавление новых работников только в дневной персонал
  function addWorker(teamId, name) {
    if (teamId !== DAY_PERSONNEL) return;

    const worker = {
      id: `worker-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: name.trim(),
    };

    if (!worker.name) return;

    setWorkers((current) => ({
      ...current,
      [DAY_PERSONNEL]: [...(current[DAY_PERSONNEL] || []), worker],
    }));
  }

  // Перевод работника между списками
  function moveWorker(fromTeam, toTeam, workerId) {
    if (fromTeam === toTeam) return;

    setWorkers((current) => {
      const source = current[fromTeam] || [];
      const worker = source.find((item) => item.id === workerId);

      if (!worker) return current;

      return {
        ...current,
        [fromTeam]: source.filter((item) => item.id !== workerId),
        [toTeam]: [...(current[toTeam] || []), worker],
      };
    });
  }

  const [viewDate, setViewDate] = useState(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );

  const [selectedDate, setSelectedDate] = useState(() => dateKey(new Date()));

  const [activeTab, setActiveTab] = useState("schedule");
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthTitle = new Intl.DateTimeFormat("ru-RU", {
    month: "long",
    year: "numeric",
  }).format(viewDate);

  const selected = parseDate(selectedDate);

  function changeMonth(amount) {
    setViewDate(
      (currentDate) =>
        new Date(currentDate.getFullYear(), currentDate.getMonth() + amount, 1),
    );
  }

  function selectDay(day) {
    setSelectedDate(dateKey(new Date(year, month, day)));
  }

  function goToToday() {
    const now = new Date();

    setViewDate(new Date(now.getFullYear(), now.getMonth(), 1));
    setSelectedDate(dateKey(now));
  }

  function openShiftModal(day, shift, type) {
    selectDay(day);

    setModalData({
      date: new Date(year, month, day),
      shift: {
        ...shift,
        type,
        time: SHIFT_LABELS[type],
      },
      workers: WORKERS[shift.id] ?? [],
    });
  }

  const selectedShifts = SHIFTS.map((shift) => ({
    ...shift,
    type: getShiftForDate(selected, shift),
  }));

  const workingShifts = selectedShifts.filter((shift) => shift.type !== "off");

  function changeTab(tab) {
    setActiveTab(tab);
    setMenuOpen(false);
    setModalData(null);
  }

  return (
    <main className="app">
      <AppMenu
        activeTab={activeTab}
        onChangeTab={changeTab}
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <div className="app-topbar">
        <button
          className="menu-trigger"
          onClick={() => setMenuOpen(true)}
          aria-label="Открыть меню"
          aria-expanded={menuOpen}
        >
          ☰
        </button>

        <span className="app-topbar-label">
          {activeTab === "schedule" ? "График смен" : "Состав смен"}
        </span>
      </div>

      {activeTab === "schedule" ? (
        <>
          <MonthHeader
            monthTitle={monthTitle}
            onChangeMonth={changeMonth}
            onGoToday={goToToday}
          />

          <section className="calendar-card">
            <div className="month-toolbar">
              <button
                className="month-arrow"
                onClick={() => changeMonth(-1)}
                aria-label="Предыдущий месяц"
              >
                ‹
              </button>

              <h2>{monthTitle}</h2>

              <button
                className="month-arrow"
                onClick={() => changeMonth(1)}
                aria-label="Следующий месяц"
              >
                ›
              </button>
            </div>

            <ShiftTable
              year={year}
              month={month}
              daysInMonth={daysInMonth}
              today={today}
              selectedDate={selectedDate}
              onSelectDay={openShiftModal}
            />
          </section>

          <DayDetails
            selected={selected}
            selectedShifts={selectedShifts}
            workingShifts={workingShifts}
          />

          <footer className="app-footer">
            График рассчитан по повторяющемуся 15-дневному циклу.
          </footer>

          {modalData && (
            <ShiftModal
              date={modalData.date}
              shift={modalData.shift}
              workers={modalData.workers}
              onClose={() => setModalData(null)}
            />
          )}
        </>
      ) : (
        <ShiftTeams workers={workers} onAdd={addWorker} onMove={moveWorker} />
      )}
    </main>
  );
}
