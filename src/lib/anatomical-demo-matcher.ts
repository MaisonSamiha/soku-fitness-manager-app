// Maps exercise names to our custom anatomical demo illustrations
// These are prioritized over the free-exercise-db photos
// 30 exercise categories covering virtually every gym exercise

const DEMO_MAP: Record<string, { start: string; end: string }> = {
  // ─── CHEST ─────────────────────────────────────────
  'bench press': { start: '/demos/bench_press_0.png', end: '/demos/bench_press_1.png' },
  'dumbbell bench press': { start: '/demos/bench_press_0.png', end: '/demos/bench_press_1.png' },
  'barbell bench press': { start: '/demos/bench_press_0.png', end: '/demos/bench_press_1.png' },
  'flat bench press': { start: '/demos/bench_press_0.png', end: '/demos/bench_press_1.png' },
  'decline bench press': { start: '/demos/bench_press_0.png', end: '/demos/bench_press_1.png' },
  'decline dumbbell press': { start: '/demos/bench_press_0.png', end: '/demos/bench_press_1.png' },
  'close-grip bench press': { start: '/demos/bench_press_0.png', end: '/demos/bench_press_1.png' },
  'close-grip dumbbell press': { start: '/demos/bench_press_0.png', end: '/demos/bench_press_1.png' },
  'dumbbell press': { start: '/demos/bench_press_0.png', end: '/demos/bench_press_1.png' },
  'chest press': { start: '/demos/bench_press_0.png', end: '/demos/bench_press_1.png' },
  'machine chest press': { start: '/demos/bench_press_0.png', end: '/demos/bench_press_1.png' },
  'machine incline press': { start: '/demos/incline_press_0.png', end: '/demos/incline_press_1.png' },

  'incline bench press': { start: '/demos/incline_press_0.png', end: '/demos/incline_press_1.png' },
  'incline dumbbell press': { start: '/demos/incline_press_0.png', end: '/demos/incline_press_1.png' },
  'incline barbell press': { start: '/demos/incline_press_0.png', end: '/demos/incline_press_1.png' },
  'incline press': { start: '/demos/incline_press_0.png', end: '/demos/incline_press_1.png' },

  'cable crossover': { start: '/demos/cable_crossover_0.png', end: '/demos/cable_crossover_1.png' },
  'cable fly': { start: '/demos/cable_crossover_0.png', end: '/demos/cable_crossover_1.png' },
  'cable chest fly': { start: '/demos/cable_crossover_0.png', end: '/demos/cable_crossover_1.png' },
  'low-to-high cable fly': { start: '/demos/cable_crossover_0.png', end: '/demos/cable_crossover_1.png' },
  'high-to-low cable fly': { start: '/demos/cable_crossover_0.png', end: '/demos/cable_crossover_1.png' },
  'mid-pulley cable crossover': { start: '/demos/cable_crossover_0.png', end: '/demos/cable_crossover_1.png' },

  'dumbbell fly': { start: '/demos/cable_crossover_0.png', end: '/demos/cable_crossover_1.png' },
  'dumbbell flyes': { start: '/demos/cable_crossover_0.png', end: '/demos/cable_crossover_1.png' },
  'incline dumbbell fly': { start: '/demos/cable_crossover_0.png', end: '/demos/cable_crossover_1.png' },

  'pec deck': { start: '/demos/pec_deck_0.png', end: '/demos/pec_deck_1.png' },
  'pec fly': { start: '/demos/pec_deck_0.png', end: '/demos/pec_deck_1.png' },
  'pec deck fly': { start: '/demos/pec_deck_0.png', end: '/demos/pec_deck_1.png' },
  'machine fly': { start: '/demos/pec_deck_0.png', end: '/demos/pec_deck_1.png' },

  'push-up': { start: '/demos/pushup_0.png', end: '/demos/pushup_1.png' },
  'push up': { start: '/demos/pushup_0.png', end: '/demos/pushup_1.png' },
  'pushup': { start: '/demos/pushup_0.png', end: '/demos/pushup_1.png' },
  'weighted push-up': { start: '/demos/pushup_0.png', end: '/demos/pushup_1.png' },
  'incline push-up': { start: '/demos/pushup_0.png', end: '/demos/pushup_1.png' },
  'decline push-up': { start: '/demos/pushup_0.png', end: '/demos/pushup_1.png' },
  'diamond push-up': { start: '/demos/pushup_0.png', end: '/demos/pushup_1.png' },

  'dip': { start: '/demos/dip_0.png', end: '/demos/dip_1.png' },
  'dips': { start: '/demos/dip_0.png', end: '/demos/dip_1.png' },
  'chest dip': { start: '/demos/dip_0.png', end: '/demos/dip_1.png' },
  'tricep dip': { start: '/demos/dip_0.png', end: '/demos/dip_1.png' },
  'bench dip': { start: '/demos/dip_0.png', end: '/demos/dip_1.png' },
  'weighted dip': { start: '/demos/dip_0.png', end: '/demos/dip_1.png' },

  'pullover': { start: '/demos/pullover_0.png', end: '/demos/pullover_1.png' },
  'dumbbell pullover': { start: '/demos/pullover_0.png', end: '/demos/pullover_1.png' },

  // ─── BACK ──────────────────────────────────────────
  'lat pulldown': { start: '/demos/lat_pulldown_0.png', end: '/demos/lat_pulldown_1.png' },
  'wide-grip lat pulldown': { start: '/demos/lat_pulldown_0.png', end: '/demos/lat_pulldown_1.png' },
  'close-grip lat pulldown': { start: '/demos/lat_pulldown_0.png', end: '/demos/lat_pulldown_1.png' },
  'reverse-grip lat pulldown': { start: '/demos/lat_pulldown_0.png', end: '/demos/lat_pulldown_1.png' },
  'pull-up': { start: '/demos/lat_pulldown_0.png', end: '/demos/lat_pulldown_1.png' },
  'chin-up': { start: '/demos/lat_pulldown_0.png', end: '/demos/lat_pulldown_1.png' },
  'assisted pull-up': { start: '/demos/lat_pulldown_0.png', end: '/demos/lat_pulldown_1.png' },
  'straight-arm pulldown': { start: '/demos/lat_pulldown_0.png', end: '/demos/lat_pulldown_1.png' },

  'barbell row': { start: '/demos/row_0.png', end: '/demos/row_1.png' },
  'bent-over row': { start: '/demos/row_0.png', end: '/demos/row_1.png' },
  'bent over barbell row': { start: '/demos/row_0.png', end: '/demos/row_1.png' },
  'dumbbell row': { start: '/demos/row_0.png', end: '/demos/row_1.png' },
  'single arm dumbbell row': { start: '/demos/row_0.png', end: '/demos/row_1.png' },
  'one-arm dumbbell row': { start: '/demos/row_0.png', end: '/demos/row_1.png' },
  'seated cable row': { start: '/demos/row_0.png', end: '/demos/row_1.png' },
  'cable row': { start: '/demos/row_0.png', end: '/demos/row_1.png' },
  't-bar row': { start: '/demos/row_0.png', end: '/demos/row_1.png' },
  'pendlay row': { start: '/demos/row_0.png', end: '/demos/row_1.png' },
  'chest supported dumbbell row': { start: '/demos/row_0.png', end: '/demos/row_1.png' },
  'machine row': { start: '/demos/row_0.png', end: '/demos/row_1.png' },

  'deadlift': { start: '/demos/deadlift_0.png', end: '/demos/deadlift_1.png' },
  'conventional deadlift': { start: '/demos/deadlift_0.png', end: '/demos/deadlift_1.png' },
  'romanian deadlift': { start: '/demos/deadlift_0.png', end: '/demos/deadlift_1.png' },
  'stiff-leg deadlift': { start: '/demos/deadlift_0.png', end: '/demos/deadlift_1.png' },
  'sumo deadlift': { start: '/demos/deadlift_0.png', end: '/demos/deadlift_1.png' },
  'barbell deadlift': { start: '/demos/deadlift_0.png', end: '/demos/deadlift_1.png' },
  'dumbbell deadlift': { start: '/demos/deadlift_0.png', end: '/demos/deadlift_1.png' },
  'trap bar deadlift': { start: '/demos/deadlift_0.png', end: '/demos/deadlift_1.png' },
  'dumbbell romanian deadlift': { start: '/demos/deadlift_0.png', end: '/demos/deadlift_1.png' },
  'good morning': { start: '/demos/deadlift_0.png', end: '/demos/deadlift_1.png' },

  'face pull': { start: '/demos/face_pull_0.png', end: '/demos/face_pull_1.png' },
  'cable face pull': { start: '/demos/face_pull_0.png', end: '/demos/face_pull_1.png' },

  'shrug': { start: '/demos/shrug_0.png', end: '/demos/shrug_1.png' },
  'dumbbell shrug': { start: '/demos/shrug_0.png', end: '/demos/shrug_1.png' },
  'barbell shrug': { start: '/demos/shrug_0.png', end: '/demos/shrug_1.png' },

  // ─── SHOULDERS ─────────────────────────────────────
  'shoulder press': { start: '/demos/shoulder_press_0.png', end: '/demos/shoulder_press_1.png' },
  'overhead press': { start: '/demos/shoulder_press_0.png', end: '/demos/shoulder_press_1.png' },
  'dumbbell shoulder press': { start: '/demos/shoulder_press_0.png', end: '/demos/shoulder_press_1.png' },
  'military press': { start: '/demos/shoulder_press_0.png', end: '/demos/shoulder_press_1.png' },
  'seated dumbbell press': { start: '/demos/shoulder_press_0.png', end: '/demos/shoulder_press_1.png' },
  'arnold press': { start: '/demos/shoulder_press_0.png', end: '/demos/shoulder_press_1.png' },
  'barbell overhead press': { start: '/demos/shoulder_press_0.png', end: '/demos/shoulder_press_1.png' },
  'seated overhead press': { start: '/demos/shoulder_press_0.png', end: '/demos/shoulder_press_1.png' },
  'machine shoulder press': { start: '/demos/shoulder_press_0.png', end: '/demos/shoulder_press_1.png' },

  'lateral raise': { start: '/demos/lateral_raise_0.png', end: '/demos/lateral_raise_1.png' },
  'dumbbell lateral raise': { start: '/demos/lateral_raise_0.png', end: '/demos/lateral_raise_1.png' },
  'side lateral raise': { start: '/demos/lateral_raise_0.png', end: '/demos/lateral_raise_1.png' },
  'cable lateral raise': { start: '/demos/lateral_raise_0.png', end: '/demos/lateral_raise_1.png' },
  'front raise': { start: '/demos/lateral_raise_0.png', end: '/demos/lateral_raise_1.png' },
  'dumbbell front raise': { start: '/demos/lateral_raise_0.png', end: '/demos/lateral_raise_1.png' },

  'rear delt fly': { start: '/demos/rear_delt_fly_0.png', end: '/demos/rear_delt_fly_1.png' },
  'reverse fly': { start: '/demos/rear_delt_fly_0.png', end: '/demos/rear_delt_fly_1.png' },
  'rear delt cable fly': { start: '/demos/rear_delt_fly_0.png', end: '/demos/rear_delt_fly_1.png' },
  'bent-over reverse fly': { start: '/demos/rear_delt_fly_0.png', end: '/demos/rear_delt_fly_1.png' },
  'reverse pec deck': { start: '/demos/rear_delt_fly_0.png', end: '/demos/rear_delt_fly_1.png' },

  'upright row': { start: '/demos/upright_row_0.png', end: '/demos/upright_row_1.png' },
  'barbell upright row': { start: '/demos/upright_row_0.png', end: '/demos/upright_row_1.png' },
  'dumbbell upright row': { start: '/demos/upright_row_0.png', end: '/demos/upright_row_1.png' },

  // ─── BICEPS ────────────────────────────────────────
  'bicep curl': { start: '/demos/bicep_curl_0.png', end: '/demos/bicep_curl_1.png' },
  'dumbbell curl': { start: '/demos/bicep_curl_0.png', end: '/demos/bicep_curl_1.png' },
  'barbell curl': { start: '/demos/bicep_curl_0.png', end: '/demos/bicep_curl_1.png' },
  'hammer curl': { start: '/demos/hammer_curl_0.png', end: '/demos/hammer_curl_1.png' },
  'preacher curl': { start: '/demos/hammer_curl_0.png', end: '/demos/hammer_curl_1.png' },
  'concentration curl': { start: '/demos/hammer_curl_0.png', end: '/demos/hammer_curl_1.png' },
  'incline dumbbell curl': { start: '/demos/hammer_curl_0.png', end: '/demos/hammer_curl_1.png' },
  'cable curl': { start: '/demos/bicep_curl_0.png', end: '/demos/bicep_curl_1.png' },
  'ez bar curl': { start: '/demos/bicep_curl_0.png', end: '/demos/bicep_curl_1.png' },
  'ez-bar curl': { start: '/demos/bicep_curl_0.png', end: '/demos/bicep_curl_1.png' },
  'spider curl': { start: '/demos/bicep_curl_0.png', end: '/demos/bicep_curl_1.png' },
  'bayesian curl': { start: '/demos/bicep_curl_0.png', end: '/demos/bicep_curl_1.png' },

  // ─── TRICEPS ───────────────────────────────────────
  'tricep pushdown': { start: '/demos/tricep_pushdown_0.png', end: '/demos/tricep_pushdown_1.png' },
  'cable triceps pushdown': { start: '/demos/tricep_pushdown_0.png', end: '/demos/tricep_pushdown_1.png' },
  'cable tricep pushdown': { start: '/demos/tricep_pushdown_0.png', end: '/demos/tricep_pushdown_1.png' },
  'rope pushdown': { start: '/demos/tricep_pushdown_0.png', end: '/demos/tricep_pushdown_1.png' },
  'tricep extension': { start: '/demos/tricep_pushdown_0.png', end: '/demos/tricep_pushdown_1.png' },
  'overhead tricep extension': { start: '/demos/tricep_pushdown_0.png', end: '/demos/tricep_pushdown_1.png' },
  'seated dumbbell overhead triceps extension': { start: '/demos/tricep_pushdown_0.png', end: '/demos/tricep_pushdown_1.png' },
  'dumbbell overhead triceps extension': { start: '/demos/tricep_pushdown_0.png', end: '/demos/tricep_pushdown_1.png' },
  'cable triceps extension': { start: '/demos/tricep_pushdown_0.png', end: '/demos/tricep_pushdown_1.png' },
  'skull crusher': { start: '/demos/skull_crusher_0.png', end: '/demos/skull_crusher_1.png' },
  'lying triceps extension': { start: '/demos/skull_crusher_0.png', end: '/demos/skull_crusher_1.png' },

  'tricep kickback': { start: '/demos/tricep_kickback_0.png', end: '/demos/tricep_kickback_1.png' },
  'dumbbell kickback': { start: '/demos/tricep_kickback_0.png', end: '/demos/tricep_kickback_1.png' },

  // ─── LEGS ──────────────────────────────────────────
  'squat': { start: '/demos/squat_0.png', end: '/demos/squat_1.png' },
  'back squat': { start: '/demos/squat_0.png', end: '/demos/squat_1.png' },
  'barbell back squat': { start: '/demos/squat_0.png', end: '/demos/squat_1.png' },
  'barbell squat': { start: '/demos/squat_0.png', end: '/demos/squat_1.png' },
  'front squat': { start: '/demos/squat_0.png', end: '/demos/squat_1.png' },
  'goblet squat': { start: '/demos/squat_0.png', end: '/demos/squat_1.png' },
  'dumbbell squat': { start: '/demos/squat_0.png', end: '/demos/squat_1.png' },
  'bulgarian split squat': { start: '/demos/squat_0.png', end: '/demos/squat_1.png' },
  'dumbbell bulgarian split squat': { start: '/demos/squat_0.png', end: '/demos/squat_1.png' },
  'split squat': { start: '/demos/squat_0.png', end: '/demos/squat_1.png' },
  'smith machine squat': { start: '/demos/squat_0.png', end: '/demos/squat_1.png' },

  'hack squat': { start: '/demos/hack_squat_0.png', end: '/demos/hack_squat_1.png' },
  'machine hack squat': { start: '/demos/hack_squat_0.png', end: '/demos/hack_squat_1.png' },

  'leg press': { start: '/demos/leg_press_0.png', end: '/demos/leg_press_1.png' },
  'machine leg press': { start: '/demos/leg_press_0.png', end: '/demos/leg_press_1.png' },

  'leg extension': { start: '/demos/leg_extension_0.png', end: '/demos/leg_extension_1.png' },
  'machine leg extension': { start: '/demos/leg_extension_0.png', end: '/demos/leg_extension_1.png' },
  'seated leg extension': { start: '/demos/leg_extension_0.png', end: '/demos/leg_extension_1.png' },

  'leg curl': { start: '/demos/leg_curl_0.png', end: '/demos/leg_curl_1.png' },
  'lying leg curl': { start: '/demos/leg_curl_0.png', end: '/demos/leg_curl_1.png' },
  'seated leg curl': { start: '/demos/leg_curl_0.png', end: '/demos/leg_curl_1.png' },
  'machine leg curl': { start: '/demos/leg_curl_0.png', end: '/demos/leg_curl_1.png' },
  'hamstring curl': { start: '/demos/leg_curl_0.png', end: '/demos/leg_curl_1.png' },

  'lunge': { start: '/demos/lunge_0.png', end: '/demos/lunge_1.png' },
  'lunges': { start: '/demos/lunge_0.png', end: '/demos/lunge_1.png' },
  'walking lunge': { start: '/demos/lunge_0.png', end: '/demos/lunge_1.png' },
  'dumbbell lunge': { start: '/demos/lunge_0.png', end: '/demos/lunge_1.png' },
  'barbell lunge': { start: '/demos/lunge_0.png', end: '/demos/lunge_1.png' },
  'reverse lunge': { start: '/demos/lunge_0.png', end: '/demos/lunge_1.png' },
  'step-up': { start: '/demos/lunge_0.png', end: '/demos/lunge_1.png' },

  'hip thrust': { start: '/demos/hip_thrust_0.png', end: '/demos/hip_thrust_1.png' },
  'barbell hip thrust': { start: '/demos/hip_thrust_0.png', end: '/demos/hip_thrust_1.png' },
  'glute bridge': { start: '/demos/hip_thrust_0.png', end: '/demos/hip_thrust_1.png' },
  'single leg glute bridge': { start: '/demos/hip_thrust_0.png', end: '/demos/hip_thrust_1.png' },

  'calf raise': { start: '/demos/calf_raise_0.png', end: '/demos/calf_raise_1.png' },
  'standing calf raise': { start: '/demos/calf_raise_0.png', end: '/demos/calf_raise_1.png' },
  'seated calf raise': { start: '/demos/calf_raise_0.png', end: '/demos/calf_raise_1.png' },
  'machine calf raise': { start: '/demos/calf_raise_0.png', end: '/demos/calf_raise_1.png' },

  'kettlebell swing': { start: '/demos/kettlebell_swing_0.png', end: '/demos/kettlebell_swing_1.png' },
  'kettlebell swing two-handed': { start: '/demos/kettlebell_swing_0.png', end: '/demos/kettlebell_swing_1.png' },

  // ─── CORE / ABS ────────────────────────────────────
  'plank': { start: '/demos/plank_0.png', end: '/demos/plank_0.png' },
  'forearm plank': { start: '/demos/plank_0.png', end: '/demos/plank_0.png' },
  'side plank': { start: '/demos/plank_0.png', end: '/demos/plank_0.png' },

  'crunch': { start: '/demos/crunch_0.png', end: '/demos/crunch_1.png' },
  'crunches': { start: '/demos/crunch_0.png', end: '/demos/crunch_1.png' },
  'cable crunch': { start: '/demos/crunch_0.png', end: '/demos/crunch_1.png' },
  'sit-up': { start: '/demos/crunch_0.png', end: '/demos/crunch_1.png' },
  'decline sit-up': { start: '/demos/crunch_0.png', end: '/demos/crunch_1.png' },
  'russian twist': { start: '/demos/crunch_0.png', end: '/demos/crunch_1.png' },
  'ab rollout': { start: '/demos/crunch_0.png', end: '/demos/crunch_1.png' },

  'hanging leg raise': { start: '/demos/hanging_leg_raise_0.png', end: '/demos/hanging_leg_raise_1.png' },
  'leg raise': { start: '/demos/hanging_leg_raise_0.png', end: '/demos/hanging_leg_raise_1.png' },
  'hanging knee raise': { start: '/demos/hanging_leg_raise_0.png', end: '/demos/hanging_leg_raise_1.png' },
  'captain chair leg raise': { start: '/demos/hanging_leg_raise_0.png', end: '/demos/hanging_leg_raise_1.png' },

  // ─── CARDIO / FINISHERS ─────────────────────────────
  'treadmill': { start: '/demos/treadmill_0.png', end: '/demos/treadmill_1.png' },
  'treadmill run': { start: '/demos/treadmill_0.png', end: '/demos/treadmill_1.png' },
  'treadmill sprint': { start: '/demos/treadmill_0.png', end: '/demos/treadmill_1.png' },
  'treadmill intervals': { start: '/demos/treadmill_0.png', end: '/demos/treadmill_1.png' },
  'treadmill jog': { start: '/demos/treadmill_0.png', end: '/demos/treadmill_1.png' },
  'treadmill incline walk': { start: '/demos/treadmill_0.png', end: '/demos/treadmill_1.png' },
  'jogging': { start: '/demos/treadmill_0.png', end: '/demos/treadmill_1.png' },
  'running': { start: '/demos/treadmill_0.png', end: '/demos/treadmill_1.png' },
  'light jog': { start: '/demos/treadmill_0.png', end: '/demos/treadmill_1.png' },
  'steady-state run': { start: '/demos/treadmill_0.png', end: '/demos/treadmill_1.png' },
  'steady state cardio': { start: '/demos/treadmill_0.png', end: '/demos/treadmill_1.png' },
  'incline treadmill walk': { start: '/demos/treadmill_0.png', end: '/demos/treadmill_1.png' },

  'rowing machine': { start: '/demos/rowing_0.png', end: '/demos/rowing_1.png' },
  'rowing': { start: '/demos/rowing_0.png', end: '/demos/rowing_1.png' },
  'rower': { start: '/demos/rowing_0.png', end: '/demos/rowing_1.png' },
  'row machine': { start: '/demos/rowing_0.png', end: '/demos/rowing_1.png' },
  'indoor rowing': { start: '/demos/rowing_0.png', end: '/demos/rowing_1.png' },
  'rowing machine intervals': { start: '/demos/rowing_0.png', end: '/demos/rowing_1.png' },

  'jump rope': { start: '/demos/jump_rope_0.png', end: '/demos/jump_rope_1.png' },
  'jumping rope': { start: '/demos/jump_rope_0.png', end: '/demos/jump_rope_1.png' },
  'skipping rope': { start: '/demos/jump_rope_0.png', end: '/demos/jump_rope_1.png' },
  'jump rope intervals': { start: '/demos/jump_rope_0.png', end: '/demos/jump_rope_1.png' },

  'battle rope': { start: '/demos/battle_rope_0.png', end: '/demos/battle_rope_1.png' },
  'battle ropes': { start: '/demos/battle_rope_0.png', end: '/demos/battle_rope_1.png' },
  'rope waves': { start: '/demos/battle_rope_0.png', end: '/demos/battle_rope_1.png' },
  'battle rope waves': { start: '/demos/battle_rope_0.png', end: '/demos/battle_rope_1.png' },
  'battle rope slams': { start: '/demos/battle_rope_0.png', end: '/demos/battle_rope_1.png' },

  'mountain climber': { start: '/demos/mountain_climber_0.png', end: '/demos/mountain_climber_1.png' },
  'mountain climbers': { start: '/demos/mountain_climber_0.png', end: '/demos/mountain_climber_1.png' },
  'cross-body mountain climber': { start: '/demos/mountain_climber_0.png', end: '/demos/mountain_climber_1.png' },

  'stair climber': { start: '/demos/treadmill_0.png', end: '/demos/treadmill_1.png' },
  'stairmaster': { start: '/demos/treadmill_0.png', end: '/demos/treadmill_1.png' },
  'stair stepper': { start: '/demos/treadmill_0.png', end: '/demos/treadmill_1.png' },
  'elliptical': { start: '/demos/treadmill_0.png', end: '/demos/treadmill_1.png' },
  'stationary bike': { start: '/demos/treadmill_0.png', end: '/demos/treadmill_1.png' },
  'cycling': { start: '/demos/treadmill_0.png', end: '/demos/treadmill_1.png' },

  'burpee': { start: '/demos/mountain_climber_0.png', end: '/demos/mountain_climber_1.png' },
  'burpees': { start: '/demos/mountain_climber_0.png', end: '/demos/mountain_climber_1.png' },
  'jumping jack': { start: '/demos/jump_rope_0.png', end: '/demos/jump_rope_1.png' },
  'jumping jacks': { start: '/demos/jump_rope_0.png', end: '/demos/jump_rope_1.png' },
  'high knees': { start: '/demos/treadmill_0.png', end: '/demos/treadmill_1.png' },
  'box jump': { start: '/demos/jump_rope_0.png', end: '/demos/jump_rope_1.png' },

  // ─── WARMUP / MOBILITY ─────────────────────────────
  'dynamic stretch': { start: '/demos/dynamic_stretch_0.png', end: '/demos/dynamic_stretch_1.png' },
  'dynamic stretching': { start: '/demos/dynamic_stretch_0.png', end: '/demos/dynamic_stretch_1.png' },
  'leg swing': { start: '/demos/dynamic_stretch_0.png', end: '/demos/dynamic_stretch_1.png' },
  'leg swings': { start: '/demos/dynamic_stretch_0.png', end: '/demos/dynamic_stretch_1.png' },
  'arm circle': { start: '/demos/dynamic_stretch_0.png', end: '/demos/dynamic_stretch_1.png' },
  'arm circles': { start: '/demos/dynamic_stretch_0.png', end: '/demos/dynamic_stretch_1.png' },
  'hip circle': { start: '/demos/dynamic_stretch_0.png', end: '/demos/dynamic_stretch_1.png' },
  'hip circles': { start: '/demos/dynamic_stretch_0.png', end: '/demos/dynamic_stretch_1.png' },
  'torso twist': { start: '/demos/dynamic_stretch_0.png', end: '/demos/dynamic_stretch_1.png' },
  'trunk rotation': { start: '/demos/dynamic_stretch_0.png', end: '/demos/dynamic_stretch_1.png' },
  'world greatest stretch': { start: '/demos/dynamic_stretch_0.png', end: '/demos/dynamic_stretch_1.png' },
  'bodyweight squat': { start: '/demos/squat_0.png', end: '/demos/squat_1.png' },
  'air squat': { start: '/demos/squat_0.png', end: '/demos/squat_1.png' },
  'walking lunge stretch': { start: '/demos/lunge_0.png', end: '/demos/lunge_1.png' },
  'inchworm': { start: '/demos/dynamic_stretch_0.png', end: '/demos/dynamic_stretch_1.png' },

  'foam roll': { start: '/demos/foam_rolling_0.png', end: '/demos/foam_rolling_1.png' },
  'foam rolling': { start: '/demos/foam_rolling_0.png', end: '/demos/foam_rolling_1.png' },
  'foam roller': { start: '/demos/foam_rolling_0.png', end: '/demos/foam_rolling_1.png' },
  'myofascial release': { start: '/demos/foam_rolling_0.png', end: '/demos/foam_rolling_1.png' },
  'static stretch': { start: '/demos/dynamic_stretch_0.png', end: '/demos/dynamic_stretch_1.png' },
  'static stretching': { start: '/demos/dynamic_stretch_0.png', end: '/demos/dynamic_stretch_1.png' },
  'cool down stretch': { start: '/demos/dynamic_stretch_0.png', end: '/demos/dynamic_stretch_1.png' },
  'cooldown stretch': { start: '/demos/dynamic_stretch_0.png', end: '/demos/dynamic_stretch_1.png' },
  'band pull-apart': { start: '/demos/rear_delt_fly_0.png', end: '/demos/rear_delt_fly_1.png' },
  'band pull apart': { start: '/demos/rear_delt_fly_0.png', end: '/demos/rear_delt_fly_1.png' },
  'resistance band pull-apart': { start: '/demos/rear_delt_fly_0.png', end: '/demos/rear_delt_fly_1.png' },

  // ─── MISC COMPOUND ─────────────────────────────────
  'cable woodchop': { start: '/demos/cable_woodchop_0.png', end: '/demos/cable_woodchop_1.png' },
  'wood chop': { start: '/demos/cable_woodchop_0.png', end: '/demos/cable_woodchop_1.png' },
  'cable chop': { start: '/demos/cable_woodchop_0.png', end: '/demos/cable_woodchop_1.png' },
  'landmine twist': { start: '/demos/cable_woodchop_0.png', end: '/demos/cable_woodchop_1.png' },
  'pallof press': { start: '/demos/cable_woodchop_0.png', end: '/demos/cable_woodchop_1.png' },
  'cable pallof press': { start: '/demos/cable_woodchop_0.png', end: '/demos/cable_woodchop_1.png' },
};

/**
 * Find custom anatomical demo images for an exercise name.
 * Returns image paths or null if no custom demo exists.
 */
export function findAnatomicalDemo(exerciseName: string): { image0: string; image1: string } | null {
  const name = exerciseName.toLowerCase()
    .replace(/\(.*?\)/g, '') // Remove parenthetical text e.g. "(Rope Attachment)"
    .replace(/[^a-z\s-]/g, '')
    .trim();

  // Exact match
  if (DEMO_MAP[name]) {
    return { image0: DEMO_MAP[name].start, image1: DEMO_MAP[name].end };
  }

  // Partial match — check if any key is contained in the name or vice versa
  for (const [key, demo] of Object.entries(DEMO_MAP)) {
    if (name.includes(key) || key.includes(name)) {
      return { image0: demo.start, image1: demo.end };
    }
  }

  return null;
}
