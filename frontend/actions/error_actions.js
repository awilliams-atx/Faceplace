var Dispatcher = require('../dispatcher/dispatcher'),
    errorConstants = require('../constants/error_constants');

var ErrorActions = {
  clearErrors: function (errorType) {
    var actionType;
    if (errorType === 'login') {
      actionType = errorConstants.LOGIN_ERRORS_CLEARED;
    } else if (errorType === 'signUp') {
      actionType = errorConstants.SIGN_UP_ERRORS_CLEARED;
    }
    Dispatcher.dispatch({ actionType: actionType });
  },
  clearSignUpError: function (errorType) {
    Dispatcher.dispatch({
      actionType: errorConstants.SIGN_UP_ERROR_CLEARED,
      errorType: errorType
    });
  },
  setErrors: function (errors, errorType) {
    Dispatcher.dispatch({
      actionType: errorConstants.ERRORS_RECEIVED,
      errors: errors,
      errorType: errorType
    });
  }
};

module.exports = ErrorActions;
