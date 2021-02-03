export interface AccessToken {
    save: (accessToken: string) => Promise<void>
    get: () => Promise<string | null | void>
}
