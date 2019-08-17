const createMessageObject = (statusType, message, data = null) => ({
  status: statusType,
  data,
  message,
});

module.exports = createMessageObject;
