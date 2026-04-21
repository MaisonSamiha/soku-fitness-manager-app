// Build a slim exercise index for matching Gemini-generated exercise names
// to the free-exercise-db entries (which have images)

const fs = require('fs');
const path = require('path');

const raw = JSON.parse(fs.readFileSync(path.join(__dirname, 'exercises-raw.json'), 'utf8'));

// Build a compact index: { normalizedName -> { id, name, images } }
const index = {};
for (const ex of raw) {
  const key = ex.name.toLowerCase().replace(/[^a-z0-9]/g, '');
  index[key] = {
    id: ex.id,
    name: ex.name,
    images: ex.images, // e.g. ["Push_Up/0.jpg", "Push_Up/1.jpg"]
  };
  
  // Also index by words for fuzzy matching later
  // Store the key words for search
}

// Write out the compact index
fs.writeFileSync(
  path.join(__dirname, 'exercise-index.json'),
  JSON.stringify(index, null, 0)
);

console.log(`Indexed ${Object.keys(index).length} exercises`);
console.log('Sample:', JSON.stringify(Object.entries(index).slice(0, 3), null, 2));
