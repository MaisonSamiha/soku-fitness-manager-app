import exerciseIndex from '@/data/exercise-index.json';

const IMAGE_BASE = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/';

type ExerciseEntry = {
  id: string;
  name: string;
  images: string[];
};

const index = exerciseIndex as Record<string, ExerciseEntry>;

// Pre-compute all keys and their word sets for fuzzy matching
const allKeys = Object.keys(index);
const keyWordSets = new Map<string, Set<string>>();
for (const key of allKeys) {
  keyWordSets.set(key, new Set(key.match(/[a-z]+/g) || []));
}

function normalize(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Find the best matching exercise from the database.
 * Returns image URLs (start + end position) or null if no match.
 */
export function findExerciseImages(exerciseName: string): { image0: string; image1: string } | null {
  const normalizedName = normalize(exerciseName);

  // 1. Exact match
  if (index[normalizedName]) {
    const entry = index[normalizedName];
    return {
      image0: IMAGE_BASE + entry.images[0],
      image1: IMAGE_BASE + (entry.images[1] || entry.images[0]),
    };
  }

  // 2. Substring match — check if any key contains our name or vice versa
  for (const key of allKeys) {
    if (key.includes(normalizedName) || normalizedName.includes(key)) {
      const entry = index[key];
      return {
        image0: IMAGE_BASE + entry.images[0],
        image1: IMAGE_BASE + (entry.images[1] || entry.images[0]),
      };
    }
  }

  // 3. Word-overlap fuzzy match — score by shared words
  const inputWords = new Set(normalizedName.match(/[a-z]+/g) || []);
  // Filter out very short words that are not meaningful
  const meaningfulInputWords = new Set([...inputWords].filter(w => w.length > 2));
  
  if (meaningfulInputWords.size === 0) return null;

  let bestKey = '';
  let bestScore = 0;

  for (const key of allKeys) {
    const entryWords = keyWordSets.get(key)!;
    let overlap = 0;
    for (const word of meaningfulInputWords) {
      for (const eWord of entryWords) {
        if (eWord.includes(word) || word.includes(eWord)) {
          overlap++;
          break;
        }
      }
    }
    const score = overlap / Math.max(meaningfulInputWords.size, entryWords.size);
    if (score > bestScore) {
      bestScore = score;
      bestKey = key;
    }
  }

  // Only accept if we match at least 40% of meaningful words
  if (bestScore >= 0.4 && bestKey) {
    const entry = index[bestKey];
    return {
      image0: IMAGE_BASE + entry.images[0],
      image1: IMAGE_BASE + (entry.images[1] || entry.images[0]),
    };
  }

  return null;
}
