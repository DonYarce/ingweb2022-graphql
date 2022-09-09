import jwt from "jsonwebtoken";

export const signToken = (data: any) => {
  return jwt.sign(data, process.env.JWT_SECRET);
};

export const verifyToken = (token: String) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
