export const recordToArray = <T = any>(rec: Record<string, T>): { key: string; value: T }[] => {
  return Object.keys(rec).map(key => ({ key, value: rec[key] }))
}

export const arrayToRecord = <T = any>(arr: { key: string; value: T }[]): Record<string, T> => {
  return arr.reduce((prev, current) => ({ ...prev, [current.key]: current.value }), {})
}
