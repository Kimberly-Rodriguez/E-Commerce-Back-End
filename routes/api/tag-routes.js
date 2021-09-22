const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data

  try {
    const keyData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: "products" }],
    });
    res.status(200).json(keyData);
  } catch (err) {
    res.status(500).json({ message: "No tag data is found" });
  }
});

// find a single tag by its `id`
// be sure to include its associated Product data
router.get("/:id", async (req, res) => {
  try {
    const keyData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: "products" }],
    });
    if (!keyData) {
      res.status(404).json({ message: "No tag data found" });
      return;
    }
    res.status(200).json(keyData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag
router.post("/", async (req, res) => {
  try {
    const keyData = await Tag.create(req.body);
    res.status(200).json(keyData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a tag's name by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const keyData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!keyData) {
      res.status(404).json({message:'tag data not found'});
      return;
    }
    res.status(200).json(keyData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete on tag by its `id` value
router.delete("/:id", async (req, res) => {

try {
  const keyData = await Tag.destroy({
    where: {
      id: req.params.id,
    }
  })
  if (!keyData){
    res.status(404).json({message: 'No user found'});
    return;
  }

  res.status(200).json(keyData)
} catch (err) {
  res.status(500).json(err);
}
});


module.exports = router;
