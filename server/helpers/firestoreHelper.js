const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
var admin = require('firebase-admin');


const serviceAccount = require("../config/firestore.json");
const { generateDates } = require("./date");
initializeApp({
  credential: cert(serviceAccount),
});
const db = getFirestore();

const insertAiBulk = async (bodyTrips, aiData, otherData) => {
  const tripRefs = db.collection("Trips");
  const locationRefs = db.collection("Locations");
  const activityRefs = db.collection("Activities");
  const locationsArr = [];
  const activityObj = {};
  const dates = generateDates(otherData[0], otherData[1]);
  let count = 0;

  return db.runTransaction(async (t) => {
    const tripDocRef = tripRefs.doc();
    t.set(tripDocRef, bodyTrips);

    for (const key in aiData.Day) {
      locationsArr.length = 0;

      const total = aiData.Day[key];
      for (let index = 0; index < total.length; index++) {
        const element = total[index];
        element.order = index + 1;
        const locationDocRef = locationRefs.doc();
        t.set(locationDocRef, element);
        locationsArr.push(locationDocRef);
      }

      const activityObj = {
        name: `Day ${key}`,
        date: dates[count],
        locationId: [...locationsArr], 
        tripId: tripDocRef,
      };

      const activityDocRef = activityRefs.doc();
      t.set(activityDocRef, activityObj);

      console.log(
        `Success ${key} create activity ${activityDocRef.id} ${dates[count]}`
      );
      count += 1;
    }
    return tripDocRef.id;
  });
};

const getDataById = async (collectionName, id) => {
  try {
    const query = db.collection(collectionName).doc(id);
    const get = await query.get();
    if (!get.exists || get.empty) {
      throw { name: "NotFound", message: "Data Not Found" };
    }
    const data = get.data();
    return data;
  } catch (error) {
    throw error;
  }
};
const getFilteredDataByRefference = async (collectionName, payload) => {
  try {
    const { toFind, id } = payload;
    const typeRef = db.collection(toFind).doc(id);
    if(!typeRef.exists) throw {name: "NotFound", message: "Data Not Found"}
    const query = await db
      .collection(collectionName)
      .where("tripId", "==", typeRef)
      .get();
    if (query.empty) {
      throw { name: "NotFound", message: "Data Not Found" };
    }
    query.docs.map((el) => console.log(el.data()));
  } catch (error) {
    throw error;
  }
};
const getFilteredData = async (collectionName, payload) => {
  try {
    const { toFind, value } = payload;
    const query = await db
      .collection(collectionName)
      .where(toFind, "==", value)
      .get();
    if (query.empty) {
      throw { name: "NotFound", message: "Data Not Found" };
    }
    return query.docs.map((doc) => doc.data());
  } catch (error) {
    throw error;
  }
};
const updateData = async (collectionName, payload, id) => {
  try {
    const query = db.collection(collectionName).doc(id);
    if(!query.exists) throw {name: "NotFound", message: "Data Not Found"}
    const update = await query.update(payload);
    return update;
  } catch (error) {
    throw error;
  }
};

const updateDataWithRefference = async (collectionName,id , reference, refferenceParameter) => {
  try {
    const collection = db.collection(collectionName).doc(id);
    if(!collection.exists) throw {name: "NotFound", message: "Data Not Found"}
    const result = await collection.update({
      [refferenceParameter]: admin.firestore.FieldValue.arrayUnion(db.doc(reference))
    });   
    return id; 
  } catch (error) {
    throw error;
  }
};
const addDataWithRefference = async (collectionName, payload, reference,refferenceParameter) => {
  try {
    const collection = db.collection(collectionName);
    const result = await collection.add({
      ...payload,
      [refferenceParameter]: admin.firestore.FieldValue.arrayUnion(db.doc(reference))
    });
    return result.id;
  } catch (error) {
    throw error;
  }
};

const addData = async (collectionName, payload) => {
  try {
    let collection = db.collection(collectionName);
    let data = await collection.add(payload);
    return data.id;
  } catch (error) {
    throw error;
  }
};
const deleteById = async (collectionName, id) => {
  try {
    const res =  db.collection(collectionName).doc(id)
    if(!res.exists) throw {name: "NotFound", message: "Data Not Found"}
    await res.delete();
    return res;
  } catch (error) {
    throw error;
  }
};
const data = {
  title: "Trip to Bali",
  description: "Trip ke bali description",
  startDate: "2021-08-01",
  endDate: "2021-08-05",
}
// insertAiBulk(, "", "Activities")
module.exports = {
  getDataById,
  updateData,
  addData,
  deleteById,
  getFilteredData,
  insertAiBulk,
  getFilteredDataByRefference,
  addDataWithRefference,
  updateDataWithRefference
};
