export interface SaveAccessToken {
    accessToken: string,
    save: (accessToken: string) => Promise<void>
}
