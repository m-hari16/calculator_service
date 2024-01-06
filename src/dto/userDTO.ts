export type registerDTO = {
  email: string
  password: string
  name: string
}

export type loginDTO = {
  email: string
  password: string
}

export type userDTO = {
  id: string
  name: string
  email: string
}

export type userWithEncryptedPasswordDTO = {
  id: string
  name: string
  email: string
  password: string
}

export type userWithAccessTokenDTO = {
  name: string
  accessToken: string
  expiredAt: string
  refreshToken: string
}
