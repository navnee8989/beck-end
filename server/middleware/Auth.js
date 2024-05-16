const { verify } = require("jsonwebtoken");

function Validate(req, res, next) {
  const accessToken = req.header("accessToken");
  if (!accessToken) return res.json({ error: "accessToken denied" });
  try {
    const validToken = verify(accessToken, "importantsecret");
    req.user = validToken;
    if (validToken) {
      return next();
    }
  } catch (error) {
    return res.json({ error: error.message });
  }
}

module.exports = { Validate };
