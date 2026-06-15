const MAX_USERNAME_LENGTH = 50;

const sanitizeUsername = (value) => {
  const sanitized = value
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, "")
    .slice(0, MAX_USERNAME_LENGTH);

  return sanitized || "user";
};

const deriveUsernameFromEmail = (email) => {
  const localPart = email.split("@")[0] || "user";
  return sanitizeUsername(localPart);
};

const nextUsernameCandidate = (base, attempt) => {
  if (attempt <= 1) {
    return base;
  }
  return `${base}-${attempt}`;
};

module.exports = {
  sanitizeUsername,
  deriveUsernameFromEmail,
  nextUsernameCandidate,
};
