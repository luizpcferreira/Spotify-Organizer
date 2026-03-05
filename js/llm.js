async function categorizeTracks(apiKey, playlists, tracks) {
  const playlistDescriptions = playlists.map((p, i) => {
    let desc = `${i + 1}. "${p.name}"`;
    if (p.vibe) desc += ` — Vibe: ${p.vibe}`;
    if (p.energy) desc += ` — Energy: ${p.energy}`;
    if (p.notes) desc += ` — Notes: ${p.notes}`;
    return desc;
  }).join('\n');

  const trackList = tracks.map(
    (t) => `${t.name} - ${t.artists.map(a => a.name).join(', ')} | ${t.uri}`
  ).join('\n');

  const prompt = `You are a music playlist organizer.

Below is a list of songs and user-created playlist descriptions.
For each song, decide which playlist fits best based on the vibe, energy, and description.
A song can go into more than one playlist, or none if it doesn't fit any.

Respond ONLY with valid JSON in this exact format (no markdown, no extra text):
{
  "playlists": [
    {
      "name": "playlist name",
      "tracks": [
        { "name": "song - artist", "uri": "spotify:track:xxx" }
      ]
    }
  ]
}

--- PLAYLISTS ---
${playlistDescriptions}

--- TRACKS (name - artist | uri) ---
${trackList}`;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error?.message || `Anthropic API error: ${res.status}`);
  }

  const data = await res.json();
  const text = data.content[0].text;

  // Parse JSON from response (handle possible markdown wrapping)
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Failed to parse LLM response as JSON');

  return JSON.parse(jsonMatch[0]);
}

export { categorizeTracks };
