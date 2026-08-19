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
  exercises: Exercise[];
};

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
