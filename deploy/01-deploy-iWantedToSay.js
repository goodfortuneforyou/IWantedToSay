const { ethers, network } = require("hardhat");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const iWantedToSay = await deploy("IWantedToSay", {
    from: deployer,
    log: true,
    args: [],
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  if (network.config.chainId == 5 && process.env.ETHERSCAN_API_KEY) {
    await verify(iWantedToSay.address, []);
  }
  console.log(`contract deploy at ${iWantedToSay.address}`);
};
module.exports.tags = ["all", "iwantedtosay"];
