import { IMusic } from "./IMusic";

export class IArtist {
  id: string;
  name: string;
  imageUrl: string;
  musics?: IMusic[];
}