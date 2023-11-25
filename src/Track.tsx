import { useState } from 'react';
import { getTrackFeatures } from './spotify';

export interface TrackProps {
  data: any
  token: string
}

function formatMilliseconds(milliseconds: number): string {
  // Convert total milliseconds to seconds
  let totalSeconds = Math.floor(milliseconds / 1000);

  // Calculate minutes and remaining seconds
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  // Format the result as MM:SS
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export default function Track(props: TrackProps) {
  const [loaded, setLoaded] = useState(false);
  const [track] = useState({
    danceability: 0,
    energy: 0,
    key: 0,
    loudness: 0,
    mode: 0,
    speechiness: 0,
    acousticness: 0,
    instrumentalness: 0,
    liveness: 0,
    valence: 0,
    tempo: 0,
    type: "",
    id: "",
    uri: "",
    track_href: "",
    analysis_url: "",
    duration_ms: 0,
    time_signature: 0
  })

  const trackBtn = (
    <button
      disabled={loaded}
      onClick={() => {
        getTrackFeatures(props.token, props.data.track.id).then((data: any) => {
          for (let i in data) {
            try {
              // @ts-ignore
              track[i] = data[i];
            } catch {}
          }
          setLoaded(true);
        })
      }}
    >
      {props.data.track.name}
    </button>
  )

  // Artists
  const trackArtists: any[] = [];
  const totalArtists = props.data.track.artists.length
  props.data.track.artists.forEach((artist: any, index: number) => {
    trackArtists.push(<a key={index} href={artist.external_urls.spotify} target='_blank'>{artist.name}</a>)
    if (index < totalArtists - 1) trackArtists.push(', ');
  });

  return (
    <li>
      {trackBtn} - {trackArtists}
      {loaded && (
        <ul className='features'>
          <li>Danceability: {track.danceability}</li>
          <li>Energy: {track.energy}</li>
          <li>Key: {track.key}</li>
          <li>Loudness: {track.loudness}</li>
          <li>Mode: {track.mode}</li>
          <li>Speechiness: {track.speechiness}</li>
          <li>Acousticness: {track.acousticness}</li>
          <li>Instrumentalness: {track.instrumentalness}</li>
          <li>Liveness: {track.liveness}</li>
          <li>Valence: {track.valence}</li>
          <li>Tempo: {track.tempo}</li>
          <li>Duration: {formatMilliseconds(track.duration_ms)}</li>
          <li>Time Signature: {track.time_signature}</li>
        </ul>
      )}
    </li>
  );
}
