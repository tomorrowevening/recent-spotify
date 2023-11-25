import { useEffect, useState } from 'react';
import { authenticateSpotify, getRecentlyPlayedTracks } from './spotify';
import Track from './Track';

export default function App() {
  const [token, setToken] = useState<string | null>(null);
  const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState<any[]>([]);

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substr(1));
    const accessToken = hashParams.get('access_token');

    if (accessToken) {
      setToken(accessToken);
    }
  }, []);

  const handleLogin = () => {
    authenticateSpotify();
  };

  const handleFetchTracks = async () => {
    try {
      const tracks = await getRecentlyPlayedTracks(token!);
      setRecentlyPlayedTracks(tracks);
    } catch (error) {
      // @ts-ignore
      console.error(error.message);
    }
  };

  const elements: any[] = [];
  if (token) {
    recentlyPlayedTracks.forEach((value: any, trackIndex: number) => {
      elements.push(<Track key={`track_${trackIndex}`} data={value} token={token} />);
    });
  }

  return (
    <div>
      <h1>Spotify Recent Tracks</h1>
      {!token ? (
        <button onClick={handleLogin}>Login with Spotify</button>
      ) : (
        <>
          <button onClick={handleFetchTracks}>Fetch Recently Played Tracks</button>
          <ul>
            {elements}
          </ul>
        </>
      )}
    </div>
  );
};
