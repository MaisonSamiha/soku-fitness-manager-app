import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { findExerciseImages } from '@/lib/exercise-matcher';
import { findAnatomicalDemo } from '@/lib/anatomical-demo-matcher';

const apiKey = process.env.GROQ_API_KEY || '';

export async function POST(request: Request) {
  try {
    if (!apiKey) {
      throw new Error('No Groq API key configured. Please set GROQ_API_KEY in .env.local.');
    }

    const groq = new Groq({ apiKey });

    const { muscleFocus, equipment, experienceLevel, duration, goal, notes, age, weight, daysPerWeek } = await request.json();

    const numDays = parseInt(daysPerWeek) || 3;

    // Calculate minimum main exercises based on session duration
    const durationMins = parseInt(duration) || 30;
    let minMainExercises = 5; // absolute minimum
    if (durationMins >= 45) minMainExercises = 6;
    if (durationMins >= 60) minMainExercises = 7;
    if (durationMins >= 90) minMainExercises = 8;

    // Random seed to force variety between generations
    const variationSeed = Math.random().toString(36).substring(2, 8).toUpperCase();
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const randomStartDay = dayNames[Math.floor(Math.random() * 3)]; // Start from Mon-Wed randomly

    const prompt = `You are an elite personal trainer and exercise science expert.
Create a highly customized gym workout routine for a full ${numDays}-day weekly program based on the following constraints:
- User Profile: ${age ? `Age ${age}` : 'Unspecified age'}, ${weight ? `Weight ${weight}` : 'Unspecified weight'}
- Frequency: ${numDays} Days per Week
- Target Muscle Group: ${muscleFocus} (Distribute this across the ${numDays} days logically)
- Available Equipment: ${equipment}
- Experience Level: ${experienceLevel}
- Duration Goal per session: ${duration}
- Training Goal: ${goal || 'General Fitness'}
${notes ? `- Special Instructions / Preferences: ${notes}` : ''}
- Variation Seed: ${variationSeed} (Use this to select different exercise variations than usual. Be creative with exercise selection — avoid repeating the same cookie-cutter exercises every time.)

WEEKLY BALANCE RULES (very important):
- If the target is "Full Body" or covers multiple muscle groups, create a BALANCED weekly split that ensures ALL major muscle groups (Chest, Back, Shoulders, Legs, Arms, Core) are hit proportionally across the ${numDays} days.
- Each day should have a distinct focus or emphasis (e.g. Day 1: Upper Push + Core, Day 2: Lower Body + Posterior Chain, Day 3: Upper Pull + Arms). Do NOT repeat the same generic "Full Body" routine every single day.
- Distribute volume intelligently: larger muscle groups (Back, Legs, Chest) get more total sets across the week than smaller ones (Biceps, Rear Delts).
- Vary exercise selection between days. For example, if Day 1 uses Barbell Bench Press for chest, Day 3 should use a different chest movement like Dumbbell Incline Press or Cable Flyes.
- Starting day suggestion: ${randomStartDay}

CRITICAL RULES:
- Every exercise MUST be performable SOLO without a spotter or training partner.
- Do NOT include exercises that require another person to assist.
- All exercises must be safe to perform alone in a gym.
- You MUST generate EXACTLY ${numDays} days. Not fewer, not more. The user specifically requested ${numDays} days. If you return fewer than ${numDays} days, your response is INVALID.

Your response MUST be a valid JSON object containing exactly one root key called "program".
The "program" key must be an array of EXACTLY ${numDays} Day objects. Double check: the array length must equal ${numDays}.

For each Day, provide:
1. "dayName": The title of the day (e.g. "Day 1: Upper Push & Core", "Day 2: Lower Body Power").
2. "focus": A short description of the day's focus (e.g. "Focuses on Chest, Shoulders, Triceps, and Core stability").
3. "exercises": An array of ALL exercises for that day, including warmup, main workout, and cardio/cooldown — in that order.

EXERCISE COUNT RULES (MANDATORY — DO NOT IGNORE):
- Each day MUST have AT LEAST ${minMainExercises} MAIN exercises (phase="main"). This is a hard minimum. Do NOT provide fewer.
- For a ${durationMins}-minute session, ${minMainExercises} main exercises is the absolute minimum. More is acceptable.
- Plus exactly 1 warmup exercise and exactly 1 finishing cardio exercise.
- Total exercises per day should be at least ${minMainExercises + 2} (1 warmup + ${minMainExercises} main + 1 cardio).

STRUCTURE EACH DAY AS FOLLOWS:
- Start with exactly 1 WARMUP exercise (e.g. dynamic stretch, foam rolling, or light mobility — relevant to that day's focus muscles).
- Then provide AT LEAST ${minMainExercises} MAIN workout exercises (the core strength/resistance training). This is a comprehensive routine — do NOT cut it short.
- End with exactly 1 FINISHING CARDIO or COOLDOWN exercise (e.g. treadmill sprint, rowing machine, jump rope, or static stretch).

For each exercise, provide:
1. "name": The exact, standard name of the exercise (e.g. "Barbell Bench Press").
2. "phase": One of "warmup", "main", or "cardio" — indicating which section this exercise belongs to.
3. "sets": The number of sets (as an integer, e.g. 3).
4. "reps": The rep range (e.g. "8-12"). For timed exercises use seconds like "30s" or "5 min".
5. "rest": Rest time between sets (e.g. "60s"). For warmup/cardio this can be "0s" or "30s".
6. "tips": A short, biomechanical form cue or pro tip (max 2 sentences).
7. "targetMuscles": An array of primary muscles worked (e.g. ["Chest", "Triceps"]). For cardio use ["Cardiovascular"].
8. "alternatives": An array of 2-3 alternative exercises that target the same muscles and deliver similar results. Each alternative should have a "name" and a brief "reason". Alternatives must also be solo-performable.

Ensure the routine strictly uses only the equipment provided. 

CRITICAL: OUTPUT JSON ONLY. DO NOT output any markdown blocks, conversational text, or explanations. Only the raw JSON object. Use the following exact JSON structure format:
{
  "program": [
    {
       "dayName": "...",
       "focus": "...",
       "exercises": [
         {
           "name": "...",
           "phase": "...",
           "sets": 3,
           "reps": "...",
           "rest": "...",
           "tips": "...",
           "targetMuscles": ["..."],
           "alternatives": [ { "name": "...", "reason": "..." } ]
         }
       ]
    }
  ]
}
`;

    // We use llama-3.3-70b-versatile because it is Groq's most capable general logic and JSON output model
    let rawDays: any[] = [];
    
    for (let attempt = 0; attempt < 3; attempt++) {
      const completion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.3-70b-versatile",
        temperature: 0.5,
        max_tokens: 8000,
        response_format: { type: "json_object" },
      });

      const text = completion.choices[0]?.message?.content;
      if (!text) throw new Error('Failed to generate response.');

      const generatedJson = JSON.parse(text);
      rawDays = generatedJson.program || [];

      if (rawDays.length >= numDays) break; // ✅ correct count
      
      console.warn(`[Soku] AI returned ${rawDays.length} days instead of ${numDays}. Retrying...`);
    }
    
    // Attach exercise images (prefer anatomical demos, fallback to free-exercise-db photos)
    const program = rawDays.map((day: any) => {
      const exercises = day.exercises.map((ex: any) => {
        const demoImages = findAnatomicalDemo(ex.name, ex.targetMuscles) || findExerciseImages(ex.name);
        // Clean up formatting issues sometimes output by Llama 3
        const phaseRaw = (ex.phase || 'main').toLowerCase();
        let phase = 'main';
        if (phaseRaw.includes('warm')) phase = 'warmup';
        if (phaseRaw.includes('cardio') || phaseRaw.includes('cool')) phase = 'cardio';

        const alternatives = (ex.alternatives || []).map((alt: any) => ({
          ...alt,
          demoImages: findAnatomicalDemo(alt.name, ex.targetMuscles) || findExerciseImages(alt.name),
        }));
        return {
          ...ex,
          phase,
          demoImages,
          alternatives,
        };
      });

      return {
        ...day,
        exercises,
      };
    });

    return NextResponse.json({ program });
    
  } catch (error: any) {
    console.error('Groq API Error:', error);
    
    const rawMsg = error.message || '';
    let friendlyMessage = 'Something went wrong generating your workout. Please try again.';
    
    if (rawMsg.includes('429') || rawMsg.includes('rate limit')) {
      friendlyMessage = 'API rate limit reached. Please wait a minute before generating another workout.';
    } else if (rawMsg.includes('API key') || rawMsg.includes('401')) {
      friendlyMessage = 'Invalid Groq API key. Please check your GROQ_API_KEY in .env.local.';
    }
    
    return NextResponse.json(
      { error: friendlyMessage },
      { status: 500 }
    );
  }
}
