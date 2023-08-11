function debounce<T extends Function>(cb: T, wait = 20) {
  let h:  NodeJS.Timeout | number = 0;
  const callable = (...args: any) => {
    clearTimeout(h)
    h = setTimeout(() => cb(...args), wait)
  }
  return <T>(<any>callable)
}
export default debounce
