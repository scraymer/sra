export interface AnalyticOptions {
    enabled: boolean;
    mixpanel: AnalyticMixpanelOptions;
}

export interface AnalyticMixpanelOptions {
    token: string;
}

export interface AnalyticEvent {
    action: string;
    properties: any;
}
