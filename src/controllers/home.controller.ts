import { Request, Response } from "express";

export async function getHome(request: Request, response: Response) {
  response.status(200).send({ status: 200, message: "Home route" });
}
