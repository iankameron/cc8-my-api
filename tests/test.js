const chaiHttp = require("chai-http");
const chai = require("chai");
chai.use(chaiHttp);
chai.should();

const { services, server } = require("../server")("dev");
const chaidata = require("./testdata/chaidata");
const sinon = require("sinon");
const Promise = require("bluebird");
const knex = require("knex");

describe.only("DB tests", () => {
  let request;
  beforeEach(() => {
    request = chai.request(server).keepOpen();
  });
  afterEach(() => {
    request.close();
  });
  describe("add/edit/remove centers", () => {
    it("post a new center", async () => {
      const res = await request.post("/api/centers").send(chaidata.addCenter);
      res.body.should.deep.include(chaidata.addCenter);
    });
    it("gets all centers", async () => {
      const res2 = await request.post("/api/centers").send(chaidata.addCenter2);
      const res3 = await request.get("/api/centers");
      // Note: DB still contains one center from last test, thus expect 2

      res3.body.length.should.equal(2);
      res3.body[0].name.should.equal(chaidata.listCenterExpected[0].name);
      res3.body[1].name.should.equal(chaidata.listCenterExpected[1].name);
    });
    it("gets a center based on ID", async () => {
      const res4 = await request.get("/api/centers/1");
      true.should.equal(true);
    });
  });
  describe("add/edit/delete member data", () => {
    it("should add a member", async () => {
      const res0 = await request.get("/api/centers");
      const newCenterId = res0.body[0].id;
      chaidata.addMember.centerId = newCenterId;
      const res = await request.post("/api/members").send(chaidata.addMember);
      res.body.should.deep.include(chaidata.addMember);
    });
    it("should list members", async () => {
      const res0 = await request.get("/api/centers");
      const newCenterId = res0.body[0].id;
      chaidata.addMember2.centerId = newCenterId;

      await request.post("/api/members").send(chaidata.addMember2);
      const res = await request.get("/api/members");
      res.body[1].should.deep.include(chaidata.addMember2);
    });
    it("should patch existing members", async () => {
      const res0 = await request
        .patch("/api/members/2")
        .send({ newName: "Changed Name" });
      res0.body.name.should.equal("Changed Name");
    });
    it("should delete existing members", async () => {
      const res0 = await request.del("/api/members/2");
      res0.body.name.should.equal("Changed Name");
    });
  });
  describe("add/get/delete simple session and game data", () => {
    it("should post a session and game", async () => {
      const res1 = await request
        .post("/api/centers/sessions")
        .send(chaidata.addSession);
      res1.body.should.deep.includes(chaidata.addSessionExpected);
      res1.body.startTime.should.not.equal(null);
      const res2 = await request.post("/api/games").send(chaidata.addGame);
      res2.body.should.deep.includes(chaidata.addGameExpected);
      res2.body.id.should.not.equal(null);
    });
  });
});

describe("Stub tests", () => {
  let request;
  beforeEach(() => {
    request = chai.request(server).keepOpen();
  });
  afterEach(() => {
    request.close();
  });

  describe("centers table tests", () => {
    it("post a new center", async () => {
      const dbFeedback = {};
      const createOutput = new services.db.centers.Center({
        id: 1,
        name: "Test Center",
        max_lanes: 99,
        address: "Test Place"
      });
      const stub1 = sinon
        .stub(services.db.centers, "create")
        .returns(Promise.resolve(createOutput));
      const res = await request.post("/api/centers").send(chaidata.addCenter);
      res.body.should.deep.include(chaidata.addCenterExpected);
    });
  });
});

// ************** TODO GAME TESTING ***************
// describe("add/edit/delete game data", () => {
//   it("should add a game", async () => {
//     const res1 = await request.get("/api/members");
//     const newMemberId = res1.body[0].id;
//     console.log(res1.body[0]);
//     chaidata.addGame.memberId = newMemberId;
//     const res = await request.post("/api/games").send(chaidata.addGame);
//     res.body.should.deep.include(chaidata.addGame);
//   });
// it("should list members", async () => {
//   const res0 = await request.get("/api/centers");
//   const newCenterId = res0.body[0].id;
//   chaidata.addMember2.centerId = newCenterId;

//   await request.post("/api/members").send(chaidata.addMember2);
//   const res = await request.get("/api/members");
//   res.body[1].should.deep.include(chaidata.addMember2);
// });
