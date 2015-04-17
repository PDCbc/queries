function FileNotFoundException(message) {
   this.message = message;
   this.name = "UserException";
}

module.exports = {
	FileNotFoundException: FileNotFoundException
}