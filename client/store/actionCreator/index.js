import axios from "axios"
import { firebase } from "../../config/config";

import { FETCH_DATA_SUCCESS, LOGIN_SUCCESS, PROFILE_SUCCESS, POST_ITINERARY_SUCCESS, UNIVERSAL_ERROR, GET_LIST_ITINERARY_SUCCESS, GET_ACTIVITIES_SUCCESS, ADD_POST_ITINERARY_SUCCESS, GET_PUBLIC_POST_SUCCESS, SUCCESS_FETCH_ADDED_POST, SET_LOADING } from "../actionType";
import { doc, collection, query, where, onSnapshot } from '@firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";
import duckSearch from "../../helper/duck";
import distanceInDays, { generateDates } from "../../helper/date";
import BASE_URL from "../../constants/config";
export function initialFirestore(collectionName) {
  return async (dispatch) => {
    const ActivitiesRefs = firebase.firestore().collection(collectionName);
    const unsubscribe = ActivitiesRefs.onSnapshot((querySnapshot) => {
      const activities = [];
      querySnapshot.forEach((doc) => {
        // Loop through the documents in the collection and extract data
        const data = doc.data();
        activities.push({
          id: doc.id,
          ...data,
        });
      });
      dispatch({ type: GET_ACTIVITIES_SUCCESS, payload: activities })

    })
  }
}
export function deleteLocation(id) {
  return async (dispatch) => {
    const db = firebase.firestore()
    const locationRefs = db.collection("Locations").doc(id) //location id to delete
    const activityRefs = db.collection("Activities")
    let find = await activityRefs.where("locationId", "array-contains", locationRefs).get()
    const batch = db.batch();
    find.docs.forEach(doc => {
      const docRef = activityRefs.doc(doc.id);
      const test = batch.update(docRef, {
        locationId: firebase.firestore.FieldValue.arrayRemove(locationRefs)
      });
      // console.log
    });
    await batch.commit();
    // await locationRefs.delete()

  }
}
export function addLocation(body, access_token, activityId) {
  return async (dispatch) => {
    try {
      const db = firebase.firestore();
      const locationRefs = db.collection("Locations");
      const activityRefs = db.collection("Activities");
      const add = await locationRefs.add(body);
      const locationId = add.id;
      const locationToAdd = locationRefs.doc(locationId);
      let find = activityRefs.doc(activityId);
      let activityData = await find.get();
      activityData = activityData.data();
      if (!activityData.locationId) {
        activityData.locationId = [];
      }
      await activityRefs.doc(activityId).update({
        locationId: firebase.firestore.FieldValue.arrayUnion(locationToAdd)
      });

    } catch (error) {
      dispatch({ type: UNIVERSAL_ERROR, payload: error })
    }
  }
}
export function updateLocations(locations) {
  return async (dispatch) => {
    try {
      console.log("Updating locations")
      const db = firebase.firestore();
      const locationRefs = db.collection("Locations");
      const activityRefs = db.collection("Activities");
      const locationForFind = locationRefs.doc(locations[1].id);
      let find = activityRefs.where("locationId", "array-contains", locationForFind);
      const newLocationRefs = [];
      for (let element of locations) {
        if (element.toUpdate) {
          const addLocation = await locationRefs.add(element.toUpdate);
          newLocationRefs.push(addLocation);
        }
      }

      find = await find.get();
      if (!find.empty) {
        const oldData = find.docs[0].data();
        const oldLocationIds = oldData.locationId;
        for (let locationIdRef of oldLocationIds) {
          await locationIdRef.delete();
        }
        await find.docs[0].ref.update({
          locationId: newLocationRefs
        });
      }

    } catch (error) {
      console.log(error);
    }
  }
}

export function fetchActivitiesByTripId(tripId) {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_LOADING, payload: true })
      let temp = {}
      const db = firebase.firestore();
      const tripRef = db.collection("Trips").doc(tripId)
      const locationRef = db.collection("Locations")
      const ActivityRef = db.collection("Activities")
      const files = await ActivityRef
        .where('tripId', '==', tripRef)
        .onSnapshot(async (snapshot) => {
          const myData = snapshot.docs.map(doc => ({
            id: doc.id, // Adding the document ID here
            ...doc.data()
          })); const resolvedData = await Promise.all(myData.map(async (activity) => {
            const tripDocument = await activity.tripId.get();
            const tripData = {
              id: tripDocument.id,
              ...tripDocument.data()
            };

            const locationData = await Promise.all(activity.locationId.map(async (locRef) => {
              const locDocument = await locRef.get();
              return {
                id: locDocument.id,
                ...locDocument.data()
              };
            }));
            // const tripData = (await activity.tripId.get()).data();
            // const locationData = await Promise.all(activity.locationId.map(async (locRef) => {
            //     return (await locRef.get()).data();
            // }));
            return {
              ...activity,
              tripId: tripData,
              locationId: locationData
            };
          }));
          resolvedData.sort((a, b) => {
            const dayA = parseInt(a.name.split(" ")[1], 10);
            const dayB = parseInt(b.name.split(" ")[1], 10);
            return dayA - dayB;
          });
          dispatch({ type: SET_LOADING, payload: false })
          dispatch({ type: GET_ACTIVITIES_SUCCESS, payload: resolvedData });
        });

    } catch (error) {
      dispatch({ type: UNIVERSAL_ERROR, payload: error })
    }

  }
}
export function getPublic() {
  return async (dispatch) => {
    try {
      const db = firebase.firestore()
      const activity = db.collection("Activities");
      let locationRef = db.collection("Trips").where("isPublic", "==", true);
      const querySnapshot = await locationRef.get();

      if (querySnapshot.empty) {
        dispatch({ type: GET_PUBLIC_POST_SUCCESS, payload: [] });
        return;
      }

      const locationsData = querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        };
      });
      const pubsPromises = locationsData.map(async (pub) => {
        let secondTripRef = db.collection("Trips").doc(pub.id);
        const find = activity.where("tripId", "==", secondTripRef);
        const activitySnapshot = await find.get();
        if (activitySnapshot.empty) {
          return [];  // or return null, or any other default value
        }
        const myData = activitySnapshot.docs.map(doc => doc.data());

        const resolvedData = await Promise.all(myData.map(async (activity) => {
          const tripData = (await activity.tripId.get()).data();
          const locationDataPromises = activity.locationId.map(locRef => locRef.get());
          const locationDatas = await Promise.all(locationDataPromises);

          return {
            ...activity,
            tripId: tripData,
            locationId: locationDatas.map(locationDoc => ({
              ...locationDoc.data(),
              Info: activity  // Assuming you want the entire activity here
            }))
          };
        }));

        return resolvedData;
      });

      const pubs = await Promise.all(pubsPromises);
      dispatch({ type: GET_PUBLIC_POST_SUCCESS, payload: pubs });

    } catch (error) {
      dispatch({ type: UNIVERSAL_ERROR, payload: error });
    }
  }
}

export function getMe(access_token) {
  return async (dispatch) => {
    try {
      // console.log(access_token);
      const { data } = await axios({
        url: BASE_URL + '/me',
        headers: {
          access_token
        }
      });
      dispatch({ type: PROFILE_SUCCESS, payload: data })
      await AsyncStorage.setItem("name", data.fullName)
    } catch (error) {
      dispatch({ type: UNIVERSAL_ERROR, payload: error })

    }
  }
}
export function getTripById(tripid, access_token) {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_LOADING, payload: true })
      const { data } = await axios.get(BASE_URL + '/trip/' + tripid, {
        headers: {
          access_token
        }
      })
      dispatch({ type: SUCCESS_FETCH_ADDED_POST, payload: data })
      dispatch({ type: SET_LOADING, payload: false })

    } catch (error) {
      console.log(error)
    }
  }
}

export function getDataTripById(tripId) {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_LOADING, payload: true })
      const db = firebase.firestore();
      const tripRef = db.collection("Trips")
      const find = await tripRef.doc(tripId).get()
      dispatch({ type: SET_LOADING, payload: false })

      return find.id

    } catch (error) {
      console.log(error)
    }
  }
}
export function getUserItinerary() {
  return async (dispatch) => {
    try {
      const userId = await AsyncStorage.getItem("id");
      console.log(userId)
      const db = firebase.firestore();

      const updateTrips = (querySnapshot, allTrips) => {
        const newTrips = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        return allTrips.concat(newTrips);
      };

      // Listening for changes in ownedTrips in real-time
      db.collection('Trips')
        .where('userId', '==', Number(userId))
        .onSnapshot(querySnapshot => {
          let allTrips = [];

          if (!querySnapshot.empty) {
            allTrips = updateTrips(querySnapshot, allTrips);
          }

          // Also check for invited trips
          db.collection('Trips')
            .where('invitedUser', 'array-contains', Number(userId))
            .onSnapshot(invitedSnapshot => {
              if (!invitedSnapshot.empty) {
                allTrips = updateTrips(invitedSnapshot, allTrips);
              }

              dispatch({ type: GET_LIST_ITINERARY_SUCCESS, payload: allTrips });
              dispatch({ type: SET_LOADING, payload: false });
            });
        });

    } catch (error) {
      console.error(error);
      dispatch({ type: SET_LOADING, payload: false });
    }
  }
}

// export function getUserItinerary(access_token) {
//     return async (dispatch) => {
//         try {
//             const userId = await AsyncStorage.getItem("id")
//             const db = firebase.firestore();
//             const ownedTripsQuery = await db
//                 .collection('Trips')
//                 .where('userId', '==', Number(userId))
//                 .get();

//             console.log(userId)
//             const invitedTripsQuery = await db
//                 .collection('Trips')
//                 .where('invitedUser', 'array-contains', Number(userId))
//                 .get();
//             console.log(invitedTripsQuery.docs)
//             let allTrips = [];

//             if (!ownedTripsQuery.empty) {
//                 allTrips = allTrips.concat(ownedTripsQuery.docs.map(doc => ({
//                     id: doc.id,
//                     ...doc.data()
//                 })));
//             }

//             if (!invitedTripsQuery.empty) {
//                 allTrips = allTrips.concat(invitedTripsQuery.docs.map(doc => ({
//                     id: doc.id,
//                     ...doc.data()
//                 })));
//             }
//             dispatch({ type: GET_LIST_ITINERARY_SUCCESS, payload: allTrips })
//             dispatch({ type: SET_LOADING, payload: false })
//         } catch (error) {
//             dispatch({ type: SET_LOADING, payload: false })

//         }

//         // console.log(allTrips)


//         // return allTrips;
//         // try {
//         //     dispatch({ type: SET_LOADING, payload: true })
//         //     const { data } = await axios.get(BASE_URL + '/trip',
//         //         {
//         //             headers: {
//         //                 access_token
//         //             }
//         //         }
//         //     )


//         // } catch (error) {
//         //     dispatch({ type: SET_LOADING, payload: false })

//         // dispatch({ type: UNIVERSAL_ERROR, payload: error })

//         // }
//     }
// }

export function postItinerary(access_token, body) {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_LOADING, payload: true })
      const image = await duckSearch(body.city)
      body.startDate = body.startDate.replaceAll("/", "-")
      body.endDate = body.endDate.replaceAll("/", "-")
      body.image = image
      const { data } = await axios.post(
        BASE_URL + "/trip",
        body,
        {
          headers: {
            access_token
          }
        }
      )
      const db = firebase.firestore()
      const ActivityRef = db.collection("Activities")
      const TripRef = db.collection("Trips").doc(data.id)
      const days = generateDates(body.startDate, body.endDate)
      const temp = []

      const totalDays = distanceInDays(body.startDate, body.endDate)
      for (let index = 0; index < totalDays; index++) {
        const body = {
          name: `Day ${index + 1}`,
          date: days[index],
          locationId: [],
          tripId: TripRef
        }
        const add = await ActivityRef.add(body)
        // console.log(add)
        console.log(add.id)
      }
      await dispatch({ type: ADD_POST_ITINERARY_SUCCESS, payload: data })
      await dispatch(getTripById(data.id, access_token))
      // await dispatch(getUserItinerary())
      await dispatch({ type: SET_LOADING, payload: false })

    } catch (error) {
      console.log(error.message)
      dispatch({ type: UNIVERSAL_ERROR, payload: error })

    }
  }
}
export function inviteUser(access_token, email, tripId) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        BASE_URL + '/trip/' + tripId + '/invite',
        "email=" + email,
        {
          headers: {
            access_token
          }
        }
      );
    } catch (error) {
      console.log(error)
    }

  }
}
export function loginAccount(email, password) {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_LOADING, payload: true })

      const { data } = await axios.post(
        BASE_URL + '/login',
        `email=${email}&password=${password}`,
      );
      // console.log(data)

      console.log(data.id, data.access_token)
      await AsyncStorage.setItem("access_token", `${data.id}`);
      dispatch({ type: LOGIN_SUCCESS, payload: { access_token: data.access_token, userId: data.id } })
      // await dispatch({ type: USER_ID_SUCCESS, payload: data.id })
      dispatch(getMe(data.access_token))
      dispatch(getPublic())
      dispatch({ type: SET_LOADING, payload: false })

    } catch (error) {
      dispatch({ type: UNIVERSAL_ERROR, payload: error })
    }
  }

}

export function postItineraryByBot(itineraryData, access_token) {
  return async (dispatch) => {
    try {
      await dispatch({ type: SET_LOADING, payload: true })
      const image = await duckSearch(itineraryData.city)
      itineraryData.startDate = itineraryData.startDate.replaceAll("/", "-")
      itineraryData.endDate = itineraryData.endDate.replaceAll("/", "-")
      itineraryData.image = image
      var options = {
        method: 'POST',
        url: BASE_URL + '/trip/bot',
        params: { city: itineraryData.city },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          access_token
        },
        data: {
          title: itineraryData.title,
          description: itineraryData.description,
          startDate: itineraryData.startDate,
          endDate: itineraryData.endDate,
          isPublic: itineraryData.isPublic,
          image: itineraryData.image
        }
      };
      const { data } = await axios.request(options)
      console.log(data)
      console.log()
      await dispatch({ type: ADD_POST_ITINERARY_SUCCESS, payload: data })
      await dispatch(getTripById(data.tripId, access_token))
      // await dispatch(getUserItinerary(access_token))
      await dispatch({ type: SET_LOADING, payload: false })

    } catch (error) {
      dispatch({ type: UNIVERSAL_ERROR, payload: error })
    }
  }
}