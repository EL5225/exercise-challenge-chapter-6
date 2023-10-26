import { prisma } from "../../libs/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { JWT_SECRET_KEY } = process.env;

export const register = async (req, res, next) => {
  try {
    const { first_name, last_name, email, password, confirm_password } =
      req.body;

    const userEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userEmail) {
      return res.status(400).json({
        status: false,
        message: "Bad Request",
        error: "Email already exists",
      });
    }

    if (password !== confirm_password) {
      return res.status(400).json({
        status: false,
        message: "Bad Request",
        error: "Password does not match",
      });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: encryptedPassword,
        profile: {
          create: {
            first_name,
            last_name,
          },
        },
      },
      select: {
        id: true,
        email: true,
        profile: true,
      },
    });

    res.status(201).json({
      status: true,
      message: "Register Successfull",
      data: {
        id: user.id,
        email: user.email,
        first_name: user.profile.first_name,
        last_name: user.profile.last_name,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        profile: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "Bad Request",
        error: "Invalid Email or Password",
      });
    }

    if (email !== user.email) {
      return res.status(400).json({
        status: false,
        message: "Bad Request",
        error: "Invalid Email or Password",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        status: false,
        message: "Bad Request",
        error: "Invalid Email or Password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      JWT_SECRET_KEY
    );

    res.status(200).json({
      status: true,
      message: "Login Successfull",
      data: {
        user: {
          id: user.id,
          email: user.email,
          first_name: user.profile.first_name,
          last_name: user.profile.last_name,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const authenticatedUser = (req, res, next) => {
  try {
    const user = req.user;

    res.status(200).json({
      status: true,
      message: "Authenticated",
      data: {
        id: user.id,
        first_name: user.profile.first_name,
        last_name: user.profile.last_name,
        email: user.email,
        birth_date: user.profile.birth_date,
        profile_picture: user.profile.profile_picture,
      },
    });
  } catch (error) {
    next(error);
  }
};
