const router = require("express").Router();
const{postSignup} = require("../controllers/auth.controller");
const{postLogin} = require("../controllers/auth.controller");
const { userValidationSchema } = require("../validations/user.validator");
const { loginBodyValidationSchema } = require("../validations/auth.validator");
const { validateSchema } = require("../middlewares/validate.middleware");

const middleware = validateSchema(userValidationSchema);
const loginMiddleware = validateSchema(loginBodyValidationSchema);

router.post("/signup",middleware,postSignup);
router.post("/login",loginMiddleware,postLogin);

module.exports = router;