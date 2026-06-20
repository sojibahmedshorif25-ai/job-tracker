import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token; // token is the name of the cookie as we gave while storing it (in user.controller.js)
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided", success: false });
    }

    // verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Invalid Token", success: false });
    }

    req.id = decoded.userId; // userId is the name of the field we gave while storing it (in user.controller.js)
    next();
  } catch (error) {
    console.log("Error in auth.middleware.js", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

// Middleware for recruiter-only access
// export const recruiterOnly = (req, res, next) => {
//   if (req.user && req.user.role === "recruiter") {
//     next();
//   } else {
//     res.status(403).json({ message: "Access denied, recruiter only" });
//   }
// };
