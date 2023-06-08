import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { PieChart, Pie, ResponsiveContainer } from "recharts";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";

export default function Stats() {
  const [data, setData] = useState([]);
  const getStats = (event) => {
    console.log(event.data);
    setData(event.data);
    if (event.source === window) {
      if (event.data.error) {
      } else {
      }
    }
    window.removeEventListener("message", getStats);
  };

  useEffect(() => {
    electron.stats();
    window.addEventListener("message", getStats);
  }, []);

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const attendanceData = data?.attendanceData;

  const excelExport = () => {
    const date = `${new Date().getDate()}_${new Date().getMonth()}_${new Date().getFullYear()}`;
    const fileName = "report" + "_" + date;
    const ws = XLSX.utils.json_to_sheet(attendanceData);

    ws["A1"].s = {
      // set the style for target cell
      font: {
        sz: 13,
        bold: true,
        color: {
          rgb: "#000",
        },
      },
    };
    ws["B1"].s = {
      // set the style for target cell
      font: {
        sz: 13,
        bold: true,
        color: {
          rgb: "#000",
        },
      },
    };
    ws["C1"].s = {
      // set the style for target cell
      font: {
        sz: 13,
        bold: true,
        color: {
          rgb: "#000",
        },
      },
    };
    ws["D1"].s = {
      // set the style for target cell
      font: {
        sz: 13,
        bold: true,
        color: {
          rgb: "#000",
        },
      },
    };
    ws["E1"].s = {
      // set the style for target cell
      font: {
        sz: 13,
        bold: true,
        color: {
          rgb: "#000",
        },
      },
    };
    // prettier-ignore
    const wb = { Sheets: { "data": ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  return (
    <div className="container pt-6 pb-14">
      <h1 className="text-white text-5xl my-2">Stats</h1>
      <div className="sub-container flex flex-col justify-center items-center p-5 w-4/5">
        <div className="flex flex-wrap justify-center gap-2 items-start p-8">
          <div className="bg-bg1 text-lg text-white p-3 h-48 w-72 flex flex-col justify-around flex-1">
            <div className="bg-bg2 font-bold w-100 h-2/5 flex items-center p-3">
              Total Enrolled: {data.totalEnrolled}
            </div>
            <div className="bg-bg2 font-bold w-100 h-2/5 flex items-center p-3">
              Marked today: {data.markedToday}
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <BarChart
              width={500}
              height={300}
              data={data.weekStats}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
              <XAxis dataKey="day" stroke="#8884d8" />
              <YAxis dataKey="attendance" stroke="#8884d8" />
              <Tooltip />
              <Legend />
              <Bar dataKey="attendance" fill="#8884d8" />
              {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
            </BarChart>
            <h3 className="font-bold text-lg text-white">
              Each Day Attendance Frequency
            </h3>
          </div>
        </div>
        {/* <ResponsiveContainer width="100%" height="100%"> */}
        <PieChart width={400} height={400}>
          <Pie
            dataKey="attendance"
            isAnimationActive={true}
            data={data.timeStats}
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
            stroke="blue"
            strokeWidth={2}
          />
          {/* <Pie dataKey="value" data={data01} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" /> */}
          <Tooltip />
        </PieChart>
        <h3 className="font-bold text-lg text-white">
          Attendance Frequency By Time
        </h3>
        {/* </ResponsiveContainer> */}
        <button className="btn btn-primary my-10" onClick={() => excelExport()}>
          Download Attendance
        </button>
      </div>
    </div>
  );
}
