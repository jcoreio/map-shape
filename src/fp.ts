const mapShape = <U extends Record<any, (...args: any) => any>>(mapper: U) => <
  T extends { [K in keyof U]?: any },
  O extends
    | {
        [K in keyof T]?: K extends keyof U ? Parameters<U[K]>[0] : any
      }
    | null
    | undefined
>(
  obj: O
): O extends null
  ? null
  : O extends undefined
  ? undefined
  : { [K in keyof U]: ReturnType<U[K]> } => {
  if (!obj) return obj as any
  const result: any = {}
  for (const key in mapper) {
    if (Object.hasOwnProperty.call(mapper, key)) {
      result[key] = mapper[key](obj[key])
    }
  }
  return result
}

export default mapShape
