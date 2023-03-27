export const SECRET = "123456";
import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
   let authorization = req.headers.authorization;
   if (authorization) {
      let accessToken = req.headers.authorization.split(" ")[1];
      if (accessToken) {
         jwt.verify(accessToken, SECRET, (err, payload) => {
            if (err) {
               res.status(401).json({
                  message: "err 401",
               });
            } else {
               req.decoded = payload;
               next();
            }
         });
      } else {
         res.status(401).json({
            message: "not accessToken",
         });
      }
   } else {
      res.status(401).json({
         message: "who are you",
      });
   }
};
