export const userAuth = (req, res, next) => {
   if (req.decoded.role === "user") {
      next();
   } else {
      res.status(401).send("Unauthorized");
   }
};
