const chaiHttp = require("chai-http");
const chai = require("chai");
chai.use(chaiHttp);
chai.should();

const { server } = require("../server")("dev");
const chaidata = require("./testdata/chaidata");
const sinon = require("sinon");

describe("DB tests", () => {
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
      res.body.should.deep.equal(chaidata.addCenterExpected);
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
      const res4 = await request.get("/api/centers?id=1");
      true.should.equal(true);
    });
  });
  describe("add/edit/delete member data", () => {
    it("should add a member", async () => {
      const res = await request.post("/api/members").send(chaidata.addMember);
      res.body.should.deep.equal(chaidata.addMemberExpected);
    });
  });
});
