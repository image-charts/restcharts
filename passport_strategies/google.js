'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GooglePassportStrategy;

var _passportGoogleOauth = require('passport-google-oauth20');

var _passportGoogleOauth2 = _interopRequireDefault(_passportGoogleOauth);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// import Auth from '../libs/Auth'


var GoogleStrategy = _passportGoogleOauth2.default.Strategy;

function GooglePassportStrategy(postgresClient) {
  return {
    strategy: GoogleStrategy,
    options: {
      clientID: _config2.default.google.appId,
      clientSecret: _config2.default.google.appSecret,
      callbackURL: _config2.default.google.loginCallbackUrl,
      passReqToCallback: true
    },
    handler: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, accessToken, refreshToken, profile, done) {
        var intInfo;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;

                // const auth = new Auth({ postgres: postgresClient, session: req.session })

                intInfo = Object.assign({}, profile, {
                  type: 'google',
                  unique_id: profile.id,
                  name: profile.name.givenName + ' ' + profile.name.familyName,
                  first_name: profile.name.givenName,
                  last_name: profile.name.familyName,
                  email: userEmail,
                  access_token: accessToken,
                  refresh_token: refreshToken
                });

                // const userId      = await auth.findOrCreateUser(intInfo)
                // const userRecord  = await auth.getUser(userId)
                // auth.login({ id: userId })

                return _context.abrupt('return', done(null, intInfo.unique_id));

              case 5:
                _context.prev = 5;
                _context.t0 = _context['catch'](0);

                done(_context.t0);

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 5]]);
      }));

      function GooglePassportHandler(_x, _x2, _x3, _x4, _x5) {
        return _ref.apply(this, arguments);
      }

      return GooglePassportHandler;
    }()
  };
}