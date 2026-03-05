function createSpotifyClient(token) {
  async function fetchWebApi(endpoint, method, body) {
    const options = {
      headers: { Authorization: `Bearer ${token}` },
      method,
    };
    if (body) {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(body);
    }
    const res = await fetch(`https://api.spotify.com/${endpoint}`, options);
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.error?.message || `Spotify API error: ${res.status}`);
    }
    return res.json();
  }

  return {
    async getTopTracks() {
      const data = await fetchWebApi('v1/me/top/tracks?time_range=long_term&limit=50', 'GET');
      return data.items;
    },

    async getUserId() {
      const data = await fetchWebApi('v1/me', 'GET');
      return data.id;
    },

    async createPlaylist(userId, name, description) {
      return fetchWebApi(`v1/users/${userId}/playlists`, 'POST', {
        name,
        description,
        public: false,
      });
    },

    async addTracksToPlaylist(playlistId, uris) {
      return fetchWebApi(`v1/playlists/${playlistId}/tracks`, 'POST', { uris });
    },
  };
}

export { createSpotifyClient };
