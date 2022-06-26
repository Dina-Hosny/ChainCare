const hre = require("hardhat");

async function main() {
  const ElectronicHealthRecords = await hre.ethers.getContractFactory("ElectronicHealthRecords");
  const electronicHealthRecords = await ElectronicHealthRecords.deploy();
  await electronicHealthRecords.deployed();
  console.log("ElectronicHealthRecords deployed to:", electronicHealthRecords.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
