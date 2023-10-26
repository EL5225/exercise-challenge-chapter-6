import jwt from "jsonwebtoken";
import { prisma } from "../../libs/prisma-client/index.js";
const { JWT_SECRET_KEY } = process.env;
export const authenticated = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      status: false,
      message: "Unauthorized",
      error: "Unauthorized",
    });
  }

  jwt.verify(authorization, JWT_SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized",
        error: "Unauthorized",
      });
    }

    req.user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        email: true,
        profile: true,
      },
    });
    next();
  });
};
