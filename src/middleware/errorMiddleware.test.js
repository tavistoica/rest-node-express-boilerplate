import { HttpError } from "express-openapi-validator/dist/framework/types";
import { SWAGGER_ERROR } from "../util/errors";
import { MESSAGE_TYPES } from "../util/constants";
import errorMiddleware from "./errorMiddleware";
import ProblemError from "../util/ProblemError";

let res;
const req = {};
const next = jest.fn();

describe("errorMiddleware", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      locals: {
        userId: "12345678"
      }
    };
  });

  it("logs and responds Swagger errors", () => {
    const err = new ProblemError(
      MESSAGE_TYPES.ERROR,
      400,
      SWAGGER_ERROR.TYPE,
      "swagger title"
    );
    errorMiddleware(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 400,
      type: "error",
      short: "swagger-error",
      detail: "swagger title",
      placement: "global"
    });
  });

  it("logs and responds Unexpected errors", () => {
    const err = {
      status: 500,
      type: "error",
      short: "unexpected-error",
      detail: "Something unexpected happened: {}",
      placement: "global"
    };
    errorMiddleware(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(err);
  });
});
