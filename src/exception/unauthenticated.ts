class unauthenticated extends Error {
  constructor(message: string = "Unauthenticated") {
    super(message)
    this.name = 'unauthenticated'
  }
}

export default unauthenticated