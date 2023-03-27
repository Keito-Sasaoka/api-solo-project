const model = require("./model");

module.exports = {
  async countryGetAll(req, res) {
    const limit = req.query.limit;
    let data;
    if (limit) {
      data = await model.getAll(limit);
    } else {
      data = await model.getAll();
    }
    res.json(data);
  },

  async countryGet(req, res) {
    const idOrName = req.params.idOrName;
    let data;
    if (isNaN(Number(idOrName))) {
      data = await model.getByName(idOrName);
    } else {
      data = await model.getById(idOrName);
    }
    res.json(data);
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
