const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyToken,
} = require("../middleware/verifyToken");
const Product = require("../models/Products");
const router = require("express").Router();

// Create Product

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const createdProduct = await newProduct.save();
    res.status(201).json(createdProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All Product

router.get("/all", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  const qSize = req.query.size;
  const qColor = req.query.color;

  try {
    let products;

    if (qCategory && qSize && qColor) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
        size: {
          $in: [qSize],
        },
        color: {
          $in: [qColor],
        },
      });
    } else if (qCategory && qSize) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
        size: {
          $in: [qSize],
        },
      });
    } else if (qCategory && qColor) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
        color: {
          $in: [qColor],
        },
      });
    } else if (qSize && qColor) {
      products = await Product.find({
        size: {
          $in: [qSize],
        },
        color: {
          $in: [qColor],
        },
      });
    } else if (qNew) {
      products = await Product.find().sort({ _id: -1 }).limit(5);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else if (qSize) {
      products = await Product.find({
        size: {
          $in: [qSize],
        },
      });
    } else if (qColor) {
      products = await Product.find({
        color: {
          $in: [qColor],
        },
      });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get product Stats Product

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const data = await Product.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
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

// Update Product

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Product

router.get("/find/:id", async (req, res) => {
  try {
    const products = await Product.findById(req.params.id);

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete Product

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product deleted Successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
