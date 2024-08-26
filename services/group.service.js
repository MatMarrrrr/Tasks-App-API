const Group = require("../models/group.model");

const GroupService = {
  async createGroup(name, author) {
    const group = new Group({ name, author, members: [author] });
    await group.save();
    return group;
  },

  async getGroups(userId, all = false) {
    let groups;
    if (all) {
      groups = await Group.find();
    } else {
      groups = await Group.find({ members: userId });
    }
    return groups;
  },

  async updateGroup(id, name, userId) {
    const group = await Group.findById(id);
    if (!group) {
      throw new Error("Group not found");
    }
    if (group.author.toString() !== userId) {
      throw new Error("Not authorized to update this group");
    }
    group.name = name;
    await group.save();
    return group;
  },

  async deleteGroup(id, userId) {
    const group = await Group.findById(id);
    if (!group) {
      throw new Error("Group not found");
    }
    if (group.author.toString() !== userId) {
      throw new Error("Not authorized to delete this group");
    }
    await group.deleteOne();
    return group;
  },

  async addUserToGroup(groupId, userId) {
    const group = await Group.findById(groupId);
    if (!group) {
      throw new Error("Group not found");
    }
    if (!group.members.includes(userId)) {
      group.members.push(userId);
      await group.save();
    }
    return group;
  },

  async removeUserFromGroup(groupId, userId) {
    const group = await Group.findById(groupId);
    if (!group) {
      throw new Error("Group not found");
    }
    group.members = group.members.filter(
      (memberId) => memberId.toString() !== userId.toString()
    );
    await group.save();
    return group;
  },
};

module.exports = GroupService;
