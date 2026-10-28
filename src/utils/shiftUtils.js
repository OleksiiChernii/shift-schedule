
export const CYCLE = [
  "night",
  "night",
  "night",
  "off",
  "off",
  "evening",
  "evening",
  "evening",
  "off",
  "off",
  "day",
  "day",
  "day",
  "off",
  "off",
];

export const SHIFTS = [
  { id: "A", name: "Смена А", date: "2026-10-26", index: 0 },
  { id: "Б", name: "Смена Б", date: "2026-10-27", index: 9 },
  { id: "В", name: "Смена В", date: "2026-10-26", index: 6 },
  { id: "Г", name: "Смена Г", date: "2026-10-26", index: 3 },
  { id: "Д", name: "Смена Д", date: "2026-10-26", index: 12 },
];

export const SHIFT_LABELS = {
  night: "00:00 – 08:00",
  day: "08:00 – 16:00",
  evening: "16:00 – 00:00",
  off: "Вых",
};

export const SHIFT_NAMES = {
  night: "Ночная",
  day: "Дневная",
  evening: "Вечерняя",
  off: "Выходной",
};

export function dateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");

  return `${y}-${m}-${d}`;
}

export function parseDate(key) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function getShiftForDate(date, shift) {
  const target = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  const [year, month, day] = shift.date.split("-").map(Number);
  const anchor = Date.UTC(year, month - 1, day);
  const days = Math.round((target - anchor) / 86400000);

  const index =
    ((days + shift.index) % CYCLE.length + CYCLE.length) %
    CYCLE.length;

  return CYCLE[index];
}


export const WORKERS = {
  A: ["Патраман", "Насиковский ", "Соломон", "Ткач", "Черний"],
  "Б": ["Пономарев", "Кириленко", "Червань", "Андриченко", "Яновский"],
  "В": ["Степанов", "Осман", "Ильяш", "Орона", "Сметана"],
  "Г": ["Гайдук", "Оголенко", "Гуськов", "Кучеренко", "Хлебников", "Верин"],
  "Д": ["Чемшит", "Белозеров", "Литвинов", "Ветушко"],
};

