import { imageKit, prisma } from "../../libs/index.js";
import path from "path";

export const updateProfile = async (req, res, next) => {
  try {
    const user = req.user;
    const { first_name, last_name, birth_date } = req.body;
    const profile_picture = req.file.buffer.toString("base64");

    const { url } = await imageKit.upload({
      fileName: Date.now() + path.extname(req.file.originalname),
      file: profile_picture,
    });

    const updatedUser = await prisma.profile.update({
      where: {
        user_id: user.id,
      },
      data: {
        first_name,
        last_name,
        birth_date,
        profile_picture: url,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        birth_date: true,
        profile_picture: true,
      },
    });

    res.status(200).json({
      status: true,
      message: "Profile updated successfully",
      data: {
        id: updatedUser.id,
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        birth_date: updatedUser.birth_date,
        profile_picture: updatedUser.profile_picture,
      },
    });
  } catch (error) {
    next(error);
  }
};
