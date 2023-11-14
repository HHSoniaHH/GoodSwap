const { check, validationResult } = require('express-validator');

exports.validateUserSignUp = [
  
    check('fname').trim().not().isEmpty().withMessage('Vous devez inserez un nom!').isString()
   .withMessage('Must be a valid name!').isLength({ min: 3, max: 20 })
   .withMessage('Inserez un nom entre 3 et 20!'),
   check('lname').trim().not().isEmpty().withMessage('Vous devez inserez un prénom!').isString()
   .withMessage('Must be a valid name!').isLength({ min: 3, max: 20 })
   .withMessage('Inserez un prénom entre 3 et 20!'),
   check('email').not().isEmpty().withMessage('Vous devez inserez une adesse email').normalizeEmail().isEmail().withMessage('Vous devez inserez une adresse email valide!'),
  
   check('password').trim().not().isEmpty().withMessage('Vous devez inserez un mot de passe!').isLength({ min: 8, max: 20 })
  .withMessage('Inserez un mot de passe entre 8 et 20!'),
   
   check('confirmPassword').trim().not().isEmpty().custom(
    (value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('les mots passes ne sont pas cohérents!');
      }
      return true;
    }),
];


exports.userVlidation = (req, res, next) => {
    const result = validationResult(req).array();
    if (!result.length) return next();

    const error = result[0].msg;
    res.json({ success: false, message: error });
  };

  exports.validateUserSignIn = [
    check('email').trim().isEmail().withMessage('email / password is required!'),
    check('password')
      .trim()
      .not()
      .isEmpty()
      .withMessage('email / password is required!'),
  ];