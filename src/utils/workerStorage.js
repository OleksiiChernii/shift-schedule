
import { WORKERS } from "./shiftUtils";

const STORAGE_KEY = "shift-schedule-workers-v1";
export const DAY_PERSONNEL = "dayPersonnel";

function createWorkerList(teamId, entries) {
  return (Array.isArray(entries) ? entries : []).map(
    (entry, index) => {
      if (typeof entry === "string") {
        return {
          id: `${teamId}-${index + 1}`,
          name: entry,
        };
      }

      return {
        id: entry.id || `${teamId}-${index + 1}`,
        name: String(entry.name || ""),
      };
    }
  );
}

export function loadWorkers() {
  let saved = null;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) saved = JSON.parse(raw);
  } catch (error) {
    console.error("Не удалось загрузить состав смен:", error);
  }

  const result = {
    [DAY_PERSONNEL]: createWorkerList(
      DAY_PERSONNEL,
      saved?.[DAY_PERSONNEL] || []
    ),
  };

  for (const [teamId, defaultNames] of Object.entries(WORKERS)) {
    const source = saved?.[teamId] ?? defaultNames;

    result[teamId] = createWorkerList(teamId, source);
  }

  return result;
}

export function saveWorkers(workers) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workers));
  } catch (error) {
    console.error("Не удалось сохранить состав смен:", error);
  }
}
