export const ALERT_TYPES = ['primary', 'success', 'warning', 'danger', 'info', 'gray'] as const;

export type AlertType = (typeof ALERT_TYPES)[number];
