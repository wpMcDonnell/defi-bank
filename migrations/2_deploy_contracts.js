const Token = artifacts.require("Token");
const defiBank = artifacts.require("defiBank");

module.exports = async function(deployer) {
	//deploy Token
	await deployer.deploy(Token)
	//assign token into variable to get it's address
	const token = await Token.deployed()

	//pass token address for defiBank contract(for future minting)
	await deployer.deploy(defiBank, token.address)
	//assign defiBank contract into variable to get it's address
	const defibank = await defiBank.deployed()
	//change token's owner/minter from deployer to defiBank
	await token.passMinterRole(defibank.address)
};
