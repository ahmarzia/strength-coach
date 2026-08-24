export type ExerciseMedia = {
  type: "mp4" | "youtube";
  title: string;
  videoUrl: string;
  posterUrl: string;
  sourceName: string;
  sourceUrl: string;
  orientation: "portrait" | "landscape";
};

const ymove = (title: string, id: string): ExerciseMedia => ({
  type: "mp4",
  title,
  videoUrl: `https://ymove.app/api/free/${id}?type=video`,
  posterUrl: `https://ymove.app/api/free/${id}?type=thumbnail`,
  sourceName: "Your Move",
  sourceUrl: "https://ymove.app/free-exercise-videos",
  orientation: "portrait",
});

const youtube = (title: string, id: string, sourceName: string): ExerciseMedia => ({
  type: "youtube",
  title,
  videoUrl: id,
  posterUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  sourceName,
  sourceUrl: `https://www.youtube.com/watch?v=${id}`,
  orientation: "landscape",
});

export const exerciseMedia: Record<string, ExerciseMedia> = {
  "goblet-squat": ymove("Dumbbell Goblet Squat", "a2a797d0-f6f6-436e-8616-6c1d93e73d67"),
  "flat-bench": youtube("Dumbbell Bench Press", "VmB1G1K7v94", "ScottHermanFitness"),
  "one-arm-row": youtube("One-arm Dumbbell Row", "PgpQ4-jHiq4", "Bodybuilding.com"),
  "romanian-deadlift": youtube("Dumbbell Romanian Deadlift", "FQKfr1YDhEk", "ScottHermanFitness"),
  "lateral-raise": ymove("Dumbbell Lateral Raise", "a16f0235-20eb-4306-b9cc-c01ae51b3b9b"),
  "rear-delt-raise": youtube("Bent-over Rear-delt Raise", "ttvfGg9d76c", "ScottHermanFitness"),
  "split-squat": youtube("Dumbbell Bulgarian Split Squat", "vLuhN_glFZ8", "J2FIT Strength & Conditioning"),
  "overhead-press": youtube("Seated Dumbbell Press", "lfb3ffbrd4Q", "Buff Dudes Workouts"),
  "hip-thrust": youtube("Dumbbell Hip Thrust", "ETnhBWeWK74", "PureGym"),
  "ez-row": youtube("EZ-bar Bent-over Row", "rQdudkp4ek4", "Testosterone Nation"),
  "ez-curl": youtube("EZ-bar Curl", "zG2xJ0Q5QtI", "ScottHermanFitness"),
  "triceps-extension": youtube("Lying Dumbbell Triceps Extension", "MO_03opCc0g", "ScottHermanFitness"),
  "sumo-deadlift": youtube("Dumbbell Sumo Deadlift", "De9OUZz5W_I", "J2FIT Strength & Conditioning"),
  "neutral-bench": youtube("Neutral-grip Dumbbell Bench Press", "Cp8CixmENnk", "SET FOR SET"),
  "reverse-lunge": youtube("Dumbbell Reverse Lunge", "MpfeGnBFEo8", "IronmasterPro"),
  "two-db-row": youtube("Two-dumbbell Row", "--gDUDFKx6Q", "Bodybuilding.com"),
  "hammer-curl": ymove("Dumbbell Hammer Curl", "b11e6c6f-b2e8-44ca-95dc-adf0dcd34426"),
  "skull-crusher": youtube("Dumbbell Skull Crusher", "MO_03opCc0g", "ScottHermanFitness"),
  "kb-goblet-squat": youtube("Kettlebell Goblet Squat", "aNDUbH_Uv4g", "Zack Henderson"),
  "kb-deadlift": youtube("Kettlebell Deadlift", "sDbMsk3d6F4", "Kettlebell trainer"),
  "kb-swing": youtube("Two-hand Kettlebell Swing", "1Qi0NQW89Oc", "KB Fit Britt"),
  "kb-floor-press": youtube("Single-arm Kettlebell Floor Press", "B340QckIfJM", "Kettlebell trainer"),
  "kb-one-arm-row": youtube("Single-arm Kettlebell Row", "l5qelXL5nfs", "Trainer demonstration"),
  "kb-strict-press": youtube("Single-arm Kettlebell Press", "gjr-QAdsq4o", "Onnit"),
  "kb-reverse-lunge": youtube("Kettlebell Reverse Lunge", "2D4xApe-UFU", "Trainer demonstration"),
  "kb-halo": youtube("Kettlebell Halo", "z8f3M4xImto", "NASM trainer"),
  "db-floor-press": youtube("Dumbbell Floor Press", "Bx4QPVH-J1g", "Colossus Fitness"),
};
