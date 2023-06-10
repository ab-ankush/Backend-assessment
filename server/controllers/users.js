import User from "../models/users.js";

const hasConsentToOpen = (currentUser, targetUser) => {
  // Implementing logic to determine if the currentUser has consent to open the targetUser's profile
  // eg I am checking here if the currentUser is the admin trying to change its settings not, if he is then only he can switch it
  if (currentUser === "ab-ankush") return true;
  else return false;
};

const hasConsentToReveal = (currentUser, targetUser) => {
  // Implementing logic to determine if the currentUser has consent to reveal the targetUser's profile
  //   eg here i am checking if the current user is an admin in my case it is ab-ankush then only he can reveal someone's profile
  if (currentUser === "ab-ankush") return true;
  else return false;
};

// Api end point to get the user data
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ username: id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

// Api endpoint to Add a user
export const addUser = async (req, res) => {
  try {
    // getting data from the frontend via a form
    const { firstname, lastname, bio, email, password, location, username } =
      req.body;
    const newUser = new User({
      firstname,
      lastname,
      bio,
      email,
      password,
      location,
      username,
    });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

// Api endpoint to update a user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ username: id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { firstname, lastname, location, bio } = req.body;

    user.firstname = firstname;
    user.lastname = lastname;
    user.location = location;
    user.bio = bio;
    await user.save();

    res.status(200).json(user);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

// API endpoint to reveal user details
export const revealUser = async (req, res) => {
  // req.user is defined by a middleware like jwt etc
  const currentUser = req.user;

  const userId = req.params.id;

  try {
    const user = await User.findOne({ username: userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!hasConsentToReveal(currentUser, user)) {
      return res.status(403).json({
        error:
          "Unauthorized: You do not have consent to reveal this user's profile",
      });
    }

    // Only reveal specific fields based on what we need to reveal eg. I've revealed tha name and email
    const { username, email } = user;

    return res.status(200).json({ username, email });
  } catch (error) {
    console.error("Error retrieving user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// API endpoint to open user account
export const switchUser = async (req, res) => {
  // req.user is defined by a middleware like jwt etc
  const currentUser = req.user;

  const userId = req.params.id;

  try {
    const user = await User.findOne({ username: userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!hasConsentToOpen(currentUser, user)) {
      return res.status(403).json({
        error:
          "Unauthorized: You do not have consent to switch this user's account",
      });
    }

    // Updating the user's account status to "open" or "close"
    if (user.accountStatus === "open") user.accountStatus = "close";
    else user.accountStatus = "open";
    await user.save();
    const state = user.accountStatus;

    return res.json({ message: `User account ${state} successfully` });
  } catch (error) {
    console.error("Error opening user account:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
