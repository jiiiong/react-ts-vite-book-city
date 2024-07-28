const storage = {
  get(key: string): unknown | null {
    const json = localStorage.getItem(key)
    if (json) {
      return JSON.parse(json)
    }

    return null
  },

  set(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value))
  },

  remove(key: string) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear()
  }
}

export default storage
