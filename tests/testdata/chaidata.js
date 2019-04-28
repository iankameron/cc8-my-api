module.exports = {
  addCenter: {
    name: "Test Center",
    maxLanes: 99,
    address: "Test Place"
  },
  addCenter2: {
    name: "Test Center 2",
    maxLanes: 999,
    address: "Test Place part 2"
  },
  addCenterExpected: {
    id: 1,
    name: "Test Center",
    maxLanes: 99,
    address: "Test Place"
  },
  listCenterExpected: [
    {
      id: 1,
      name: "Test Center",
      maxLanes: 99,
      address: "Test Place"
    },
    {
      id: 2,
      name: "Test Center 2",
      maxLanes: 999,
      address: "Test Place part 2"
    }
  ],
  addMember: {
    name: "Test Member",
    centerId: 1,
    skillLevel: 4
  },
  addMember2: {
    name: "Test Member2",
    centerId: 1,
    skillLevel: 3
  },
  addMemberExpected: {
    id: 1,
    name: "Test Member",
    centerId: 1,
    skillLevel: 4
  }
};
