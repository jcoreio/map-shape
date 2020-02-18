export default function mapShape<U extends Record<any, (...args: any) => any>>(
  mapper: U
): <T extends { [K in keyof U]?: any }>(
  obj: {
    [K in keyof T]?: K extends keyof U ? Parameters<U[K]>[0] : any
  }
) => { [K in keyof U]: ReturnType<U[K]> } {
  return (obj: any): { [K in keyof U]: ReturnType<U[K]> } => {
    const result: any = {}
    for (const key in mapper) {
      if (Object.hasOwnProperty.call(mapper, key)) {
        result[key] = mapper[key](obj[key])
      }
    }
    return result
  }
}
