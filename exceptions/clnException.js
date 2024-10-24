class ClnException extends Error {
    constructor(code, message, status) {
      super(message);
  
      this.name = this.constructor.name;
  
      this.status = status || 500;
      this.code = code || "CLN000";

      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = ClnException;
  