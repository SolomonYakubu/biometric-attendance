const { debugPort } = require("process");

const getData = async (event, isDev, _id) => {
  const exec = require("child_process").exec;
  const dbase = require("../utils/connectDB");
  const lodash = require("lodash");
  let response;

  const path = require("path");
  const fs = require("fs");

  await exec(
    `cd .exec & fcmb.exe ./ ${_id}`,
    async function (error, stdout, stderr) {
      // if (stdout.split("\n")[2]) {
      //   response = stdout.split("\n")[2]?.slice(0, 28).trim();
      // } else {
      //   response = stdout.split("\n")[1]?.slice(0, 28).trim();
      // }
      response = stdout.split("\n")[2]?.slice(0, 28).trim();
      // console.log(stdout);
      console.log(response);

      if (
        !error &&
        (response == "" || response == "Fingerprint image is written")
      ) {
        const currentPath = path.resolve(".exec", `${_id}.xyt`);
        const newPath = path.resolve(".db", `${_id}.xyt`);
        // const currentImagePath = path.join("./", ".exec/bmp", `${rand}.bmp`);
        // const newImagePath = `./src/img/${rand}.bmp`;
        // fs.renameSync(currentImagePath, newImagePath, (err) => {
        //   if (err) {
        //     // throw err;
        //     // return;
        //   }
        // });
        fs.renameSync(currentPath, newPath, (err) => {
          if (err) {
            // throw err;
            // return;
          } else {
          }
        });
        const minPath = path.resolve(".db", "m.lis");
        const startPath = path.resolve(".db");
        // if (!fs.existsSync(minPath)) {
        fs.writeFile(`${minPath}`, "", (err) => {});
        // }

        const files = fs.readdirSync(startPath);
        for (let i = 0; i < files.length; i++) {
          let filename = path.join(startPath, files[i]);
          let stat = fs.lstatSync(filename);
          if (filename.endsWith(".xyt")) {
            fs.appendFile(
              minPath,
              path.resolve(filename + "\n"),
              "utf8",
              (err) => {
                if (err) throw err;
              }
            );
          }
        }

        // console.log(minPath);
        // console.log(path.join(__dirname, "..", ".db", `${_id}.xyt\n`));
        const res = {
          error: false,
          status: "success",
          file: isDev
            ? path.join(".exec/bmp", `${_id}.bmp`)
            : path.join(process.resourcesPath, "..", ".exec/bmp", `${_id}.bmp`),
        };
        const db = await dbase();
        db.chain = lodash.chain(db.data);
        db.chain.get("users").find({ _id }).value().scanned = true;
        await db.write();
        return event.sender.send("scanResult", res);
      } else if (response === undefined) {
        console.log("connect scanner");
        const res = {
          error: true,
          status: "connect scanner",
        };
        return event.sender.send("scanResult", res);
      } else {
        const res = {
          error: true,
          status: "try again",
        };
        return event.sender.send("scanResult", res);
      }
    }
  );
};

module.exports = {
  getData,
};
