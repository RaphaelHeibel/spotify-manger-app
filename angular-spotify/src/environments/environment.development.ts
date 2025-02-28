export const environment = {
    production: false,
    apiUrl: 'http://localhost:4200'
};

export const SpotifyConfiguration = {
    clientId: '0a64bd4d77224a01beb9450130a4f5c5',
    authEndpoint: 'https://accounts.spotify.com/authorize',
    redirectUrl: 'http://localhost:4200/login/',
    scopes:[
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-read-playback-state",
        "user-top-read",
        "user-modify-playback-state",
        "user-library-read",
        "playlist-read-private",
        "playlist-read-collaborative"
    ]
}
