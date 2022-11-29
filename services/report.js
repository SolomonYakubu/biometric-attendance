const getProfile = async (_id) => {
  const dbase = require("../utils/connectDB");

  const lodash = require("lodash");
  const db = await dbase();

  // console.log(db);
  db.chain = lodash.chain(db.data);
  const user = db.chain.get("users").find({ _id }).value();
  return user;
};

const getMonthAttendance = async (_id) => {
  const dbase = require("../utils/connectAttendanceDB");
  const lodash = require("lodash");
  const db = await dbase();
  db.chain = lodash.chain(db.data);
  const day = new Date().getDay();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  const attend = db.chain.get("attendance").find({ _id }).value()?.attendance;

  return attend?.filter((item) => item.month === month && item.year === year)
    ?.length;
};
const getTotalAttendance = async (_id) => {
  const dbase = require("../utils/connectAttendanceDB");
  const lodash = require("lodash");
  const db = await dbase();
  db.chain = lodash.chain(db.data);

  const attend = db.chain.get("attendance").find({ _id }).value()?.attendance;

  return attend?.length;
};
const getEachDayStats = async (_id) => {
  const dbase = require("../utils/connectAttendanceDB");
  const lodash = require("lodash");
  const db = await dbase();
  db.chain = lodash.chain(db.data);
  const day = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const attend = db.chain.get("attendance").find({ _id }).value()?.attendance;

  //   console.log(totalAttend);
  let eachDay = [];
  for (let i = 0; i < 7; i++) {
    let currentDayNumberLength = attend?.filter(
      (item) =>
        item.month === month &&
        new Date(`${item.year}/${item.month + 1}/${item.day}`).getDay() === i &&
        item.year === year
    )?.length;
    let today = { day: weekDays[i], attendance: currentDayNumberLength };
    eachDay.push(today);
  }
  return eachDay;
};

const getTimeStats = async (_id) => {
  const dbase = require("../utils/connectAttendanceDB");
  const lodash = require("lodash");
  const db = await dbase();
  db.chain = lodash.chain(db.data);
  const day = new Date().getDay();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const { _24to12 } = require("../utils/formatTime");
  const attend = db.chain.get("attendance").find({ _id }).value()?.attendance;

  //   console.log(totalAttend);
  let time = [];
  for (let i = 0; i < 24; i++) {
    let currentTimeNumberLength = attend?.filter(
      (item) =>
        item.month === month &&
        item.time.split(":")[0] == i &&
        item.year === year
    )?.length;
    let hours = {
      name: `${_24to12(`${i}:0`)} - ${_24to12(
        `${(i < 23 && `${i + 1}:0`) || "0:0"}`
      )}`,
      attendance: currentTimeNumberLength,
    };
    time.push(hours);
  }
  return time;
};

const report = async (event, staffId) => {
  const dbase = require("../utils/connectDB");
  const lodash = require("lodash");
  const db = await dbase();
  console.log(staffId);
  db.chain = lodash.chain(db.data);
  const _id = db.chain.get("users").find({ staffID: staffId }).value()?._id;
  const profile = await getProfile(_id);
  const monthAttendance = await getMonthAttendance(_id);
  const totalAttendance = await getTotalAttendance(_id);
  const weekStats = await getEachDayStats(_id);
  const timeStats = await getTimeStats(_id);
  console.log(staffId);
  return event.sender.send("report-res", {
    profile,

    monthAttendance,
    totalAttendance,
    weekStats,
    timeStats,
  });
};

module.exports = {
  report,
};
