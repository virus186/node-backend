const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");
const User = require("../models/User");

const router = require("express").Router();

// Update user

router.get("/all", verifyTokenAndAdmin, async (req, res) => {
    const query = req.params.new;
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(1)
        : await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  
    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    const { password, ...others } = updatedUser._doc;

    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete user

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User deleted Successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

// get user

router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedUser = await User.findById(req.params.id);

    const { password, ...others } = updatedUser._doc;

    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All Users



module.exports = router;
