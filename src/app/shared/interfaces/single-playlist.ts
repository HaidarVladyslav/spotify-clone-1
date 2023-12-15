import { Image } from "./image"
import { Response } from "./response"
import { Track } from "./track"

export interface SinglePlaylist {
  collaborative: boolean,
  external_urls: {
    spotify: string
  },
  followers: {
    href: string | null,
    total: number
  },
  href: string,
  id: string,
  images: Image[],
  primary_color: string | null,
  name: string,
  description: string,
  type: string,
  uri: string,
  owner: {
    href: string,
    id: string,
    type: string,
    uri: string,
    display_name: string,
    external_urls: {
      spotify: string,
    }
  },
  public: boolean,
  snapshot_id: string,
  tracks: Response<Track>
}