const getTotalEnrolled = async () => {
  const dbase = require("../utils/connectDB");
  const lodash = require("lodash");
  const db = await dbase();
  // console.log(db);
  db.chain = lodash.chain(db.data);
  const users = db.chain.get("users").value();
  return users.length;
};

const getMarkedToday = async () => {
  const dbase = require("../utils/connectAttendanceDB");
  const lodash = require("lodash");
  const db = await dbase();
  db.chain = lodash.chain(db.data);
  const day = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  const attend = db.chain
    .get("attendance")
    .value()
    .map((item) => item.attendance);
  let totalAttend = [];
  for (let i = 0; i < attend.length; i++) {
    totalAttend = [...totalAttend, ...attend[i]];
  }
  //   console.log(totalAttend);
  return totalAttend.filter(
    (item) => item.month === month && item.day === day && item.year === year
  )?.length;
};
const getEachDayStats = async () => {
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
  const attend = db.chain
    .get("attendance")
    .value()
    .map((item) => item.attendance);
  let totalAttend = [];
  for (let i = 0; i < attend.length; i++) {
    totalAttend = [...totalAttend, ...attend[i]];
  }
  //   console.log(totalAttend);
  let eachDay = [];
  // console.log(`${year}-${month}-${day}`);
  for (let i = 0; i < 7; i++) {
    let currentDayNumberLength = totalAttend.filter(
      (item) =>
        item.month === month &&
        new Date(`${item.year}-${item.month + 1}-${item.day}`).getDay() === i &&
        item.year === year
    )?.length;
    let today = { day: weekDays[i], attendance: currentDayNumberLength };
    eachDay.push(today);
  }
  return eachDay;
};

const getTimeStats = async () => {
  const dbase = require("../utils/connectAttendanceDB");

  const lodash = require("lodash");
  const db = await dbase();
  db.chain = lodash.chain(db.data);
  const day = new Date().getDay();
  const { _24to12 } = require("../utils/formatTime");

  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  const attend = db.chain
    .get("attendance")
    .value()
    .map((item) => item.attendance);
  let totalAttend = [];
  for (let i = 0; i < attend.length; i++) {
    totalAttend = [...totalAttend, ...attend[i]];
  }
  //   console.log(totalAttend);
  let time = [];
  for (let i = 0; i < 24; i++) {
    let currentTimeNumberLength = totalAttend.filter(
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

const stats = async (event, arg) => {
  const totalEnrolled = await getTotalEnrolled();
  const markedToday = await getMarkedToday();
  const weekStats = await getEachDayStats();
  const timeStats = await getTimeStats();
  return event.sender.send("stats-res", {
    totalEnrolled,
    markedToday,
    weekStats,
    timeStats,
  });
};

module.exports = {
  stats,
};
