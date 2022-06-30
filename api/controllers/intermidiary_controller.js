const Joi = require("joi");
const BaseController = require("./base_controller");
const IntermidiaryService = require("../services/intermidiary");
const GetIntermidiaryById = require("../services/intermidiary/get_individual_intermidiary");

class IntermidiaryController extends BaseController {
  static async create(req, res, next) {
    try {
      const { error } = validateCreateIntermidiaryParam(req.body);

      if (error) {
        super.throwParamValidationError(error);
      }

      const payload = {
        name: req.body.name,
        intermidiary_order: req.body.intermidiary_order,
        type: req.body.type,
      };

      const data = await IntermidiaryService.Create(payload);

      res.status(201).json({
        message: "Intermidiary created successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async readAll(_, res, next) {
    try {
      const { data } = await IntermidiaryService.GetAll();

      res.status(200).json({
        message: "Intermidiaries retrieved successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async read(req, res, next) {
    try {
      const data = await GetIntermidiaryById(req.params.id, true);

      res.status(200).json({
        message: "Intermidiary retrieved successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      await IntermidiaryService.Delete(req.params.id);

      res.status(204);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { error } = validateUpdateIntermidiaryParam(req.body);

      if (error) {
        super.throwParamValidationError(error);
      }

      const data = await IntermidiaryService.Update(req.params.id, req.body);

      res.status(200).json({
        message: "Intermidiary updated successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

const validateCreateIntermidiaryParam = (params) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    intermidiary_order: Joi.number().integer().required(),
    type: Joi.string(),
  });

  return schema.validate(params);
};

const validateUpdateIntermidiaryParam = (params) => {
  const schema = Joi.object({
    name: Joi.string(),
    intermidiary_order: Joi.number(),
  });

  return schema.validate(params);
};

module.exports = IntermidiaryController;
