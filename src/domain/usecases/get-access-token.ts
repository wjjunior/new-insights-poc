export interface GetAccessToken {
    get: (key: string, value?: string) => Promise<string | null | void>
}
