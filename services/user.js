import UserModel from "../models/user.js";
import EventModel from "../models/event.js";
import passwordHash from "password-hash";
import jwt from "jsonwebtoken";

const UserService = {
  login: async ({ email, password }) => {
    try {
      const data = await UserModel.findOne({ email });

      if (!data) {
        return { message: "error", data: "Email is wrong" };
      }

      const isVerified = passwordHash.verify(password, data.password);

      if (!isVerified) {
        return { message: "error", data: "Password is wrong" };
      }

      delete data._doc.password;
      const token = await jwt.sign(data._doc, "my_temporary_secret");
      if (token) {
        return { message: "success", data: { token } };
      } else {
        return { message: "error", data: "Token is not generated" };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  add: async (body) => {
    try {
      const data = await UserModel.findOne({ email: body.email });
      if (data) {
        return { message: "failed", data: "User already exist" };
      }
      if (body.password !== body.repeat_password) {
        return { message: "failed", data: "Passwords donot Match" };
      }
      const hashedPassword = passwordHash.generate(body.password);
      body.password = hashedPassword;

      const savedData = await UserModel.create(body);
      if (savedData) {
        return { message: "success", data: savedData };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  UserProfile: async (id) => {
    try {
      const prof = await UserModel.findById(id).select({ password: 0 });

      if (prof) {
        const events = await EventModel.find({ user_id: id });
        if (events.length > 0) {
          return { message: "success", data: { user: prof, events: events } };
        } else {
          return { message: "", data: { user: prof, events: [] }};
        }

        
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },
 
  update: async ( body) => {
    try {
     const  _id= body.id
      const updatedUser = await UserModel.findByIdAndUpdate(_id, body, { new: true, runValidators: true }).select({ password: 0 });
  
      if (updatedUser) {
        const events = await EventModel.find({ user_id: _id });
        return { message: "success", data: { user: updatedUser, events: events } };
      } 
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },
  
}
  

export default UserService;
