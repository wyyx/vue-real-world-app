const ID_TOKEN_KEY = 'id_token'

export const jwtService = {
  getToken() {
    return window.localStorage.getItem(ID_TOKEN_KEY)
  },
  saveToken(token: string) {
    window.localStorage.setItem(ID_TOKEN_KEY, token)
  },
  destroyToken() {
    window.localStorage.removeItem(ID_TOKEN_KEY)
  }
}
