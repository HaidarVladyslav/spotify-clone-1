import { Artist } from "./artist";
import { Image } from "./image";

export interface TrackItem {
  preview_url: null | string,
  available_markets: string[],
  explicit: boolean,
  type: string,
  episode: boolean,
  track: boolean,
  album: {
    available_markets: string[],
    type: string,
    album_type: string,
    href: string,
    id: string,
    images: Image[],
    name: string,
    release_date: Date | string,
    release_date_precision: string,
    uri: string,
    artists: Artist[],
    external_urls: {
      spotify: string
    },
    total_tracks: number
  },
  artists: Artist[],
  disc_number: number,
  track_number: number,
  duration_ms: number,
  external_ids: {
    isrc: string
  },
  external_urls: {
    spotify: string
  },
  href: string,
  id: string,
  name: string,
  popularity: number,
  uri: string,
  is_local: boolean
}