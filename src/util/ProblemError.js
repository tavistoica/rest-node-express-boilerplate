export default class ProblemError extends Error {
  constructor(status, type, detail, placement, ...params) {
    super(...params);
    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ProblemError);
    }
    this.status = status;
    this.type = type;
    this.detail = detail;
    this.placement = placement;
  }
}
