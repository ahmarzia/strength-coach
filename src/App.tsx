"use client";

import { useEffect, useMemo, useState } from "react";
import ExerciseVisual from "./ExerciseVisual";
import { defaultHomeEquipment, equipmentOptions, getExerciseName, getGoalOption, getWorkouts, goalOptions, type EquipmentId, type PlanGoal, type TrainingLocation, type Workout } from "./routine";

type SetEntry = { weight: string; reps: string; done: boolean };
type SessionSets = Record<string, SetEntry[]>;
type SavedSession = {
  id: string;
  dayIndex: number;
  workoutTitle: string;
  startedAt: string;
  finishedAt: string;
  durationSeconds: number;
  sets: SessionSets;
  volume: number;
  completedSets: number;
  planGoal?: PlanGoal;
  daysPerWeek?: number;
  exerciseNames?: Record<string, string>;
  trainingLocation?: TrainingLocation;
  equipment?: EquipmentId[];
};

const HISTORY_KEY = "az-strength-history-v1";
const ACTIVE_KEY = "az-strength-active-v1";
const PLAN_KEY = "az-strength-plan-v1";

const time = (seconds: number) => `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;
const duration = (seconds: number) => `${Math.max(1, Math.round(seconds / 60))} min`;

function loadHistory(): SavedSession[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]"); } catch { return []; }
}

function NavIcon({ icon }: { icon: string }) { return <span aria-hidden="true">{icon}</span>; }

export default function Home() {
  const [view, setView] = useState<"today" | "plan" | "history">("today");
  const [dayIndex, setDayIndex] = useState(0);
  const [history, setHistory] = useState<SavedSession[]>([]);
  const [active, setActive] = useState(false);
  const [current, setCurrent] = useState(0);
  const [sets, setSets] = useState<SessionSets>({});
  const [startedAt, setStartedAt] = useState<Date | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [rest, setRest] = useState(0);
  const [resting, setResting] = useState(false);
  const [guide, setGuide] = useState(false);
  const [confirmEnd, setConfirmEnd] = useState(false);
  const [menu, setMenu] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [planGoal, setPlanGoal] = useState<PlanGoal>("strength");
  const [daysPerWeek, setDaysPerWeek] = useState(3);
  const [showPlanBuilder, setShowPlanBuilder] = useState(false);
  const [draftGoal, setDraftGoal] = useState<PlanGoal>("strength");
  const [draftDays, setDraftDays] = useState(3);
  const [trainingLocation, setTrainingLocation] = useState<TrainingLocation>("home");
  const [equipment, setEquipment] = useState<EquipmentId[]>(defaultHomeEquipment);
  const [draftLocation, setDraftLocation] = useState<TrainingLocation>("home");
  const [draftEquipment, setDraftEquipment] = useState<EquipmentId[]>(defaultHomeEquipment);

  const workouts = useMemo(() => getWorkouts(planGoal, daysPerWeek, { location: trainingLocation, equipment }), [daysPerWeek, equipment, planGoal, trainingLocation]);
  const goal = getGoalOption(planGoal);
  const safeDayIndex = Math.min(dayIndex, workouts.length - 1);
  const workout = workouts[safeDayIndex];
  const exercise = workout.exercises[current];
  const totalSets = useMemo(() => workout.exercises.reduce((sum, item) => sum + item.sets, 0), [workout]);
  const doneSets = useMemo(() => Object.values(sets).flat().filter((item) => item.done).length, [sets]);
  const progress = totalSets ? Math.round((doneSets / totalSets) * 100) : 0;

  useEffect(() => {
    const stored = loadHistory();
    setHistory(stored);
    try {
      const savedPlan = JSON.parse(localStorage.getItem(PLAN_KEY) || "null");
      const draft = JSON.parse(localStorage.getItem(ACTIVE_KEY) || "null");
      const selectedGoal: PlanGoal = draft?.planGoal || savedPlan?.goal || "strength";
      const selectedDays = Math.min(5, Math.max(1, Number(draft?.daysPerWeek || savedPlan?.days || 3)));
      const selectedLocation: TrainingLocation = draft?.trainingLocation || savedPlan?.location || "home";
      const selectedEquipment: EquipmentId[] = Array.isArray(draft?.equipment || savedPlan?.equipment) ? (draft?.equipment || savedPlan?.equipment) : defaultHomeEquipment;
      setPlanGoal(selectedGoal); setDraftGoal(selectedGoal); setDaysPerWeek(selectedDays); setDraftDays(selectedDays);
      setTrainingLocation(selectedLocation); setDraftLocation(selectedLocation); setEquipment(selectedEquipment); setDraftEquipment(selectedEquipment);
      if (!savedPlan?.location && !draft?.trainingLocation) setShowPlanBuilder(true);
      if (draft?.startedAt && draft?.sets) {
        setDayIndex(draft.dayIndex || 0); setSets(draft.sets); setStartedAt(new Date(draft.startedAt));
        setCurrent(draft.current || 0); setActive(true);
      } else if (stored.length && (stored[0].planGoal || "strength") === selectedGoal && (stored[0].daysPerWeek || 3) === selectedDays) {
        setDayIndex((stored[0].dayIndex + 1) % selectedDays);
      }
    } catch { /* Ignore an unreadable local draft. */ }
    setHydrated(true);
  }, []);

  useEffect(() => {
    setDayIndex((index) => Math.min(index, workouts.length - 1));
    setCurrent(0);
  }, [workouts.length]);

  useEffect(() => {
    if (!active || !startedAt) return;
    const update = () => setElapsed(Math.floor((Date.now() - startedAt.getTime()) / 1000));
    update(); const id = window.setInterval(update, 1000); return () => window.clearInterval(id);
  }, [active, startedAt]);

  useEffect(() => {
    if (!resting) return;
    if (rest <= 0) { setResting(false); return; }
    const id = window.setTimeout(() => setRest((value) => value - 1), 1000);
    return () => window.clearTimeout(id);
  }, [rest, resting]);

  useEffect(() => {
    if (!hydrated || !active || !startedAt) return;
    localStorage.setItem(ACTIVE_KEY, JSON.stringify({ dayIndex, sets, startedAt: startedAt.toISOString(), current, planGoal, daysPerWeek, trainingLocation, equipment }));
  }, [active, current, dayIndex, daysPerWeek, equipment, hydrated, planGoal, sets, startedAt, trainingLocation]);

  const previousWeight = (exerciseId: string, setIndex: number) => {
    for (const item of history) if (item.sets[exerciseId]?.[setIndex]?.weight) return item.sets[exerciseId][setIndex].weight;
    return "";
  };

  const blankSets = (target: Workout) => Object.fromEntries(target.exercises.map((item) => [item.id,
    Array.from({ length: item.sets }, (_, index) => ({ weight: previousWeight(item.id, index), reps: "", done: false })),
  ]));

  const start = (index = dayIndex, atExercise = 0) => {
    setDayIndex(index); setCurrent(atExercise); setSets(blankSets(workouts[index])); setStartedAt(new Date());
    setElapsed(0); setRest(0); setResting(false); setGuide(atExercise > 0); setActive(true);
  };

  const editSet = (index: number, field: "weight" | "reps", value: string) => setSets((old) => ({ ...old,
    [exercise.id]: old[exercise.id].map((item, i) => i === index ? { ...item, [field]: value } : item),
  }));

  const completeSet = (index: number) => {
    const markingDone = !sets[exercise.id][index].done;
    setSets((old) => ({ ...old, [exercise.id]: old[exercise.id].map((item, i) => i === index ? { ...item, done: markingDone } : item) }));
    if (markingDone) { setRest(exercise.rest); setResting(true); }
  };

  const saveWorkout = () => {
    if (!startedAt) return;
    const completed = Object.values(sets).flat().filter((item) => item.done);
    const volume = completed.reduce((sum, item) => sum + (Number(item.weight) || 0) * (Number(item.reps) || 0), 0);
    const saved: SavedSession = { id: String(Date.now()), dayIndex, workoutTitle: workout.title,
      startedAt: startedAt.toISOString(), finishedAt: new Date().toISOString(), durationSeconds: elapsed,
      sets, volume, completedSets: completed.length, planGoal, daysPerWeek, trainingLocation, equipment,
      exerciseNames: Object.fromEntries(workout.exercises.map((item) => [item.id, item.name])) };
    const next = [saved, ...history];
    setHistory(next); localStorage.setItem(HISTORY_KEY, JSON.stringify(next)); localStorage.removeItem(ACTIVE_KEY);
    setActive(false); setConfirmEnd(false); setView("history");
  };

  const discard = () => { localStorage.removeItem(ACTIVE_KEY); setActive(false); setConfirmEnd(false); setSets({}); };

  const exportCsv = () => {
    const rows = [["Date", "Goal", "Days/week", "Workout", "Exercise", "Set", "Weight lb", "Reps", "Completed"]];
    history.forEach((session) => Object.entries(session.sets).forEach(([exerciseId, entries]) => entries.forEach((entry, index) => rows.push([
      new Date(session.finishedAt).toLocaleDateString(), getGoalOption(session.planGoal || "strength").name, String(session.daysPerWeek || 3), session.workoutTitle,
      session.exerciseNames?.[exerciseId] || getExerciseName(exerciseId), String(index + 1), entry.weight, entry.reps, entry.done ? "Yes" : "No",
    ]))));
    const csv = rows.map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const link = document.createElement("a"); link.href = url; link.download = "az-strength-history.csv"; link.click(); URL.revokeObjectURL(url);
  };

  const openPlanBuilder = () => {
    setDraftGoal(planGoal); setDraftDays(daysPerWeek); setDraftLocation(trainingLocation); setDraftEquipment(equipment); setShowPlanBuilder(true); setMenu(false);
  };

  const applyPlan = () => {
    if (draftLocation === "home" && !draftEquipment.some((item) => item === "dumbbells" || item === "kettlebells")) return;
    setPlanGoal(draftGoal); setDaysPerWeek(draftDays); setDayIndex(0); setCurrent(0);
    setTrainingLocation(draftLocation); setEquipment(draftLocation === "gym" ? [] : draftEquipment);
    localStorage.setItem(PLAN_KEY, JSON.stringify({ goal: draftGoal, days: draftDays, location: draftLocation, equipment: draftLocation === "gym" ? [] : draftEquipment }));
    setShowPlanBuilder(false); setView("today");
  };

  const toggleDraftEquipment = (id: EquipmentId) => setDraftEquipment((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  const draftHasWeights = draftLocation === "gym" || draftEquipment.some((item) => item === "dumbbells" || item === "kettlebells");
  const setupLabel = trainingLocation === "gym" ? "Gym equipment" : equipment.map((id) => equipmentOptions.find((item) => item.id === id)?.name).filter(Boolean).join(" + ");

  if (active && exercise && sets[exercise.id]) {
    const currentSets = sets[exercise.id];
    const allCurrentDone = currentSets.every((item) => item.done);
    return <main className="session-shell" style={{ "--accent": workout.accent } as React.CSSProperties}>
      <header className="session-header">
        <button className="round-button" onClick={() => setConfirmEnd(true)} aria-label="Close workout">×</button>
        <div><span>DAY {workout.day} · {time(elapsed)}</span><strong>{workout.title}</strong></div>
        <span className="progress-badge">{progress}%</span>
      </header>
      <div className="progress-line"><span style={{ width: `${progress}%` }} /></div>
      <section className="session-content">
        <div className="exercise-count"><span>{current + 1} OF {workout.exercises.length}</span><b>{exercise.pair}</b></div>
        <div className="session-name"><div><p>{exercise.focus}</p><h1>{exercise.name}</h1></div><button onClick={() => setGuide(!guide)}>{guide ? "Hide guide" : "Form guide"}</button></div>
        <ExerciseVisual exerciseId={exercise.id} kind={exercise.visual} />
        <div className={`form-guide ${guide ? "open" : ""}`}>
          <div><span className="eyebrow">HOW TO MOVE</span><ol>{exercise.steps.map((step) => <li key={step}>{step}</li>)}</ol></div>
          <div className="cue-panel"><span className="eyebrow">QUICK CUES</span><div className="cue-list">{exercise.cues.map((cue) => <span key={cue}>{cue}</span>)}</div><p><strong>Avoid:</strong> {exercise.avoid}</p></div>
        </div>
        <div className="set-title"><div><span>WORKING SETS</span><strong>{exercise.sets} × {exercise.reps}</strong></div><small>{exercise.equipment}</small></div>
        <div className="set-table">
          <div className="set-head"><span>SET</span><span>WEIGHT (LB)</span><span>REPS</span><span>DONE</span></div>
          {currentSets.map((entry, index) => <div className={`set-row ${entry.done ? "complete" : ""}`} key={index}>
            <strong>{index + 1}</strong>
            <input aria-label={`Set ${index + 1} weight`} inputMode="decimal" value={entry.weight} placeholder="—" onChange={(e) => editSet(index, "weight", e.target.value.replace(/[^0-9.]/g, ""))} />
            <input aria-label={`Set ${index + 1} repetitions`} inputMode="numeric" value={entry.reps} placeholder="—" onChange={(e) => editSet(index, "reps", e.target.value.replace(/[^0-9]/g, ""))} />
            <button aria-label={`${entry.done ? "Undo" : "Complete"} set ${index + 1}`} onClick={() => completeSet(index)}>{entry.done ? "✓" : ""}</button>
          </div>)}
        </div>
        <div className="session-nav">
          <button className="button secondary" disabled={current === 0} onClick={() => { setCurrent(current - 1); setGuide(false); }}>Previous</button>
          {current < workout.exercises.length - 1
            ? <button className="button primary" onClick={() => { setCurrent(current + 1); setGuide(false); }}>{allCurrentDone ? "Next exercise" : "Skip for now"} <span>→</span></button>
            : <button className="button primary" onClick={() => setConfirmEnd(true)}>Finish workout <span>✓</span></button>}
        </div>
      </section>
      {resting && <aside className="rest-dock" aria-live="polite">
        <div className="rest-ring" style={{ "--timer": `${(rest / exercise.rest) * 360}deg` } as React.CSSProperties}><div><strong>{time(rest)}</strong><span>REST</span></div></div>
        <div><span className="eyebrow">RECOVER</span><strong>Next set when ready</strong><small>Relax your grip. Take two slow breaths.</small></div>
        <button onClick={() => setRest(rest + 15)}>+15 sec</button><button onClick={() => { setRest(0); setResting(false); }}>Skip</button>
      </aside>}
      {confirmEnd && <div className="modal-backdrop"><div className="confirm-card" role="dialog" aria-modal="true" aria-labelledby="finish-title">
        <span className="confirm-icon">✓</span><h2 id="finish-title">Finish this workout?</h2><p>You completed {doneSets} of {totalSets} sets in {duration(elapsed)}.</p>
        <button className="button primary" onClick={saveWorkout}>Save workout</button><button className="button secondary" onClick={() => setConfirmEnd(false)}>Keep training</button><button className="text-danger" onClick={discard}>Discard workout</button>
      </div></div>}
    </main>;
  }

  const totalVolume = history.reduce((sum, item) => sum + item.volume, 0);
  const completedSetCount = history.reduce((sum, item) => sum + item.completedSets, 0);
  const chartMax = Math.max(...history.slice(0, 6).map((item) => item.volume), 1);

  return <main className="app-shell">
    <aside className={`sidebar ${menu ? "open" : ""}`}>
      <div className="brand"><span>AZ</span><strong>Strength<br />Coach</strong></div>
      <nav>
        <button className={view === "today" ? "active" : ""} onClick={() => { setView("today"); setMenu(false); }}><NavIcon icon="⌁" />Today</button>
        <button className={view === "plan" ? "active" : ""} onClick={() => { setView("plan"); setMenu(false); }}><NavIcon icon="▦" />My plan</button>
        <button className={view === "history" ? "active" : ""} onClick={() => { setView("history"); setMenu(false); }}><NavIcon icon="↗" />History</button>
      </nav>
      <div className="sidebar-note"><span>{daysPerWeek} DAY PLAN · {goal.name.toUpperCase()}</span><strong>{goal.tagline}</strong><small>{trainingLocation === "gym" ? "Gym plan" : "Home plan"} · Saved on this device.</small></div>
    </aside>
    <section className="dashboard">
      <header className="topbar">
        <button className="menu-button" onClick={() => setMenu(!menu)} aria-label="Open menu">☰</button>
        <div><span>{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</span><strong>{view === "today" ? goal.tagline : view === "plan" ? `Your ${daysPerWeek}-day ${goal.shortName.toLowerCase()} plan` : "Training history"}</strong></div>
        <button className="profile" onClick={openPlanBuilder} aria-label="Change personal plan"><span>AZ</span><div><strong>Personal plan</strong><small>{trainingLocation === "gym" ? "Gym" : "Home"} · {goal.name} · {daysPerWeek} {daysPerWeek === 1 ? "day" : "days"}</small></div></button>
      </header>

      {view === "today" && <div className="page-content">
        <section className="workout-hero" style={{ "--accent": workout.accent } as React.CSSProperties}>
          <div className="hero-copy"><div className="hero-tags"><span>UP NEXT</span><span>≈ {workout.minutes} MIN</span></div><p>DAY {workout.day} · {workout.label.toUpperCase()}</p><h1>{workout.title}</h1><p className="hero-desc">{workout.description}</p>
            <div className="hero-stats"><div><strong>{workout.exercises.length}</strong><span>Exercises</span></div><div><strong>{totalSets}</strong><span>Working sets</span></div><div><strong>{goal.rir}</strong><span>Reps in reserve</span></div></div>
            <button className="hero-button" onClick={() => start()}>Start workout <span>→</span></button>
          </div>
          <div className="hero-visual"><div className="hero-orbit"><strong>{String(daysPerWeek).padStart(2, "0")}</strong><small>DAYS<br />PER WEEK</small></div><ExerciseVisual exerciseId={workout.exercises[0].id} kind={workout.exercises[0].visual} /></div>
        </section>
        <div className="section-heading"><div><span>TODAY&apos;S FLOW</span><h2>{workout.exercises.length} focused movements</h2></div><button onClick={() => setView("plan")}>View full plan →</button></div>
        <section className="preview-grid">{workout.exercises.map((item, index) => <article key={item.id}>
          <div className="preview-meta"><span>{item.pair}</span><small>{item.focus}</small></div><ExerciseVisual exerciseId={item.id} kind={item.visual} compact /><h3>{item.name}</h3><p>{item.sets} sets × {item.reps} reps</p><button onClick={() => start(dayIndex, index)}>View guide <span>↗</span></button>
        </article>)}</section>
      </div>}

      {view === "plan" && <div className="page-content plan-page">
        <div className="plan-summary"><div><span>{goal.icon}</span><div><small>YOUR CURRENT PLAN · {trainingLocation.toUpperCase()}</small><strong>{goal.name} · {daysPerWeek} {daysPerWeek === 1 ? "day" : "days"} per week</strong><small className="setup-label">{setupLabel}</small></div></div><button className="button secondary" onClick={openPlanBuilder}>Change plan</button></div>
        <div className="intro-row"><div><span className="eyebrow">{goal.name.toUpperCase()} PLAN</span><h1>{goal.tagline}</h1><p>{goal.scheduleNote}</p></div><div className="plan-rule"><strong>Progress rule</strong><p>{goal.progressRule}</p></div></div>
        <div className="day-tabs">{workouts.map((item, index) => <button key={item.day} className={dayIndex === index ? "active" : ""} onClick={() => setDayIndex(index)}><span>DAY {item.day}</span><strong>{item.title}</strong></button>)}</div>
        <section className="plan-workout" style={{ "--accent": workout.accent } as React.CSSProperties}>
          <div className="plan-head"><div><span>DAY {workout.day} · {workout.label}</span><h2>{workout.title}</h2><p>{workout.description}</p></div><button className="button primary" onClick={() => start()}>Start day {workout.day} →</button></div>
          <div className="plan-exercises">{workout.exercises.map((item) => <details key={item.id}>
            <summary><span className="pair-badge">{item.pair}</span><div><strong>{item.name}</strong><small>{item.focus}</small></div><div className="prescription"><strong>{item.sets} × {item.reps}</strong><small>{item.rest}s rest</small></div><span className="expand">＋</span></summary>
            <div className="details-body"><ExerciseVisual exerciseId={item.id} kind={item.visual} /><div><span className="eyebrow">STEP BY STEP</span><ol>{item.steps.map((step) => <li key={step}>{step}</li>)}</ol><div className="cue-list">{item.cues.map((cue) => <span key={cue}>{cue}</span>)}</div><p className="avoid"><strong>Avoid:</strong> {item.avoid}</p></div></div>
          </details>)}</div>
        </section>
      </div>}

      {view === "history" && <div className="page-content history-page">
        <div className="history-heading"><div><span className="eyebrow">YOUR PROGRESS</span><h1>Consistency compounds.</h1><p>Every completed set is stored on this device and included in your totals.</p></div>{history.length > 0 && <button className="button secondary" onClick={exportCsv}>Export CSV ↓</button>}</div>
        <section className="stat-grid"><article><span>Total workouts</span><strong>{history.length}</strong><small>{history.length ? "Keep the chain moving" : "Your first workout starts here"}</small></article><article><span>Working sets</span><strong>{completedSetCount}</strong><small>Completed sets only</small></article><article><span>Training volume</span><strong>{totalVolume.toLocaleString()}</strong><small>lb lifted across logged reps</small></article></section>
        {history.length ? <><section className="volume-card"><div><span className="eyebrow">LAST SIX SESSIONS</span><h2>Volume trend</h2></div><div className="bar-chart">{history.slice(0, 6).reverse().map((item) => <div className="bar-column" key={item.id}><span style={{ height: `${Math.max(8, item.volume / chartMax * 100)}%` }} /><small>D{item.dayIndex + 1}</small></div>)}</div></section>
          <section className="history-list"><div className="section-heading"><div><span>SESSION LOG</span><h2>Recent workouts</h2></div></div>{history.map((item) => <article key={item.id}><div className="history-date"><strong>{new Date(item.finishedAt).getDate()}</strong><span>{new Date(item.finishedAt).toLocaleDateString("en-US", { month: "short" }).toUpperCase()}</span></div><div><span>{getGoalOption(item.planGoal || "strength").shortName.toUpperCase()} · DAY {item.dayIndex + 1}</span><strong>{item.workoutTitle}</strong></div><div><small>TIME</small><strong>{duration(item.durationSeconds)}</strong></div><div><small>SETS</small><strong>{item.completedSets}</strong></div><div><small>VOLUME</small><strong>{item.volume.toLocaleString()} lb</strong></div></article>)}</section>
        </> : <section className="empty-history"><span>↗</span><h2>Your first data point is waiting.</h2><p>Finish a workout and your time, sets and training volume will appear here.</p><button className="button primary" onClick={() => setView("today")}>Choose today&apos;s workout →</button></section>}
      </div>}
    </section>
    <nav className="mobile-nav"><button className={view === "today" ? "active" : ""} onClick={() => setView("today")}><NavIcon icon="⌁" />Today</button><button className={view === "plan" ? "active" : ""} onClick={() => setView("plan")}><NavIcon icon="▦" />Plan</button><button className={view === "history" ? "active" : ""} onClick={() => setView("history")}><NavIcon icon="↗" />History</button></nav>
    {showPlanBuilder && <div className="modal-backdrop"><section className="plan-builder" role="dialog" aria-modal="true" aria-labelledby="plan-builder-title">
      <div className="builder-head"><div><span className="eyebrow">PERSONALIZE YOUR WEEK</span><h2 id="plan-builder-title">Build your plan</h2><p>Tell us where you train and what equipment is actually available.</p></div><button className="round-button" onClick={() => setShowPlanBuilder(false)} aria-label="Close plan selector">×</button></div>
      <div className="builder-section"><strong>1. Where do you train?</strong><div className="location-options">
        <button className={draftLocation === "home" ? "active" : ""} onClick={() => setDraftLocation("home")}><span>⌂</span><div><strong>At home</strong><small>Build around the equipment you own.</small></div><i aria-hidden="true">✓</i></button>
        <button className={draftLocation === "gym" ? "active" : ""} onClick={() => setDraftLocation("gym")}><span>▦</span><div><strong>At a gym</strong><small>Assume a complete strength-training setup.</small></div><i aria-hidden="true">✓</i></button>
      </div></div>
      {draftLocation === "home" && <div className="builder-section"><strong>2. What equipment do you have?</strong><div className="equipment-options">{equipmentOptions.map((option) => <button key={option.id} className={draftEquipment.includes(option.id) ? "active" : ""} onClick={() => toggleDraftEquipment(option.id)}><span>{option.icon}</span><div><strong>{option.name}</strong><small>{option.note}</small></div><i aria-hidden="true">✓</i></button>)}</div>{!draftHasWeights && <p className="builder-warning">Choose dumbbells or kettlebells so we can build a complete strength plan.</p>}</div>}
      <div className="builder-section"><strong>{draftLocation === "home" ? "3" : "2"}. What is your main goal?</strong><div className="goal-options">{goalOptions.map((option) => <button key={option.id} className={draftGoal === option.id ? "active" : ""} onClick={() => setDraftGoal(option.id)}><span>{option.icon}</span><div><strong>{option.name}</strong><small>{option.description}</small></div><i aria-hidden="true">✓</i></button>)}</div></div>
      <div className="builder-section"><strong>{draftLocation === "home" ? "4" : "3"}. How many days can you train?</strong><div className="frequency-options">{[1, 2, 3, 4, 5].map((days) => <button key={days} className={draftDays === days ? "active" : ""} onClick={() => setDraftDays(days)}><strong>{days}</strong><small>{days === 1 ? "day" : "days"}</small></button>)}</div></div>
      <div className="builder-preview"><div><span>{getGoalOption(draftGoal).icon}</span><div><small>{draftLocation.toUpperCase()} · YOUR NEW PLAN</small><strong>{getGoalOption(draftGoal).name} · {draftDays} {draftDays === 1 ? "day" : "days"} / week</strong></div></div><p>{draftHasWeights ? getWorkouts(draftGoal, draftDays, { location: draftLocation, equipment: draftEquipment }).map((item) => item.title).join(" · ") : "Select your main weights to preview the plan."}</p></div>
      <div className="builder-actions"><button className="button secondary" onClick={() => setShowPlanBuilder(false)}>Cancel</button><button className="button primary" disabled={!draftHasWeights} onClick={applyPlan}>Use this plan →</button></div>
    </section></div>}
  </main>;
}
