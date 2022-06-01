const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
	const token = req.header('x-auth-token');
	if (!token)
		return res.status(401).json("No token");

	try {
		const decoded = jwt.verify(token, "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY1MzkzMTkxMywiaWF0IjoxNjUzOTMxOTEzfQ.abdzEC_WlKiZmNwL1alx2q56jNHL1QSRPs1FMwN08hQ");
		req.user = decoded.user;
		next();

	} catch (err) {
		console.log("Invalid token");
		return res.sendStatus(400)
	}
}