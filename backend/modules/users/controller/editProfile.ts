import { Request, Response } from "express";
import usersModel from "../../../models/users.model";

// Protected route...

const editProfile = async (req: any, res: Response) => {
  const { name, phone, location } = req.body;

  await usersModel.updateOne(
    {
      _id: req.user.user_id,
    },
    {
      name,
      phone,
      location,
    }
  );

  res.status(200).json({
    status: "success",
    message: "Updated successfully!",
  });
};

export default editProfile;
