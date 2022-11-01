export const createStorage = (storage = window.sessionStorage, prefixKey = 'SYS') => {
  class Storage {
    expires
    prefixKey
    instance = null
    constructor() {
      this.expires = 1000
      this.prefixKey = prefixKey
      this.instance = storage
    }

    getKey(key) {
      return `${this.prefixKey}-${key}`.toUpperCase()
    }

    set(key, value, expires) {
      const stringData = JSON.stringify({
        value,
        expires: expires !== null ? new Date().getTime() + expires * 1000 : null
      })

      this.instance.setItem(this.getKey(key), stringData)
    }

    get(key, def = null) {
      try {
        const item = this.instance.getItem(this.getKey(key))

        if (item) {
          const data = JSON.parse(item)
          const { value, expires } = data

          if (expires === null || expires >= Date.now()) {
            return value
          }

          this.remove(key)
        }
      } catch (error) {
        console.log(error, 'Get Storage Error')
        return def
      }
    }

    remove(key) {
      this.instance.removeItem(this.getKey(key))
    }

    clear() {
      this.instance.clear()
    }
  }

  return new Storage()
}

export const storage = createStorage()
