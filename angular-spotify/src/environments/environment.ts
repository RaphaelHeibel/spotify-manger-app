export const environment = {
    pudction: true,
    apiUrl: 'http://localhost:4200'
};

export const SpotifyConfiguration = {
    clientId: 'd6435bd3e8e64a42bd8efd4b5663b927',
    authEndpoint: 'https://accounts.spotify.com/authorize',
    redirectUrl: 'http://localhost:4200/login/',
    scopes:[
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-read-playback-state",
        "user-top-read",
        "user-read-private",
        "user-read-email",
        "user-modify-playback-state",
        "user-library-read",
        "playlist-read-private",
        "playlist-read-collaborative"
    ]
}

