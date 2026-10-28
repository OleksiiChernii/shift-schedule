import { useState } from "react";
import { SHIFTS } from "../utils/shiftUtils";
import { DAY_PERSONNEL } from "../utils/workerStorage";

export default function ShiftTeams({ workers, onAdd, onMove }) {
  const [newName, setNewName] = useState("");

  const teams = [
    ...SHIFTS.map((shift) => ({
      id: shift.id,
      name: shift.name,
    })),
    { id: DAY_PERSONNEL, name: "Дневной персонал" },
  ];

  function addWorker(event) {
    event.preventDefault();

    const name = newName.trim();
    if (!name) return;

    onAdd(DAY_PERSONNEL, name);
    setNewName("");
  }

  function handleTeamChange(fromTeam, workerId, toTeam) {
    if (!toTeam || fromTeam === toTeam) return;

    onMove(fromTeam, toTeam, workerId);
  }

  return (
    <section className="details-card teams-page">
      <div className="eyebrow">УПРАВЛЕНИЕ ПЕРСОНАЛОМ</div>
      <h1>Состав смен</h1>
      <p className="subtitle">
        Добавляй работников в дневной персонал и распределяй их по сменам с
        помощью списка возле фамилии.
      </p>

      <div className="teams-list">
        {teams.map((team) => {
          const teamWorkers = workers[team.id] || [];
          const isDayPersonnel = team.id === DAY_PERSONNEL;

          return (
            <article className="team-card" key={team.id}>
              <div className="team-card-heading">
                <span className="team-letter">
                  {isDayPersonnel ? "ДП" : team.id}
                </span>

                <h2>{team.name}</h2>

                <span className="team-count">{teamWorkers.length} чел.</span>
              </div>

              {teamWorkers.length > 0 ? (
                <ul className="editable-worker-list">
                  {teamWorkers.map((worker) => (
                    <li className="worker-item" key={worker.id}>
                      <span className="worker-name">{worker.name}</span>

                      <select
                        className="move-select"
                        value={team.id}
                        onChange={(event) =>
                          handleTeamChange(
                            team.id,
                            worker.id,
                            event.target.value,
                          )
                        }
                        aria-label={`Перевести ${worker.name}`}
                      >
                        {teams.map((target) => (
                          <option key={target.id} value={target.id}>
                            {target.name}
                          </option>
                        ))}
                      </select>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-workers">Список пока пуст.</p>
              )}

              {isDayPersonnel && (
                <form className="add-worker-form" onSubmit={addWorker}>
                  <input
                    value={newName}
                    onChange={(event) => setNewName(event.target.value)}
                    placeholder="Фамилия и имя работника"
                    aria-label="Имя нового работника"
                  />

                  <button type="submit">Добавить</button>
                </form>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
