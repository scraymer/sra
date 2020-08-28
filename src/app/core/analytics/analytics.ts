export interface AnalyticOptions {
    enabled: boolean;
    mixpanel: AnalyticMixpanelOptions;
}

export interface AnalyticMixpanelOptions {
    token: string;
}
