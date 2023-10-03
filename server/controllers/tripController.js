const { convertDate } = require("../helpers/date");
const {
  getDataById,
  updateData,
  addData,
  deleteById,
  getFilteredData,
  insertAiBulk,
} = require("../helpers/firestoreHelper");
const { generateItinerary } = require("../helpers/location-trip");
const collectionName = "Trips";
class tripController {
  static async getUserTrip(req, res, next) {
    try {
      const { id } = req.user;
      const data = await getFilteredData(collectionName, {
        toFind: "userId",
        value: id,
      });
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  // with ai
  static async addTripByAi(req, res, next) {
    try {
      // const batch = databaseFirestore.batch();
      let temp = null;
      const { id } = req.user;
      const { city } = req.query;
      const { body } = req;
      const { title, description, startDate, endDate, } = body;
      if (!title) {
        throw { name: "BlankForm", message: "Title cannot blank" };
      }
      if (!description) {
        throw { name: "BlankForm", message: "Description cannot blank" };
      }
      if (!startDate) {
        throw { name: "BlankForm", message: "startDate cannot blank" };
      }
      if (!endDate) {
        throw { name: "BlankForm", message: "endDate cannot blank" };
      }
      
      body.userId = id;

      const aiData = await generateItinerary(city, startDate, endDate);
      const insertBulk = await insertAiBulk(body, aiData, [startDate, endDate]);
      res.status(200).json({ tripId: insertBulk });
    } catch (error) {
      console.log(error);
    }
  }
  static async getPublicTrip(req, res, next) {
    try {
      const data = await getFilteredData(collectionName, {
        toFind: "isPublic",
        value: true,
      });
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }


  // without Ai
  static async addTrip(req, res, next) {
    try {
      const { id } = req.user;
      const { body } = req;
      const { title, description, startDate, endDate, isPublic } = body;
      //date format 2022-01-17
      if (!title) {
        throw { name: "BlankForm", message: "Title cannot blank" };
      }
      if (!description) {
        throw { name: "BlankForm", message: "Description cannot blank" };
      }
      if (!startDate) {
        throw { name: "BlankForm", message: "startDate cannot blank" };
      }
      if (!endDate) {
        throw { name: "BlankForm", message: "endDate cannot blank" };
      }
      if (isPublic === undefined) {
        throw { name: "BlankForm", message: "isPublic cannot blank" };
      }
      body.isPublic = isPublic === "true" ? true : false;
      body.userId = id;
      const add = await addData(collectionName, body);
      res.status(200).json({ id: add });
    } catch (error) {
      next(error);
    }
  }
  static async getTripById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await getDataById(collectionName, id);
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async deleteTrip(req, res, next) {
    try {
      const { id } = req.params;
      const toDelete = await deleteById(collectionName, id);
      res.status(200).json({
        message: "Success Delete Trip id " + id,
      });
    } catch (error) {
      next(error);
    }
  }
  static async editTrip(req, res, next) {
    try {
      const { id } = req.params;
      const { body } = req;
      const { title, description, startDate, endDate,isPublic } = body;
      //date format 2022-01-17
      if (!title) {
        throw { name: "NotFound", message: "Title cannot blank" };
      }
      if (!description) {
        throw { name: "NotFound", message: "Description cannot blank" };
      }
      if (!startDate) {
        throw { name: "NotFound", message: "startDate cannot blank" };
      }
      if (!endDate) {
        throw { name: "NotFound", message: "endDate cannot blank" };
      }
      if (isPublic === undefined) {
        throw { name: "BlankForm", message: "isPublic cannot blank" };
      }
      const update = await updateData(collectionName, body, id);
      res.status(200).json({
        message: "Success update id " + id,
      });
    } catch (error) {
      next(error);
    }
  }
  // static async getMyTrip(req, res, next) {
  //   try {
  //     const { id } = req.user;
  //     const find = await Trip.findAll({
  //       where: {
  //         userId: id,
  //       },
  //     });
  //     res.status(200).json(find);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
  // static async getTripById(req, res, next) {
  //   try {
  //     const { id } = req.params;
  //     const find = await Trip.findByPk(id);
  //     if (!find) {
  //       throw { name: "NotFound" };
  //     }
  //     res.status(200).json(find);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
  // static async deleteTrip(req, res, next) {
  //   try {
  //     const { id } = req.params;
  //     const find = await Trip.findByPk(id);
  //     const del = await find.destroy();
  //     res.status(200).json({
  //       message: `Success delete trip ${id}`,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
  // static async editTrip(req, res, next) {
  //   const { body } = req;
  //   const { id } = req.params;
  //   const { title, description, startDate, endDate } = body;
  //   if (!title) {
  //     throw { name: "NotFound", message: "Title cannot blank" };
  //   }
  //   if (!description) {
  //     throw { name: "NotFound", message: "Description cannot blank" };
  //   }
  //   if (!startDate) {
  //     throw { name: "NotFound", message: "startDate cannot blank" };
  //   }
  //   if (!endDate) {
  //     throw { name: "NotFound", message: "endDate cannot blank" };
  //   }
  //   const find = await Trip.findByPk(id);
  //   const editTrip = await find.update(body);
  //   res.status(200).json(editTrip);
  // }
  // static async addTrip(req, res, next) {
  //   try {
  //     const { body } = req;
  //     const { title, description, startDate, endDate } = body;
  //     //date format 2022-01-17
  //     if (!title) {
  //       throw { name: "NotFound", message: "Title cannot blank" };
  //     }
  //     if (!description) {
  //       throw { name: "NotFound", message: "Description cannot blank" };
  //     }
  //     if (!startDate) {
  //       throw { name: "NotFound", message: "startDate cannot blank" };
  //     }
  //     if (!endDate) {
  //       throw { name: "NotFound", message: "endDate cannot blank" };
  //     }
  //     body.userId = req.user.id;
  //     const addTrip = await Trip.create(body);
  //     res.status(201).json(addTrip);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

module.exports = tripController;
