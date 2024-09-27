import { NextFunction, Request, Response } from "express";

export function originHandler(req: Request, res: Response, next: NextFunction) {
  const ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost",
  ];

  const ALLOWED_USER_AGENTS = [
    "SendGrid Event API",
    // ... cualquier otro user agent que quieras permitir en el futuro
  ];

  if (process.env.NODE_ENV === "production") {
    const origin = req.headers.origin as string;
    const userAgent = req.headers["user-agent"] as string;

    if (!origin && !userAgent) {
      respond(res, 202, "Origin is not defined");
      return;
    }

    const isOriginAllowed =
      origin && ALLOWED_ORIGINS.some((o) => origin.includes(o));
    const isUserAgentAllowed =
      userAgent && ALLOWED_USER_AGENTS.some((ua) => userAgent.includes(ua));

    if (isOriginAllowed || isUserAgentAllowed) {
      console.log(`${origin || userAgent} is allowed`);
      next();
    } else {
      console.log(`${origin || userAgent} is not allowed`);
      respond(res, 202, "Origin is not allowed");
    }
  } else {
    next();
  }
}

function respond(res: Response, status: number, message: string) {
  res.status(status);
  res.json({ status, message });
}
