const router = require("express").Router();
const Project = require("../models/projectModal");
const authMiddleware = require("../middlwares/authMiddleware");
const User = require("../models/userModel");
// create new project
router.post("/add-new-project", authMiddleware, async (req, res) => {
  try {
    req.body.owner = req.body.userId;
    // check if project already exists
    const projectExists = await Project.findOne({
      name: req.body.name,
      owner: req.body.owner,
    });
    if (projectExists) {
      throw new Error("Project already exists");
    }
    const newProject = new Project(req.body);
    await newProject.save();
    res.send({
      success: true,
      message: "Project created successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get all projects
router.get("/get-all-projects", authMiddleware, async (req, res) => {
  try {
    // get all projects of user if he is member of any project
    const projects = await Project.find({
      $or: [{ owner: req.body.userId }, { "members.member": req.body.userId }],
    })
      .populate("owner")
      .populate("members.member");
    res.send({
      success: true,
      data: projects,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get project by id
router.get("/get-project-by-id/:id", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("owner")
      .populate("members.member");
    res.send({
      success: true,
      data: project,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// update project
router.put("/update-project/:id", authMiddleware, async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.send({
      success: true,
      data: updatedProject,
      message: "Project updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// delete project
router.delete("/delete-project/:id", authMiddleware, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// add member to project
router.post("/add-member-to-project", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findById(req.body.projectId);
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("User with this email does not exist");
    }
    project.members.push({
      member: user._id,
      roles: req.body.roles,
    });
    await project.save();
    res.send({
      success: true,
      message: "Member added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// remove member from project
router.post("/remove-member-from-project", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findById(req.body.projectId);
    project.members.pull(req.body.member);
    await project.save();
    res.send({
      success: true,
      message: "Member removed successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// update member roles
router.post("/update-member-roles", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.body.projectId,
    });
    const member = project.members.find(
      (member) => member._id.toString() === req.body.memberId
    );
    member.roles = req.body.roles;
    await project.save();
    res.send({
      success: true,
      message: "Member roles updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
