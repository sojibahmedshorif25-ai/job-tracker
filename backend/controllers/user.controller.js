import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import getDataUri from "../utils/dataURI.js";
import cloudinary from "../utils/cloudinary.js";

// @desc    Register a user
// @route   POST /api/user/register
// access   Public
export const register = async (req, res) => {
  const { fullName, email, phoneNumber, password, role } = req.body;
  const file = req.file;
  try {
    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    let cloudResponse = "";
    if (file) {
      const fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    }

    // check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (error) {
    console.log("Error in user registration", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// @desc    Login a user
// @route   POST /api/user/login
// @access  Public
export const login = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }

    // check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }

    // check role is correct
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account does not exist for this role",
        success: false,
      });
    }

    // generate token
    const tokenData = {
      userId: user._id,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: true,
      })
      .json({ message: `Welcome back ${user.fullName}`, success: true, user });
  } catch (error) {
    console.log("Error in user login", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// @desc    Logout user
// @route   GET /api/user/logout
// @access  Private
export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ message: "Logged out successfully", success: true });
  } catch (error) {
    console.log("Error in logout user", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// @desc   Get logged-in user
// @route  GET /api/user/check
// @access Private
export const checkUser = async (req, res) => {
  try {
    // if user is authenticated, return user data
    // req.id is set by the protect middleware after token verification
    const user = await User.findById(req.id).select("-password"); // exclude password field

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // return user data
    return res.status(200).json({ message: "User found", success: true, user });
  } catch (error) {
    console.log("Error in check user controller", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// @desc    Update user profile
// @route   PUT /api/user/update-profile
// @access  Private
export const updateProfile = async (req, res) => {
  // const { fullName, email, phoneNumber, bio, skills } = req.body;
  const { bio, skills } = req.body;
  const resumeFile = req.files?.file?.[0];
  const profilePhotoFile = req.files?.profilePhoto?.[0];
  try {
    let resumeCloud = null;
    let photoCloud = null;

    // Upload resume if provided
    if (resumeFile) {
      const fileUri = getDataUri(resumeFile);
      resumeCloud = await cloudinary.uploader.upload(fileUri.content);
    }

    // Upload profile photo if provided
    if (profilePhotoFile) {
      const photoUri = getDataUri(profilePhotoFile);
      photoCloud = await cloudinary.uploader.upload(photoUri.content);
    }

    const userId = req.id; // it comes from middleware authentication

    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    // updateing data
    // if (fullName) user.fullName = fullName;
    // if (email) user.email = email;
    // if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    // skills we get as string but we need it in the form of array.
    if (skills) {
      const skillsArray = skills.split(",");
      user.profile.skills = skillsArray;
    }

    // Update resume
    if (resumeCloud) {
      user.profile.resume = resumeCloud.secure_url;
      user.profile.resumeOriginalName = resumeFile.originalname;
    }

    // Update profile photo
    if (photoCloud) {
      user.profile.profilePhoto = photoCloud.secure_url;
    }

    await user.save();

    return res.status(200).json({
      message: "User profile updated successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log("Error in update profile controller", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
