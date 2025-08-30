const PropertyToken = artifacts.require("PropertyToken");
const PropertyTokenFactory = artifacts.require("PropertyTokenFactory");

module.exports = function (deployer) {
  deployer.deploy(PropertyTokenFactory);
};