'use client';

interface MuscleMapProps {
  targetMuscles: string[];
}

// Map muscle names to image files and display labels
const MUSCLE_IMAGE_MAP: Record<string, { image: string; label: string }> = {
  'chest': { image: '/muscles/chest.png', label: 'Chest' },
  'pectorals': { image: '/muscles/chest.png', label: 'Chest' },
  'pecs': { image: '/muscles/chest.png', label: 'Chest' },
  'upper chest': { image: '/muscles/chest.png', label: 'Chest' },
  'lower chest': { image: '/muscles/chest.png', label: 'Chest' },
  'abs': { image: '/muscles/abs.png', label: 'Abs' },
  'abdominals': { image: '/muscles/abs.png', label: 'Abs' },
  'core': { image: '/muscles/core.png', label: 'Core' },
  'obliques': { image: '/muscles/core.png', label: 'Core' },
  'quadriceps': { image: '/muscles/quads.png', label: 'Quads' },
  'quads': { image: '/muscles/quads.png', label: 'Quads' },
  'biceps': { image: '/muscles/biceps.png', label: 'Biceps' },
  'biceps brachii': { image: '/muscles/biceps.png', label: 'Biceps' },
  'forearms': { image: '/muscles/forearms.png', label: 'Forearms' },
  'shoulders': { image: '/muscles/shoulders.png', label: 'Shoulders' },
  'deltoids': { image: '/muscles/shoulders.png', label: 'Shoulders' },
  'anterior deltoids': { image: '/muscles/shoulders.png', label: 'Shoulders' },
  'anterior deltoid': { image: '/muscles/shoulders.png', label: 'Shoulders' },
  'front deltoids': { image: '/muscles/shoulders.png', label: 'Shoulders' },
  'lateral deltoids': { image: '/muscles/shoulders.png', label: 'Shoulders' },
  'rear deltoids': { image: '/muscles/shoulders.png', label: 'Shoulders' },
  'posterior deltoids': { image: '/muscles/shoulders.png', label: 'Shoulders' },
  'traps': { image: '/muscles/traps.png', label: 'Traps' },
  'trapezius': { image: '/muscles/traps.png', label: 'Traps' },
  'trapezius (lower)': { image: '/muscles/traps.png', label: 'Traps' },
  'trapezius (mid)': { image: '/muscles/traps.png', label: 'Traps' },
  'lats': { image: '/muscles/lats.png', label: 'Lats' },
  'latissimus dorsi': { image: '/muscles/lats.png', label: 'Lats' },
  'triceps': { image: '/muscles/triceps.png', label: 'Triceps' },
  'hamstrings': { image: '/muscles/hamstrings.png', label: 'Hamstrings' },
  'glutes': { image: '/muscles/glutes.png', label: 'Glutes' },
  'gluteus maximus': { image: '/muscles/glutes.png', label: 'Glutes' },
  'calves': { image: '/muscles/calves.png', label: 'Calves' },
  'lower back': { image: '/muscles/lower_back.png', label: 'Lower Back' },
  'erector spinae': { image: '/muscles/lower_back.png', label: 'Lower Back' },
  'rhomboids': { image: '/muscles/lats.png', label: 'Upper Back' },
  'upper back': { image: '/muscles/traps.png', label: 'Upper Back' },
  'middle back': { image: '/muscles/lats.png', label: 'Mid Back' },
};

function getMuscleImages(targetMuscles: string[]): { image: string; label: string }[] {
  const seen = new Set<string>();
  const results: { image: string; label: string }[] = [];

  for (const muscle of targetMuscles) {
    const key = muscle.toLowerCase().replace(/[()]/g, '').trim();
    
    // Try exact match
    let entry = MUSCLE_IMAGE_MAP[key];
    
    // Try partial match
    if (!entry) {
      for (const [alias, data] of Object.entries(MUSCLE_IMAGE_MAP)) {
        if (key.includes(alias) || alias.includes(key)) {
          entry = data;
          break;
        }
      }
    }

    if (entry && !seen.has(entry.image)) {
      seen.add(entry.image);
      results.push(entry);
    }
  }

  return results;
}

export default function MuscleMap({ targetMuscles }: MuscleMapProps) {
  const muscles = getMuscleImages(targetMuscles);

  if (muscles.length === 0) return null;

  return (
    <div className="muscle-cards">
      {muscles.map((m, i) => (
        <div key={i} className="muscle-card">
          <img 
            src={m.image} 
            alt={`${m.label} muscles highlighted`}
            className="muscle-card-img"
          />
          <span className="muscle-card-label">{m.label}</span>
        </div>
      ))}
    </div>
  );
}
