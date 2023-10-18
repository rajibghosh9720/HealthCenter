const express = require("express");
const app = express();
const ABI = require("./ABI.json");

const { Web3 } = require("web3");

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());

let web3 = new Web3(
  "https://misty-powerful-pool.ethereum-sepolia.discover.quiknode.pro/ce55e24c2b5846bbcf00ac368d274953c37b3f87/"
);

const contractAddress = "0x143Db069924e7f8cb69f99BEB4Ce788c5f29a009";
const contract = new web3.eth.Contract(ABI, contractAddress);
// console.log(Doctorcontract);

// const retreiveDoctorDetails = async () => {
//   const task = await Doctorcontract.methods.retreiveDoctorDetails(101).call();
//   // console.log(task);
// };
// retreiveDoctorDetails();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/DoctorDetails/view/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await contract.methods.retrieveDoctorDetails(id).call();
    const {
      doctorLicenseId,
      doctorName,
      doctorAddress,
      doctorSpecialization,
      doctorPhone,
      hospitalId,
      D_regId,
    } = task;

    const numdoctorLicenseId = Number(doctorLicenseId);
    const numdoctorPhone = Number(doctorPhone);
    const numhospitalId = Number(hospitalId);
    const numD_regId = Number(D_regId);

    const retreiveDoctorDetailsObj = {
      numdoctorLicenseId,
      doctorName,
      doctorAddress,
      doctorSpecialization,
      numdoctorPhone,
      numhospitalId,
      numD_regId,
    };
    res.status(200).json({ status: 200, retreiveDoctorDetailsObj });
  } catch (error) {
    res.status(500).json({ error });
    console.log(error);
  }
});

app.post("/add-doctor", async (req, res) => {
  try {
    const { doctorLicenseId } = req.body;

    const isDoctorPresent = await contract.methods
      .isDoctorExists(doctorLicenseId)
      .call();
    const check = Number(isDoctorPresent);
    console.log(check);
    if (check == 1) {
      res
        .status(400)
        .json({ status: 400, error: "Doctor License Id already exists" });
    } else {
      res.status(200).json({
        status: 200,
        message: "Doctor License Id is not already exists ",
      });
    }
  } catch (error) {
    console.error(error);
  }
});

app.post("/update-doctor", async (req, res) => {
  try {
    const { doctorLicenseId } = req.body;

    const isDoctorPresent = await contract.methods
      .isDoctorExists(doctorLicenseId)
      .call();
    const check = Number(isDoctorPresent);
    console.log(check);
    if (check == 1) {
      res
        .status(200)
        .json({ status: 200, error: "Doctor License eligible for update" });
    } else {
      res.status(400).json({
        status: 400,
        message: "Doctor License Id is not eligible for update ",
      });
    }
  } catch (error) {
    console.error(error);
  }
});

app.post("/add-hospital", async (req, res) => {
  try {
    const { hospitalId } = req.body;

    const isHospitalPresent = await contract.methods
      .isHospitalExists(hospitalId)
      .call();
    const check = Number(isHospitalPresent);
    console.log(check);
    if (check == 1) {
      res
        .status(400)
        .json({ status: 400, error: "Hospital Id already exists" });
    } else {
      res.status(200).json({
        status: 200,
        message: "Hospital Id is not already exists ",
      });
    }
  } catch (error) {
    console.error(error);
  }
});

app.post("/update-hospital", async (req, res) => {
  try {
    const { hospitalId } = req.body;

    const isHospitalPresent = await contract.methods
      .isHospitalExists(hospitalId)
      .call();
    const check = Number(isHospitalPresent);
    console.log(check);
    if (check == 1) {
      res
        .status(200)
        .json({ status: 200, error: "Hospital Id eligible for update" });
    } else {
      res.status(400).json({
        status: 400,
        message: "Hospital Id is not eligible for update ",
      });
    }
  } catch (error) {
    console.error(error);
  }
});

app.get("/HospitalDetails/view/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await contract.methods.retreiveHospitalDetails(id).call();
    const {
      hospitalId,
      hospitalName,
      contactNumber,
      hospitalAddress,
      hospitalSpec,
      regId,
    } = task;

    const numhospitalId = Number(hospitalId);
    const numcontactNumber = Number(contactNumber);
    const numhospital_regId = Number(regId);

    const retreiveHospitalDetailsObj = {
      numhospitalId,
      hospitalName,
      numcontactNumber,
      hospitalAddress,
      hospitalSpec,
      numhospital_regId,
    };
    res.status(200).json({ status: 200, retreiveHospitalDetailsObj });
  } catch (error) {
    res.status(500).json({ error });
    console.log(error);
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running localhost:${PORT}`);
});
