const chaiHttp = require("chai-http");
const chai = require("chai");
chai.use(chaiHttp);
chai.should();

const { server } = require("../server");

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
      const newCenter = {
        name: "Tokyo Port Bowl",
        maxLanes: 40,
        address: "Tamachi"
      };
      const res = await request.post("/api/centers").send(newCenter);
      res.statusCode.should.equal(201);
    });
    //it("gets all centers");
  });
});
