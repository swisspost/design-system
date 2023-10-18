export const ALERT_TYPES = ['primary', 'success', 'danger', 'warning', 'info', 'gray'] as const;

export type AlertType = typeof ALERT_TYPES[number];
