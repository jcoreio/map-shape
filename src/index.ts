export default function mapShape<
  O extends T | null | undefined,
  T extends { [K in keyof U]?: any },
  U
>(
  obj: O,
  mapper: {
    [K in keyof U]: K extends keyof T
      ? (value: T[K], key: K, obj: T) => U[K]
      : never
  }
): O extends null ? null : O extends undefined ? undefined : U {
  if (!obj) return obj as any
  const result: any = {}
  for (const key in mapper) {
    if (Object.hasOwnProperty.call(mapper, key)) {
      result[key] = mapper[key](obj[key], key, obj as T)
    }
  }
  return result
}
