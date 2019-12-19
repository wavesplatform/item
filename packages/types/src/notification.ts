export type NotificationType = 'default' | 'info' | 'error' | 'warn' | 'success'

export interface INotification {
  type?: NotificationType
  icon?: string | null
  content?: string
}