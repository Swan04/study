var business = {
  queryAll: "SELECT * FROM businessCircle  WHERE city LIKE ? AND name LIKE ? AND county LIKE ? ORDER BY updateTime DESC LIMIT ?,?"
};

module.exports = business;