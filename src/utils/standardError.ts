export class StandardError extends Error {
  constructor(
    public httpStatus: number,
    public message: string,
  ) {
    super()
  }
}
