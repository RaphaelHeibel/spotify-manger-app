import { addMilliseconds, format } from "date-fns";
import { IUser } from "../interfaces/IUser";
import { IPlaylist } from "../interfaces/IPlaylist";
import { IArtist } from "../interfaces/IArtist";
import { IMusic } from "../interfaces/IMusic";

export function SpotifyUserToUser(user: SpotifyApi.CurrentUsersProfileResponse): IUser {
    return {
        id: user.id,
        name: user.display_name,
        imageUrl: user?.images.pop().url
    }

}


export function SpotifyPlaylistToPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): IPlaylist {
    return {
        id: playlist.id,
        name: playlist.name,
        imageUrl: playlist.images.pop().url
    }

}

export function SpotifyArtistToArtist(artist: SpotifyApi.ArtistObjectFull): IArtist {
    return {
        id: artist.id,
        name: artist.name,
        imageUrl: artist.images.sort((a, b) => a.width - b.width).pop().url
    }

}


export function SpotifyTrackToMusic(track: SpotifyApi.TrackObjectFull): IMusic {

    const msToMinutes = (ms: number) => {
        const data = addMilliseconds(new Date(0), ms)
        return format(data, 'mm:ss');
    }

    return {
        id: track.uri,
        title: track.name,
        artists: track.artists.map(artist => ({
            id: artist.id,
            name: artist.name
        })),
        album: {
            id: track.album.id,
            name: track.album.name,
            imageUrl: track.album.images.shift().url
        },
        duration: msToMinutes(track.duration_ms)
    }
}
