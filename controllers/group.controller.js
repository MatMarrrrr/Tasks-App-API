const GroupService = require("../services/group.service");

const createGroup = async (req, res) => {
  const { name } = req.body;
  const author = req.user._id;

  try {
    const group = await GroupService.createGroup(name, author);
    res.status(201).json(group);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateGroup = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const group = await GroupService.updateGroup(id, name, req.user._id);
    res.status(200).json(group);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteGroup = async (req, res) => {
  const { id } = req.params;

  try {
    await GroupService.deleteGroup(id, req.user._id);
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addUserToGroup = async (req, res) => {
  const { groupId } = req.params;
  const { userId } = req.body;

  try {
    const group = await GroupService.addUserToGroup(groupId, userId);
    res.status(200).json(group);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const removeUserFromGroup = async (req, res) => {
  const { groupId } = req.params;
  const { userId } = req.body;

  try {
    const group = await GroupService.removeUserFromGroup(groupId, userId);
    res.status(200).json(group);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createGroup,
  updateGroup,
  deleteGroup,
  addUserToGroup,
  removeUserFromGroup,
};
