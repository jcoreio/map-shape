export default function mapShape<T extends { [K in keyof U]?: any }, U>(
  obj: T,
  mapper: {
    [K in keyof U]: K extends keyof T
      ? (value: T[K], key: K, obj: T) => U[K]
      : never
  }
): U {
  const result: any = {}
  for (const key in mapper) {
    if (Object.hasOwnProperty.call(mapper, key)) {
      result[key] = mapper[key](obj[key], key, obj)
    }
  }
  return result
}
