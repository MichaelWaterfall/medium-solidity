require("@nomiclabs/hardhat-ethers");
const hre = require("hardhat");

async function main() {
  
  const Medium = await hre.ethers.getContractFactory("Medium");
  const medium = await Medium.deploy(
    "Medium Blog",
    "BLOG",
    "1000000000000000000" // 1 Matric
    );

  await medium.deployed();

  console.log("Medium deployed to:", medium.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
