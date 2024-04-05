import validator from "validator";
import usersModel from "../../../models/users.model";
import mongoose from "mongoose";
import transactionsModel from "../../../models/transcations.model";

const transferMoney = async (req: any, res: any) => {
  const { friend_email, amount } = req.body;
  if (!friend_email) throw "Friend Email is required";
  if (!amount) throw "Amount is required";

  if (!validator.isEmail(friend_email.toString())) throw "Invalid Email";
  if (!validator.isNumeric(amount.toString())) throw "Invalid Amount";

  if (amount < 1) throw "Amount must be atleast 1 rupees";

  //checking if friend exist
  const getFriend = await usersModel.findOne({
    email: friend_email,
  });
  if (!getFriend) throw "Friend email is not valid";
  console.log(getFriend);

  const getOwnAccount = await usersModel.findOne({
    _id: req.user.user_id,
  });

  if (!getOwnAccount) throw "code:434343";
  if (getOwnAccount.balance < amount) throw "Insufficient Balance";

  const session = await mongoose.startSession();
  await session.withTransaction(async (session: any) => {
    // Deducting money from sender account!
    await usersModel.updateOne(
      {
        _id: req.user.user_id,
      },
      {
        $inc: {
          balance: amount * -1,
        },
      }
    ),
      {
        session,
      };

    // Create own transaction log...

    await transactionsModel.create(
      [
        {
          user_id: req.user.user_id,
          transaction_type: "sent",
          balance: amount,
          info: `Sent ${amount} money to ${friend_email}`,
        },
      ],
      {
        session: session,
      }
    );

    // Adding money to receiver account!
    await usersModel.updateOne(
      {
        email: friend_email,
      },
      {
        $inc: {
          balance: amount,
        },
      },
      {
        session,
      }
    );

    // create transaction log for friend..

    await transactionsModel.create(
      [
        {
          user_id: getFriend._id,
          transaction_type: "received",
          balance: amount,
          info: `Received ${amount} money from ${getOwnAccount.email}`,
        },
      ],
      {
        session: session,
      }
    );
  });
  res.status(200).json({
    status: "success",
    data: "Funds transferred successfully!",
  });
};
export default transferMoney;
