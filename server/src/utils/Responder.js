export const successRespond = (res, message, code, data, payload = {}) => res
  .status(code)
  .json({ success: true, code, message, data, ...payload })
  .end();

export const errorRespond = (res, message, code) => res
  .status(code)
  .json({ success: false, code, message })
  .end();
