/**
 * react-native CLI config.
 *
 * `assets` registers font/image folders for `npx react-native-asset` if you
 * later add custom fonts. The VPE SDK and all native modules here are
 * autolinked, so no manual `dependencies` entries are required.
 */
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./assets'],
};
