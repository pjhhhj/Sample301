require.config({

  //baseUrl: "js/scripts",
  baseUrl: "",

  // alias libraries paths
  paths: {
    "angular": "angular",
    "ui-router": "angular-ui-router",
    "angularAMD": "angularAMD",

    "DefaultCtrl": "Controller_Default",
    "OtherCtrl": "Controller_Other"
  },

  shim: {
    "angularAMD": ["angular"],
    "ui-router": ["angular"]
  },

  deps: ['app']
});