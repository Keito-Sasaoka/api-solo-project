const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { setupServer } = require("../src/server");
const config = require("../knexfile");
const knex = require("knex")(config);
// const fixtures = require("./fixtures");
const model = require("../src/db_access/model");
const COUNTRY_DATA_TABLE = model.COUNTRY_DATA_TABLE;
chai.should();
const expect = chai.expect;

const server = setupServer();
describe("COUNTRY DATA API Server", () => {
  let request;
  beforeEach(() => {
    request = chai.request(server);
  });

  describe("GET /country - returning country data", () => {
    it("should return 10 JSON data  ", async () => {
      const res = await request.get("/country").query({ limit: 10 });
      res.should.be.json;
      JSON.parse(res.text).should.have.lengthOf(10);
    });
  });

  describe("GET /country:idOrName - returning country data", () => {
    it("should return :idOrName data ", async () => {
      const res = await request.get("/country/ira");
      const expectData = [
        {
          id: 3,
          name: "United Arab Emirates",
          area: "71024.00",
          population: "936.00",
          population_density: "132.00",
        },
        {
          id: 7,
          name: "Iraq",
          area: "435052.00",
          population: "3883.00",
          population_density: "89.00",
        },
        {
          id: 8,
          name: "Iran",
          area: "1628777.00",
          population: "8307.00",
          population_density: "51.00",
        },
      ];

      res.should.be.json;
      JSON.parse(res.text).should.deep.equal(expectData);
    });
  });

  describe("POST /country - adding country data", () => {
    it("should add new country data  ", async () => {
      const insertData = {
        id: 999,
        name: "test",
        area: "20230327.00",
        population: "327.00",
        population_density: "27.00",
      };
      await request.post("/country").send(insertData);
      const country = await knex(COUNTRY_DATA_TABLE)
        .select({
          id: "id",
          name: "name",
          area: "area",
          population: "population",
          population_density: "population_density",
        })
        .where("id", 999);
      expect(country).to.exist;
      expect(country[0].name).to.eq("test");
    });
  });

  describe("PATCH /country:idOrName ", () => {
    it("should modify country data  ", async () => {
      const updateData = {
        name: "test2",
        area: "20230328.00",
      };
      await request.patch("/country/test").send(updateData);
      const country = await knex(COUNTRY_DATA_TABLE)
        .select({
          id: "id",
          name: "name",
          area: "area",
          population: "population",
          population_density: "population_density",
        })
        .where("id", 999);
      expect(country[0].name).to.eq("test2");
      expect(country[0].area).to.eq("20230328.00");
    });
  });

  describe("DELETE /country/:idOrName ", () => {
    it("should return undefined", async () => {
      await request.delete("/country/999");
      const country = await knex(COUNTRY_DATA_TABLE)
        .select({
          id: "id",
          name: "name",
          area: "area",
          population: "population",
          population_density: "population_density",
        })
        .where("id", 999);
      expect(country[0]).to.be.undefined;
    });
  });
});
