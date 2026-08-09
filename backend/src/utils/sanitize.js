const sanitizeUser = (user) => {
  if (!user) return user;
  const { passwordHash, ...safeUser } = user;
  return safeUser;
};

const decimalToNumber = (value) => (value === null || value === undefined ? value : Number(value));

const serializeLocation = (location) => {
  if (!location) return location;
  return {
    ...location,
    latitude: decimalToNumber(location.latitude),
    longitude: decimalToNumber(location.longitude),
    accuracy: decimalToNumber(location.accuracy)
  };
};

const serializeEmergency = (event) => {
  if (!event) return event;
  return {
    ...event,
    latitude: decimalToNumber(event.latitude),
    longitude: decimalToNumber(event.longitude)
  };
};

module.exports = { sanitizeUser, serializeLocation, serializeEmergency };
