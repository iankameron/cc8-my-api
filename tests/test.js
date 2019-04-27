const chaiHttp = require("chai-http");
const chai = require("chai");
chai.use(chaiHttp);
chai.should();

const { server } = require("../server");
const chaidata = require("./testdata/chaidata");
//const _ = require("underscore");
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
      res.body.name.should.equal(chaidata.addCenterExpected.name);
      res.statusCode.should.equal(201);
    });
    // it("gets all centers", () => {

    // });
  });
});
