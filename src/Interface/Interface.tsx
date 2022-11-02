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

export interface IAllMatches {
  _id: string;
  winner: IArtistObject;
  loser: IArtistObject;
}
export interface IHandleInput {
  target: { value: string; name: string };
}

// export interface Start {
//   state: StateStart;
// }
export interface IProps {
  // start: boolean;
  setToggleInputField: (active: boolean) => void;
}
