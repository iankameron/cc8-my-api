const chaiHttp = require("chai-http");
const chai = require("chai");
chai.use(chaiHttp);
chai.should();

const { server } = require("../server");
//const { pokemon, attacks, types } = require("../src/data/index.js");

//const _ = require("underscore");
const sinon = require("sinon");
describe("API tests", () => {
  let request;
  beforeEach(() => {
    request = chai.request(server).keepOpen();
  });
  afterEach(() => {
    request.close();
  });
  describe("Test Placeholder", () => {
    it("should test something", async () => {
      const res = await request.get("/api/centers");
      console.log(res.body);
      true.should.equal(true);
    });
  });
});
