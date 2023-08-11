const getFormValue = <T>(fields: string[]): T => {
  return fields.reduce<T>((rec, key) => {
    const inputElement = document.getElementById(key) as HTMLInputElement
    const value = inputElement.value.trim()
    if (value) {
      return { ...rec, [key]: value }
    }
    return rec
  }, {} as T)
}
export default getFormValue;