import { TrackItem } from "./track-item"

export interface Track {
  added_at: string | Date,
  primary_color: string | null,
  video_thumbnail: {
    url: null | string
  },
  is_local: boolean,
  added_by: {
    external_urls: {
      spotify: string
    },
    id: string,
    type: string,
    uri: string,
    href: string
  },
  track: TrackItem
}