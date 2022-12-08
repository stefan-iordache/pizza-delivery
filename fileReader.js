const { readFile } = require('fs/promises');

filePath =`${__dirname}/orders.json`;

module.exports = async (filePath) => {
	try {
		return await readFile(filePath);
	} catch (error) {
		console.error(`File reading error: ${error.message}`);
	}
}