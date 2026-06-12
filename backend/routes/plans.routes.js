const express = require("express");
const router = express.Router();

const Plan = require("../models/plan");

router.get("/", async (req, res) => {
  try {
    const plans = await Plan.find({
      active: true,
    });

    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        message: "Plan not found",
      });
    }

    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


router.post("/", async (req, res) => {
  try {
    const plan = await Plan.create(req.body);

    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedPlan = await Plan.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedPlan);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Plan.findByIdAndUpdate(req.params.id, {
      active: false,
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;