/**
 * Our own analytics contract. It belongs to no vendor.
 * The UI depends on this interface; vendors sit behind it as adapters.
 */
export type AnalyticsProps = Record<
    string,
    string | number | boolean | null | undefined
>

export interface Analytics {
    track(event: string, props?: AnalyticsProps): void
}
