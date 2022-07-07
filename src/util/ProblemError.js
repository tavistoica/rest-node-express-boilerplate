export default class ProblemError extends Error {
  constructor(type, status, short, detail, placement, ...params) {
    super(...params);
    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ProblemError);
    }
    this.status = status;
    this.short = short;
    this.detail = detail;
    this.placement = placement;
    this.type = type;
  }
}
