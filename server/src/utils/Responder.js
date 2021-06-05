export const successRespond = (res, message, code, data, payload = {}) => res
  .status(200)
  .json({ success: true, code, message, data, ...payload })
  .end();

export const errorRespond = (res, message, code) => res
  .status(200)
  .json({ success: false, code, message })
  .end();

export const validationRespond = (res, message, code) => res
  .status(200)
  .json({ success: false, code, message })
  .end();
