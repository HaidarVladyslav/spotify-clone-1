import { TrackItem } from "./track-item";

export interface CurrentTrack {
  actions: {
    disallows: {
      pausing: boolean,
    }
  },
  context: null | any;
  currently_playing_type: string;
  is_playing: boolean;
  item: TrackItem;
  progress_ms: number;
  timestamp: number;
}