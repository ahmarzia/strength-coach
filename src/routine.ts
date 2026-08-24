export type Exercise = {
  id: string;
  name: string;
  pair: string;
  sets: number;
  reps: string;
  rest: number;
  focus: string;
  equipment: string;
  visual: string;
  steps: string[];
  cues: string[];
  avoid: string;
};

export type Workout = {
  day: number;
  title: string;
  label: string;
  description: string;
  accent: string;
  minutes: number;
  exercises: Exercise[];
};

export type PlanGoal = "strength" | "muscle" | "fat-loss";
export type TrainingLocation = "home" | "gym";
export type EquipmentId = "dumbbells" | "kettlebells" | "bench" | "ez-bar";
export type PlanProfile = { location: TrainingLocation; equipment: EquipmentId[] };

export const equipmentOptions: { id: EquipmentId; name: string; icon: string; note: string }[] = [
  { id: "dumbbells", name: "Dumbbells", icon: "DB", note: "Fixed or adjustable" },
  { id: "kettlebells", name: "Kettlebells", icon: "KB", note: "One or more sizes" },
  { id: "bench", name: "Workout bench", icon: "▰", note: "Flat or adjustable" },
  { id: "ez-bar", name: "EZ bar", icon: "⌁", note: "Bar with plates" },
];

export const defaultHomeEquipment: EquipmentId[] = ["dumbbells", "bench", "ez-bar"];

export type GoalOption = {
  id: PlanGoal;
  name: string;
  shortName: string;
  icon: string;
  tagline: string;
  description: string;
  rir: string;
  scheduleNote: string;
  progressRule: string;
};

export const goalOptions: GoalOption[] = [
  {
    id: "strength",
    name: "Strength",
    shortName: "Strength",
    icon: "↗",
    tagline: "Lift heavier. Build confidence.",
    description: "Lower-rep compound lifts, full recovery and steady load progression.",
    rir: "1–2",
    scheduleNote: "Keep at least one recovery day after two hard sessions in a row.",
    progressRule: "When every set reaches the top of its rep range with clean form, add 2.5–5 lb per dumbbell.",
  },
  {
    id: "muscle",
    name: "Muscle Building",
    shortName: "Build muscle",
    icon: "＋",
    tagline: "More quality reps. More muscle.",
    description: "Balanced training volume with moderate reps and focused upper/lower work.",
    rir: "1–3",
    scheduleNote: "Spread sessions across the week and avoid training the same muscles hard on back-to-back days.",
    progressRule: "Add reps until you reach the top of the range, then add the smallest available weight and repeat.",
  },
  {
    id: "fat-loss",
    name: "Fat Loss",
    shortName: "Fat loss",
    icon: "⌁",
    tagline: "Move more. Keep your strength.",
    description: "Fast full-body strength circuits with short rests and a steady training pace.",
    rir: "2–3",
    scheduleNote: "Pair this plan with regular walking and nutrition that supports a sustainable calorie deficit.",
    progressRule: "First complete every round with good form; then add reps or a small amount of weight without rushing.",
  },
];

const ex = (
  id: string,
  name: string,
  pair: string,
  sets: number,
  reps: string,
  rest: number,
  focus: string,
  equipment: string,
  visual: string,
  steps: string[],
  cues: string[],
  avoid: string,
): Exercise => ({ id, name, pair, sets, reps, rest, focus, equipment, visual, steps, cues, avoid });

export const workouts: Workout[] = [
  {
    day: 1,
    title: "Squat + Bench",
    label: "Foundation",
    description: "Heavy fundamentals for quads, chest, back and hamstrings.",
    accent: "#dfff62",
    minutes: 32,
    exercises: [
      ex("goblet-squat", "Goblet Squat", "A1", 3, "6–8", 75, "Quads · Glutes · Core", "1 adjustable dumbbell", "squat",
        ["Hold one dumbbell vertically against your chest.", "Brace, then sit down between your legs with your whole foot planted.", "Push the floor away and squeeze your glutes to stand."],
        ["Chest tall", "Knees follow toes", "Whole foot down"], "Heels lifting or knees collapsing inward."),
      ex("flat-bench", "Dumbbell Bench Press", "A2", 3, "6–8", 75, "Chest · Triceps · Front delts", "2 dumbbells + bench", "bench",
        ["Plant your feet and pull your shoulder blades down and back.", "Lower the dumbbells beside your chest with elbows 30–45° from your body.", "Press up over your shoulders without banging the weights together."],
        ["Feet planted", "Wrists stacked", "Shoulders packed"], "Flaring your elbows straight out or lifting your shoulders."),
      ex("one-arm-row", "One-arm Dumbbell Row", "B1", 3, "8–10 / side", 60, "Lats · Upper back · Biceps", "1 dumbbell + bench", "one-row",
        ["Support one hand and knee on the bench and keep your back flat.", "Pull your elbow toward your back pocket without rotating your torso.", "Lower until the arm is long and the shoulder stays controlled."],
        ["Back flat", "Elbow to hip", "Long reach down"], "Twisting your body or shrugging toward your ear."),
      ex("romanian-deadlift", "Dumbbell Romanian Deadlift", "B2", 3, "8–10", 60, "Hamstrings · Glutes · Back", "2 adjustable dumbbells", "hinge",
        ["Soften your knees and hold the weights close to your thighs.", "Push your hips back until you feel a strong hamstring stretch.", "Drive your hips forward and finish tall with ribs down."],
        ["Hips travel back", "Weights skim legs", "Spine stays long"], "Turning the movement into a squat or rounding your back."),
      ex("lateral-raise", "Dumbbell Lateral Raise", "C1", 2, "12–15", 45, "Side delts", "2 light dumbbells", "lateral",
        ["Stand tall with light dumbbells and soft elbows.", "Lift your arms out and slightly forward to shoulder height.", "Lower slowly until the weights return beside your body."],
        ["Lead with elbows", "Stay tall", "Control the lowering"], "Swinging, shrugging or lifting above shoulder level."),
      ex("rear-delt-raise", "Bent-over Rear-delt Raise", "C2", 2, "15–20", 45, "Rear delts · Upper back", "2 light dumbbells", "rear-raise",
        ["Hinge forward with a braced, flat back.", "Open both arms wide while keeping a soft bend in your elbows.", "Pause behind your shoulders, then lower under control."],
        ["Hinge and hold", "Arms travel wide", "Use light weight"], "Rowing the weights toward your ribs."),
    ],
  },
  {
    day: 2,
    title: "Legs + Shoulders",
    label: "Balance",
    description: "Single-leg strength with overhead work and focused arms.",
    accent: "#aa9cff",
    minutes: 33,
    exercises: [
      ex("split-squat", "Bulgarian Split Squat", "A1", 3, "8 / leg", 75, "Quads · Glutes · Balance", "Dumbbells + bench", "split",
        ["Stand about two feet in front of the bench and rest your rear foot on it.", "Drop the rear knee toward the floor while keeping the front foot planted.", "Push through the front foot to stand without bouncing."],
        ["Weight on front leg", "Knee follows toes", "Drop straight down"], "Standing too close to the bench or pushing off the rear foot."),
      ex("overhead-press", "Seated Dumbbell Press", "A2", 3, "6–8", 75, "Shoulders · Triceps", "2 dumbbells + bench", "overhead",
        ["Sit tall with feet planted and dumbbells at shoulder level.", "Brace your stomach and press the weights above your shoulders.", "Lower with wrists stacked over elbows."],
        ["Ribs down", "Forearms vertical", "Finish overhead"], "Leaning back or excessively arching your lower back."),
      ex("hip-thrust", "Dumbbell Hip Thrust", "B1", 3, "8–12", 60, "Glutes · Hamstrings", "1 dumbbell + bench", "hip-thrust",
        ["Rest your upper back on the bench and pad the dumbbell across your hips.", "Drive through your heels until your torso is nearly parallel to the floor.", "Squeeze your glutes, then lower your hips under control."],
        ["Chin tucked", "Ribs down", "Finish with glutes"], "Overextending your lower back at the top."),
      ex("ez-row", "EZ-bar Bent-over Row", "B2", 3, "6–10", 60, "Upper back · Lats · Biceps", "EZ bar + plates", "bar-row",
        ["Hinge forward with a braced stomach and long spine.", "Pull the bar toward your lower ribs while your torso stays still.", "Lower the bar until your arms are straight."],
        ["Torso still", "Bar to lower ribs", "Elbows behind you"], "Jerking the weight or standing up during each repetition."),
      ex("ez-curl", "EZ-bar Curl", "C1", 2, "8–12", 45, "Biceps · Forearms", "EZ bar + plates", "curl",
        ["Stand tall with the bar against your thighs.", "Keep elbows beside your ribs and curl toward your upper chest.", "Lower completely without losing control."],
        ["Elbows pinned", "Wrists neutral", "Full lowering"], "Swinging your torso or throwing your elbows forward."),
      ex("triceps-extension", "Lying Triceps Extension", "C2", 2, "8–12", 45, "Triceps", "2 dumbbells + bench", "skull",
        ["Lie on the bench with dumbbells above your shoulders.", "Keep upper arms still and lower the weights beside your head.", "Straighten your elbows using your triceps."],
        ["Upper arms still", "Soft wrists", "Control the bottom"], "Flaring your elbows or turning it into a press."),
    ],
  },
  {
    day: 3,
    title: "Deadlift + Upper",
    label: "Power",
    description: "Posterior-chain strength with chest, back and arm volume.",
    accent: "#ff9b74",
    minutes: 32,
    exercises: [
      ex("sumo-deadlift", "Dumbbell Sumo Deadlift", "A1", 3, "6–8", 75, "Glutes · Quads · Hamstrings", "1–2 heavy dumbbells", "sumo",
        ["Take a wide stance with toes turned slightly outward.", "Brace, bend your hips and knees, and keep the weight between your legs.", "Push the floor away and stand tall without leaning back."],
        ["Knees follow toes", "Chest stays proud", "Push the floor"], "Rounding your back or pulling only with your arms."),
      ex("neutral-bench", "Neutral-grip Bench Press", "A2", 3, "6–10", 75, "Chest · Triceps", "2 dumbbells + bench", "bench-neutral",
        ["Lie back with palms facing each other and shoulders packed.", "Lower the dumbbells beside your ribs with elbows close to your body.", "Press up until the weights are above your shoulders."],
        ["Palms face in", "Elbows close", "Feet planted"], "Letting the weights drift toward your face."),
      ex("reverse-lunge", "Dumbbell Reverse Lunge", "B1", 3, "8 / leg", 60, "Quads · Glutes · Balance", "2 adjustable dumbbells", "lunge",
        ["Stand tall and take a controlled step backward.", "Lower your rear knee while the entire front foot remains planted.", "Push through the front foot to return to standing."],
        ["Front foot planted", "Step back quietly", "Drive through front leg"], "Using a very short step or pushing mainly from the back foot."),
      ex("two-db-row", "Two-dumbbell Row", "B2", 3, "8–12", 60, "Lats · Upper back · Biceps", "2 adjustable dumbbells", "double-row",
        ["Hinge forward and hold a stable, flat-back position.", "Pull both elbows toward your hips without raising your torso.", "Pause briefly and lower until both arms are long."],
        ["Hinge and hold", "Elbows to hips", "Reach fully down"], "Shrugging or bouncing your torso to move the weight."),
      ex("hammer-curl", "Dumbbell Hammer Curl", "C1", 2, "10–12", 45, "Biceps · Forearms", "2 adjustable dumbbells", "hammer",
        ["Stand tall with palms facing your thighs.", "Curl both weights while keeping your wrists in the same position.", "Lower until your arms are straight."],
        ["Palms face in", "Elbows pinned", "No body swing"], "Leaning backward or shortening the lowering phase."),
      ex("skull-crusher", "Dumbbell Skull Crusher", "C2", 2, "8–15", 45, "Triceps", "2 dumbbells + bench", "skull",
        ["Hold the dumbbells above your shoulders with palms facing each other.", "Bend at the elbows and lower toward the sides of your forehead.", "Straighten your arms without moving your upper arms."],
        ["Elbows point up", "Upper arms quiet", "Slow lowering"], "Using excessive weight or lowering toward your chest."),
    ],
  },
];

const equipmentExercises: Exercise[] = [
  ex("kb-goblet-squat", "Kettlebell Goblet Squat", "A1", 3, "6–10", 60, "Quads · Glutes · Core", "1 kettlebell", "squat",
    ["Hold the kettlebell by its horns close to your chest.", "Brace and sit down between your legs while keeping your whole foot planted.", "Drive through the floor and stand tall without leaning back."],
    ["Bell close", "Knees follow toes", "Chest tall"], "Letting the bell pull your chest forward or your heels lift."),
  ex("kb-deadlift", "Kettlebell Deadlift", "A1", 3, "6–10", 60, "Hamstrings · Glutes · Back", "1–2 kettlebells", "hinge",
    ["Stand over the bell with its handle between your feet.", "Push your hips back, brace, and grip the handle with a long spine.", "Push the floor away and finish tall, then hinge to return the bell softly."],
    ["Hips travel back", "Bell stays close", "Stand tall"], "Squatting too low or rounding your back to reach the bell."),
  ex("kb-swing", "Two-hand Kettlebell Swing", "A1", 3, "10–15", 45, "Glutes · Hamstrings · Conditioning", "1 kettlebell", "hinge",
    ["Place the bell slightly ahead of you and hike it back between your thighs.", "Snap your hips forward while your arms stay relaxed.", "Let the bell float to chest height, then guide it into the next hinge."],
    ["Hike then snap", "Arms stay loose", "Bell floats"], "Turning the swing into a front raise or bending deeply at the knees."),
  ex("kb-floor-press", "Single-arm Kettlebell Floor Press", "A1", 3, "6–10 / side", 60, "Chest · Triceps · Core", "1 kettlebell + floor space", "bench-neutral",
    ["Lie on the floor with the bell safely racked at one shoulder and that knee bent.", "Press the bell over your shoulder while keeping your wrist stacked.", "Lower until your upper arm gently meets the floor, then repeat."],
    ["Wrist stacked", "Shoulder packed", "Ribs down"], "Letting the bell pull your wrist backward or bouncing your elbow off the floor."),
  ex("kb-one-arm-row", "Single-arm Kettlebell Row", "A1", 3, "8–12 / side", 60, "Lats · Upper back · Biceps", "1 kettlebell", "one-row",
    ["Take a staggered stance and hinge with a long, braced spine.", "Pull the bell toward your hip without rotating your shoulders.", "Lower until your arm is long while keeping the hinge position."],
    ["Elbow to hip", "Torso stays square", "Long reach"], "Shrugging the bell upward or twisting to finish the rep."),
  ex("kb-strict-press", "Single-arm Kettlebell Press", "A1", 3, "6–10 / side", 60, "Shoulders · Triceps · Core", "1 kettlebell", "overhead",
    ["Stand tall with the bell in the rack position and your wrist straight.", "Brace your glutes and stomach, then press the bell overhead.", "Finish with your arm beside your ear and lower smoothly to the rack."],
    ["Wrist straight", "Ribs down", "Finish overhead"], "Leaning sideways or using your legs to start a strict press."),
  ex("kb-reverse-lunge", "Kettlebell Reverse Lunge", "A1", 3, "8 / leg", 60, "Quads · Glutes · Balance", "1 kettlebell", "lunge",
    ["Hold the bell at your chest and stand tall.", "Step one foot back and lower the rear knee under control.", "Drive through the entire front foot to return to standing."],
    ["Bell close", "Front foot planted", "Step back quietly"], "Taking too short a step or pushing mainly from the rear foot."),
  ex("kb-halo", "Kettlebell Halo", "A1", 2, "8–10 / direction", 45, "Shoulders · Upper back · Core", "1 light kettlebell", "lateral",
    ["Hold the bell by its horns upside down in front of your chest.", "Circle it slowly around your head while keeping your ribs down.", "Return to the front, then repeat in the opposite direction."],
    ["Move slowly", "Bell stays close", "Torso still"], "Using a heavy bell or moving your head and ribs to create space."),
  ex("db-floor-press", "Dumbbell Floor Press", "A1", 3, "8–12", 60, "Chest · Triceps", "2 dumbbells + floor space", "bench",
    ["Sit with the dumbbells on your thighs, then roll back and bring them over your chest.", "Lower until your upper arms gently touch the floor.", "Press the weights over your shoulders while keeping your wrists stacked."],
    ["Elbows 30–45°", "Wrists stacked", "Pause on floor"], "Bouncing your elbows or letting your shoulders roll forward."),
];

type Prescription = [id: string, pair: string, sets: number, reps: string, rest: number];
type WorkoutTemplate = Omit<Workout, "day" | "exercises"> & { exercises: Prescription[] };

const exerciseLibrary = new Map([...workouts.flatMap((workout) => workout.exercises), ...equipmentExercises].map((exercise) => [exercise.id, exercise]));

const requirements: Record<string, EquipmentId[]> = {
  "goblet-squat": ["dumbbells"], "flat-bench": ["dumbbells", "bench"], "one-arm-row": ["dumbbells"],
  "romanian-deadlift": ["dumbbells"], "lateral-raise": ["dumbbells"], "rear-delt-raise": ["dumbbells"],
  "split-squat": ["dumbbells", "bench"], "overhead-press": ["dumbbells", "bench"], "hip-thrust": ["dumbbells", "bench"],
  "ez-row": ["ez-bar"], "ez-curl": ["ez-bar"], "triceps-extension": ["dumbbells", "bench"],
  "sumo-deadlift": ["dumbbells"], "neutral-bench": ["dumbbells", "bench"], "reverse-lunge": ["dumbbells"],
  "two-db-row": ["dumbbells"], "hammer-curl": ["dumbbells"], "skull-crusher": ["dumbbells", "bench"],
  "db-floor-press": ["dumbbells"],
  "kb-goblet-squat": ["kettlebells"], "kb-deadlift": ["kettlebells"], "kb-swing": ["kettlebells"],
  "kb-floor-press": ["kettlebells"], "kb-one-arm-row": ["kettlebells"], "kb-strict-press": ["kettlebells"],
  "kb-reverse-lunge": ["kettlebells"], "kb-halo": ["kettlebells"],
};

const kettlebellSubstitutions: Record<string, string> = {
  "goblet-squat": "kb-goblet-squat", "flat-bench": "kb-floor-press", "one-arm-row": "kb-one-arm-row",
  "romanian-deadlift": "kb-deadlift", "lateral-raise": "kb-halo", "rear-delt-raise": "kb-halo",
  "split-squat": "kb-reverse-lunge", "overhead-press": "kb-strict-press", "hip-thrust": "kb-deadlift",
  "ez-row": "kb-one-arm-row", "ez-curl": "kb-one-arm-row", "triceps-extension": "kb-floor-press",
  "sumo-deadlift": "kb-deadlift", "neutral-bench": "kb-floor-press", "reverse-lunge": "kb-reverse-lunge",
  "two-db-row": "kb-one-arm-row", "hammer-curl": "kb-one-arm-row", "skull-crusher": "kb-floor-press",
};

const mixedKettlebellMoves = new Set(["goblet-squat", "romanian-deadlift", "sumo-deadlift", "one-arm-row", "overhead-press", "reverse-lunge"]);
const kettlebellRotation = ["kb-goblet-squat", "kb-floor-press", "kb-one-arm-row", "kb-deadlift", "kb-strict-press", "kb-reverse-lunge", "kb-halo", "kb-swing"];

const template = (
  title: string,
  label: string,
  description: string,
  accent: string,
  minutes: number,
  exercises: Prescription[],
): WorkoutTemplate => ({ title, label, description, accent, minutes, exercises });

const strengthTemplates: Record<string, WorkoutTemplate> = {
  full: template("Full-body Strength", "Essentials", "One focused session covering every major movement pattern.", "#dfff62", 34, [
    ["goblet-squat", "A1", 3, "5–8", 75], ["flat-bench", "A2", 3, "5–8", 75], ["one-arm-row", "B1", 3, "6–10 / side", 60],
    ["romanian-deadlift", "B2", 3, "6–10", 60], ["overhead-press", "C1", 2, "6–10", 60],
  ]),
  lowerA: template("Squat Strength", "Lower A", "Squat-led strength for quads, glutes and hamstrings.", "#dfff62", 33, [
    ["goblet-squat", "A1", 4, "5–8", 90], ["romanian-deadlift", "A2", 4, "6–8", 90], ["split-squat", "B1", 3, "6–8 / leg", 75],
    ["hip-thrust", "B2", 3, "8–10", 60], ["lateral-raise", "C1", 2, "12–15", 45],
  ]),
  upperA: template("Press + Row", "Upper A", "Heavy horizontal pressing and pulling with shoulder support.", "#aa9cff", 32, [
    ["flat-bench", "A1", 4, "5–8", 90], ["one-arm-row", "A2", 4, "6–8 / side", 90], ["overhead-press", "B1", 3, "6–8", 75],
    ["ez-row", "B2", 3, "6–10", 75], ["ez-curl", "C1", 2, "8–12", 45],
  ]),
  lowerB: template("Deadlift Strength", "Lower B", "Posterior-chain power with single-leg strength and control.", "#ff9b74", 32, [
    ["sumo-deadlift", "A1", 4, "5–8", 90], ["reverse-lunge", "A2", 3, "6–8 / leg", 75], ["hip-thrust", "B1", 3, "8–10", 60],
    ["goblet-squat", "B2", 3, "8–10", 60], ["rear-delt-raise", "C1", 2, "12–15", 45],
  ]),
  upperB: template("Upper Power", "Upper B", "Strong presses, rows and arms from a second set of angles.", "#78d7ff", 32, [
    ["neutral-bench", "A1", 4, "5–8", 90], ["ez-row", "A2", 4, "6–8", 90], ["overhead-press", "B1", 3, "6–8", 75],
    ["two-db-row", "B2", 3, "8–10", 60], ["skull-crusher", "C1", 2, "8–12", 45],
  ]),
};

const muscleTemplates: Record<string, WorkoutTemplate> = {
  full: template("Full-body Builder", "Total Body", "A complete muscle-building session for a one-day week.", "#aa9cff", 34, [
    ["goblet-squat", "A1", 3, "8–12", 60], ["flat-bench", "A2", 3, "8–12", 60], ["one-arm-row", "B1", 3, "8–12 / side", 60],
    ["romanian-deadlift", "B2", 3, "8–12", 60], ["lateral-raise", "C1", 2, "12–15", 45], ["hammer-curl", "C2", 2, "10–15", 45],
  ]),
  upperA: template("Upper Volume", "Upper A", "Chest and back volume with shoulders and arms.", "#aa9cff", 33, [
    ["flat-bench", "A1", 3, "8–12", 60], ["one-arm-row", "A2", 3, "8–12 / side", 60], ["overhead-press", "B1", 3, "8–12", 60],
    ["ez-row", "B2", 3, "8–12", 60], ["lateral-raise", "C1", 2, "12–15", 45], ["ez-curl", "C2", 2, "10–15", 45],
  ]),
  lowerA: template("Lower Volume", "Lower A", "Quads, glutes and hamstrings through deep, controlled reps.", "#dfff62", 32, [
    ["goblet-squat", "A1", 3, "8–12", 60], ["romanian-deadlift", "A2", 3, "8–12", 60], ["split-squat", "B1", 3, "8–12 / leg", 60],
    ["hip-thrust", "B2", 3, "10–15", 60], ["rear-delt-raise", "C1", 2, "15–20", 45],
  ]),
  push: template("Chest + Shoulders", "Push", "Pressing volume for chest, shoulders and triceps.", "#ff9b74", 31, [
    ["flat-bench", "A1", 4, "8–12", 60], ["overhead-press", "A2", 3, "8–12", 60], ["neutral-bench", "B1", 3, "10–12", 60],
    ["lateral-raise", "B2", 3, "12–15", 45], ["triceps-extension", "C1", 3, "10–15", 45],
  ]),
  pull: template("Back + Biceps", "Pull", "Rows, rear delts and curls for a complete pulling day.", "#78d7ff", 31, [
    ["ez-row", "A1", 4, "8–12", 60], ["one-arm-row", "A2", 3, "10–12 / side", 60], ["two-db-row", "B1", 3, "10–12", 60],
    ["rear-delt-raise", "B2", 3, "15–20", 45], ["hammer-curl", "C1", 3, "10–15", 45],
  ]),
  legs: template("Legs + Glutes", "Legs", "Balanced lower-body volume with squat, hinge and lunge patterns.", "#dfff62", 34, [
    ["goblet-squat", "A1", 4, "8–12", 60], ["romanian-deadlift", "A2", 4, "8–12", 60], ["reverse-lunge", "B1", 3, "10 / leg", 60],
    ["hip-thrust", "B2", 3, "10–15", 60], ["split-squat", "C1", 2, "10–12 / leg", 45],
  ]),
  upperB: template("Upper Detail", "Upper B", "Alternate angles for chest, back, shoulders and arms.", "#78d7ff", 32, [
    ["neutral-bench", "A1", 3, "8–12", 60], ["two-db-row", "A2", 3, "8–12", 60], ["overhead-press", "B1", 3, "8–12", 60],
    ["rear-delt-raise", "B2", 3, "12–20", 45], ["hammer-curl", "C1", 2, "10–15", 45], ["skull-crusher", "C2", 2, "10–15", 45],
  ]),
  lowerB: template("Lower Detail", "Lower B", "Single-leg and posterior-chain work for balanced development.", "#ff9b74", 32, [
    ["sumo-deadlift", "A1", 3, "8–12", 60], ["split-squat", "A2", 3, "8–12 / leg", 60], ["hip-thrust", "B1", 3, "10–15", 60],
    ["reverse-lunge", "B2", 3, "10 / leg", 60], ["lateral-raise", "C1", 2, "12–20", 45],
  ]),
};

const fatLossTemplates: Record<string, WorkoutTemplate> = {
  circuitA: template("Squat + Push Circuit", "Circuit A", "Alternating squat, push and pull work at a steady pace.", "#dfff62", 28, [
    ["goblet-squat", "A1", 3, "10–15", 40], ["flat-bench", "A2", 3, "10–15", 40], ["one-arm-row", "A3", 3, "10 / side", 40],
    ["romanian-deadlift", "A4", 3, "10–15", 40], ["lateral-raise", "A5", 2, "12–15", 35],
  ]),
  circuitB: template("Hinge + Press Circuit", "Circuit B", "Posterior-chain work paired with shoulders, back and core control.", "#aa9cff", 29, [
    ["sumo-deadlift", "A1", 3, "10–12", 40], ["overhead-press", "A2", 3, "10–12", 40], ["reverse-lunge", "A3", 3, "8–10 / leg", 40],
    ["ez-row", "A4", 3, "10–12", 40], ["hammer-curl", "A5", 2, "12–15", 35],
  ]),
  circuitC: template("Lunge + Row Circuit", "Circuit C", "Unilateral legs, pulling strength and chest work with short rests.", "#ff9b74", 29, [
    ["reverse-lunge", "A1", 3, "10 / leg", 40], ["two-db-row", "A2", 3, "10–15", 40], ["neutral-bench", "A3", 3, "10–15", 40],
    ["hip-thrust", "A4", 3, "12–15", 40], ["rear-delt-raise", "A5", 2, "15–20", 35],
  ]),
  circuitD: template("Split + Upper Circuit", "Circuit D", "A full-body session with extra single-leg and upper-body work.", "#78d7ff", 30, [
    ["split-squat", "A1", 3, "8–10 / leg", 40], ["one-arm-row", "A2", 3, "10–12 / side", 40], ["overhead-press", "A3", 3, "10–12", 40],
    ["romanian-deadlift", "A4", 3, "10–15", 40], ["triceps-extension", "A5", 2, "12–15", 35],
  ]),
  circuitE: template("Total-body Finish", "Circuit E", "A final weekly circuit that blends the main movement patterns.", "#ffd56a", 28, [
    ["goblet-squat", "A1", 3, "12–15", 40], ["ez-row", "A2", 3, "10–15", 40], ["flat-bench", "A3", 3, "10–15", 40],
    ["hip-thrust", "A4", 3, "12–15", 40], ["ez-curl", "A5", 2, "12–15", 35],
  ]),
};

const schedules: Record<PlanGoal, Record<number, string[]>> = {
  strength: {
    1: ["full"],
    2: ["lowerA", "upperA"],
    3: [],
    4: ["lowerA", "upperA", "lowerB", "upperB"],
    5: ["lowerA", "upperA", "full", "lowerB", "upperB"],
  },
  muscle: {
    1: ["full"],
    2: ["upperA", "lowerA"],
    3: ["push", "pull", "legs"],
    4: ["upperA", "lowerA", "upperB", "lowerB"],
    5: ["push", "pull", "legs", "upperB", "lowerB"],
  },
  "fat-loss": {
    1: ["circuitA"],
    2: ["circuitA", "circuitB"],
    3: ["circuitA", "circuitB", "circuitC"],
    4: ["circuitA", "circuitB", "circuitC", "circuitD"],
    5: ["circuitA", "circuitB", "circuitC", "circuitD", "circuitE"],
  },
};

export function getGoalOption(goal: PlanGoal) {
  return goalOptions.find((option) => option.id === goal) || goalOptions[0];
}

function tailorForEquipment(generated: Workout[], goal: PlanGoal, profile?: PlanProfile): Workout[] {
  if (!profile || profile.location === "gym") return generated;
  const selected = new Set(profile.equipment);
  const hasKettlebells = selected.has("kettlebells");
  const hasDumbbells = selected.has("dumbbells");
  const kettlebellOnly = hasKettlebells && !hasDumbbells;

  const selectId = (id: string) => {
    if (hasKettlebells && (kettlebellOnly || mixedKettlebellMoves.has(id))) return kettlebellSubstitutions[id] || id;
    if ((requirements[id] || []).every((item) => selected.has(item))) return id;
    if (hasKettlebells) return kettlebellSubstitutions[id] || "kb-goblet-squat";
    if (hasDumbbells) {
      if (id === "ez-row") return "two-db-row";
      if (id === "ez-curl") return "hammer-curl";
      if (["flat-bench", "neutral-bench", "triceps-extension", "skull-crusher"].includes(id)) return "db-floor-press";
      if (id === "split-squat") return "reverse-lunge";
      if (id === "hip-thrust") return "romanian-deadlift";
      if (id === "overhead-press") return "lateral-raise";
    }
    return id;
  };

  return generated.map((workout) => {
    const used = new Set<string>();
    const exercises = workout.exercises.map((exercise) => {
      let id = selectId(exercise.id);
      if (hasKettlebells && used.has(id)) {
        const alternate = kettlebellRotation.find((candidate) => !used.has(candidate));
        if (alternate) id = alternate;
      }
      used.add(id);
      const source = exerciseLibrary.get(id) || exercise;
      let reps = exercise.reps;
      if (id.startsWith("kb-")) {
        const unilateral = ["kb-floor-press", "kb-one-arm-row", "kb-strict-press"].includes(id);
        if (goal === "strength") reps = id === "kb-halo" ? "8 / direction" : id === "kb-swing" ? "10–12" : unilateral ? "6–10 / side" : id === "kb-reverse-lunge" ? "6–8 / leg" : "6–10";
        if (goal === "muscle") reps = id === "kb-halo" ? "10 / direction" : id === "kb-swing" ? "12–15" : unilateral ? "8–12 / side" : id === "kb-reverse-lunge" ? "8–12 / leg" : "8–12";
        if (goal === "fat-loss") reps = id === "kb-halo" ? "8 / direction" : id === "kb-swing" ? "15–20" : unilateral ? "10 / side" : id === "kb-reverse-lunge" ? "10 / leg" : "10–15";
      }
      return { ...source, pair: exercise.pair, sets: exercise.sets, reps, rest: exercise.rest };
    });
    const kitLabel = kettlebellOnly ? "Kettlebell" : hasKettlebells ? "Mixed-equipment" : "Home";
    return { ...workout, description: `${workout.description} Tailored for your ${kitLabel.toLowerCase()} setup.`, exercises };
  });
}

export function getWorkouts(goal: PlanGoal, days: number, profile?: PlanProfile): Workout[] {
  const safeDays = Math.min(5, Math.max(1, Math.round(days)));
  let generated: Workout[];
  if (goal === "strength" && safeDays === 3) {
    generated = workouts.map((workout) => ({ ...workout, exercises: workout.exercises.map((exercise) => ({ ...exercise })) }));
    return tailorForEquipment(generated, goal, profile);
  }

  const catalog = goal === "strength" ? strengthTemplates : goal === "muscle" ? muscleTemplates : fatLossTemplates;
  generated = schedules[goal][safeDays].map((key, index) => {
    const selected = catalog[key];
    return {
      ...selected,
      day: index + 1,
      exercises: selected.exercises.map(([id, pair, sets, reps, rest]) => {
        const source = exerciseLibrary.get(id);
        if (!source) throw new Error(`Unknown exercise: ${id}`);
        return { ...source, pair, sets, reps, rest };
      }),
    };
  });
  return tailorForEquipment(generated, goal, profile);
}

export function getExerciseName(id: string) {
  return exerciseLibrary.get(id)?.name || id;
}
