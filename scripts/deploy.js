const fs = require('fs');
const path = require('path');
const hre = require('hardhat');

async function main() {
  const { ethers, artifacts } = hre;

  const pricePerToken = ethers.utils.parseEther("0.1");
  const totalShares = 1000; // example

  const PropertyToken = await ethers.getContractFactory("PropertyToken");
  const prop = await PropertyToken.deploy(pricePerToken, totalShares);
  await prop.deployed();

  console.log("PropertyToken deployed to:", prop.address);

  // read the compiled artifact (has abi)
  const artifact = await artifacts.readArtifact("PropertyToken");

  // paths into your React app
  const outAbiDir = path.join(__dirname, "..", "client", "src", "abis");
  const outAddrDir = path.join(__dirname, "..", "client", "src", "contracts");

  // ensure folders exist
  fs.mkdirSync(outAbiDir, { recursive: true });
  fs.mkdirSync(outAddrDir, { recursive: true });

  // write artifact (containing abi, bytecode, etc.)
  fs.writeFileSync(
    path.join(outAbiDir, "PropertyToken.json"),
    JSON.stringify(artifact, null, 2)
  );

  // write deployed address
  fs.writeFileSync(
    path.join(outAddrDir, "PropertyToken-address.json"),
    JSON.stringify({ address: prop.address }, null, 2)
  );

  console.log("ABI and address saved to client/src/");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;

});