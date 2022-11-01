export interface IArtistObject {
  id?: number;
  name: string;
  artist: string;
  _id?: string;
  img?: string;
  uri: string;
  wins: number | string;
  defeats?: string;
  games?: number | string;
  active: boolean;
}

export interface IArtistArray extends Array<IArtistObject> {}

export interface handleInput {
  target: { value: string; name: string };
}
