const asyncHandler = require("express-async-handler");

/**
 * @desc
 * @route /api/v0/
 * @method
 * @access
 */
module.exports.Ctrl = asyncHandler(async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});

/**
 * @desc user registration
 * @route /api/v0/auth/register
 * @method POST
 * @access public
 */
module.exports.registerUserCtrl = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "HTTP 500 - Internal Server Error" });
  }
});
