module.exports = {
  extends: [
    "stylelint-config-airbnb", //"stylelint-config-idiomatic-order",
    "stylelint-prettier/recommended"
    ],
  plugins: [
    //"stylelint-order",
    "stylelint-scss"],
  rules: {
    "indentation": 2,
    "number-leading-zero": null,
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true
  }
};

// module.exports = {
//   extends: ["stylelint-config-airbnb", "stylelint-config-idiomatic-order", "stylelint-prettier/recommended"],
//   plugins: ["stylelint-order", "stylelint-scss"],
//   rules: {}
// };

// module.exports = {
//   extends: ["stylelint-config-standard",
//             "stylelint-config-rational-order",
//             "stylelint-prettier/recommended",
//             "stylelint-config-sass-guidelines"
//           ],
//   plugins: ["stylelint-order", "stylelint-scss"],
//   rules: {
//     "indentation": 2,
//     "number-leading-zero": null,
//     "at-rule-no-unknown": null,
//     "scss/at-rule-no-unknown": true
//   }
// };
