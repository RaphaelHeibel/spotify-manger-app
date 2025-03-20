import { IArtist } from "../interfaces/IArtist";
import { IMusic } from "../interfaces/IMusic";
import { IPlaylist } from "../interfaces/IPlaylist";

export function newArtist(): IArtist {
    return {
        id: '',
        name: '',
        imageUrl: ''
    };
}

export function newMusic(): IMusic {
    return {
        id: '',
        title: '',
        artists: [],
        album: {
            id: '',
            name: '',
            imageUrl: ''
        },
        duration: ''
    };
}

export function newPlaylist(): IPlaylist {
    return {
        id: '',
        name: '',
        imageUrl: '',
        musics: []
    };
}