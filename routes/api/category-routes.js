const router = require("express").Router();
const { Category, Product } = require("../../models");
const { findByPk } = require("../../models/Category");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories -- include its associated Products
  try {
    const keyData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(keyData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value -- include its associated Products
  try {
    const keyData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!keyData) {
      res.status(404).json({ message: "No data found" });
    }
    res.status(200).json(keyData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const keyData = await Category.create(req.body);
    res.status(200).json(keyData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const keyData = await Category.update(req.body, {
      where: {
        id: req.params.id
      },
    });
   
    if (!keyData) {
      res.status(404).json({ message: "no data found" });
      return;
    }
    res.status(200).json({ message: "Success!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const keyData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!keyData) {
      res.status(404).json({message: 'No data found'});
      return;
    }
    res.status(200).json({message:'Success!'});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
