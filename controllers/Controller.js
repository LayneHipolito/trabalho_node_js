const subModel = require("../models/Subscriber");
const upload = require("../middlewares/upload");

class Controller {
  async Save(req, res) {
    try {
      let subscriber = req.body;
      const max = await subModel.findOne({}).sort({ id: -1 });
      subscriber.id = max == null ? 1 : max.id + 1;

      if (req.file) {
        subscriber.fotoPerfil = {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        };
      }

      const resultado = await subModel.create(subscriber);
      res.status(201).json(resultado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Não foi possível salvar o assinante" });
    }
  }

  async List(req, res) {
    try {
      const resultado = await subModel.find({});
      res.status(200).json(resultado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Não foi possível listar os assinantes" });
    }
  }

  async ListByFilter(req, res) {
    try {
      const { filtro, valor } = req.params;
      let resultado;

      switch (filtro) {
        case "nome":
          resultado = await subModel.find({ nome: valor });
          break;
        case "sobrenome":
          resultado = await subModel.find({ sobrenome: valor });
          break;
        case "cidade":
          resultado = await subModel.find({ cidade: valor });
          break;
        case "estado":
          resultado = await subModel.find({ estado: valor });
          break;
        case "status":
          resultado = await subModel.find({ status: valor });
          break;
        default:
          return res.status(400).json({ message: "Filtro inválido" });
      }

      res.status(200).json(resultado);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Não foi possível listar os assinantes através do filtro" });
    }
  }

  async SearchById(req, res) {
    try {
      const id = req.params.id;
      const resultado = await subModel.findOne({ id: id });
      res.status(200).json(resultado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Não foi buscar o assinante por ID" });
    }
  }

  async Update(req, res) {
    try {
      const id = req.params.id;
      const _id = String((await subModel.findOne({ id: id }))._id);
      await subModel.findByIdAndUpdate(String(_id), req.body);
      res.status(200).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Não foi possível atualizar o assinante" });
    }
  }

  async Destroy(req, res) {
    try {
      const id = req.params.id;
      const _id = String((await subModel.findOne({ id: id }))._id);
      await subModel.findByIdAndRemove(String(_id));
      res.status(200).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Não foi possível excluir o assinante" });
    }
  }
}

module.exports = new Controller();
