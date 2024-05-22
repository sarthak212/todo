function verifyStatus(status) {
  if (["Todo", "In_progress", "Done"].includes(status)) {
    return null;
  }
  return true;
}

module.exports = { verifyStatus };
