const model = require("./model");

module.exports = {
  async countryGet(req, res) {
    const limit = req.query.limit;
    let testdata;
    if (limit) {
      testdata = await model.getAll(limit);
    } else {
      testdata = await model.getAll();
    }
    res.send(testdata);
  },

  async countryPost(req, res) {
    const { body } = req;
    await model.insertCountry(body);
    res.status(200).json({ status: "success" });
  },

  async countryModify(req, res) {
    const idOrName = req.params.idOrName;
    const { body } = req;
    if (isNaN(Number(idOrName))) {
      await model.modifyByName(idOrName, body);
    } else {
      await model.modifyById(idOrName, body);
    }
    res.status(200).json({ status: "success" });
  },

  async countryDelete(req, res) {
    const idOrName = req.params.idOrName;
    if (isNaN(Number(idOrName))) {
      await model.deleteByName(idOrName);
    } else {
      await model.deleteById(idOrName);
    }
    res.status(200).json({ status: "success" });
  },
};
