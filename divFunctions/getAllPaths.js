

const getAllPaths = () => {
  let routePaths = [];
  app._router.stack.forEach(function (r) {
    if (r.route && r.route.path) {
      routePaths.push(r.route.path);
    }
  });
  return routePaths;
};

module.exports = getAllPaths;
