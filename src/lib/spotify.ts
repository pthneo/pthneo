"use server";

/**
 * The track type used by the Spotify API.
 */
interface SpotifyTrack {
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string; height: number; width: number }>;
  };
  external_urls: {
    spotify: string;
  };
  duration_ms: number;
}

/**
 * The response from the Spotify API.
 */
interface SpotifyResponse {
  is_playing: boolean;
  item: SpotifyTrack | null;
  progress_ms: number;
}

/**
 * Get the access token for the Spotify API.
 * 
 * @returns The access token or null if there is an error.
 */
async function getAccessToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken
      })
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Error getting Spotify access token:", error);
    return null;
  }
}

/**
 * Get the currently playing track from the Spotify API.
 * 
 * @returns The currently playing track or null if there is an error.
 */
async function getCurrentlyPlaying(): Promise<SpotifyResponse | null> {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    return null;
  }

  try {
    const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      cache: "no-store"
    });

    if (response.status === 204 || response.status === 404) {
      return null;
    }

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching currently playing track:", error);
    return null;
  }
}

/**
 * Get the currently playing track from the Spotify API and typecasts.
 * 
 * @returns The currently playing track or null if there is an error.
 */
export async function getSpotifyNowPlaying(): Promise<SpotifyData> {
  try {
    const data = await getCurrentlyPlaying();

    if (!data || !data.item) {
      return { isPlaying: false };
    }

    return {
      isPlaying: data.is_playing,
      track: {
        name: data.item.name,
        artists: data.item.artists.map((artist) => artist.name).join(", "),
        album: data.item.album.name,
        albumArt: data.item.album.images[0]?.url || null,
        duration: data.item.duration_ms,
        progress: data.progress_ms
      }
    };
  } catch (error) {
    console.error("Spotify API error:", error);
    return { isPlaying: false };
  }
}

export interface SpotifyData {
  isPlaying: boolean;
  track?: {
    name: string;
    artists: string;
    album: string;
    albumArt: string | null;
    duration: number;
    progress: number;
  }
}