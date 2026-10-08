const fs = require("node:fs");
const ts = require("typescript");
exports.load = (filename) => {
  const result = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  });
  const module = { exports: {} };
  new Function("module", "exports", "require", result.outputText)(
    module,
    module.exports,
    require,
  );
  return module.exports;
};
