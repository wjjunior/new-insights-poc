export interface AccessToken {
    save: (accessToken: string) => Promise<void>
    get: (key: string, value?: string) => Promise<string | null | void>
}
