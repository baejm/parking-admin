module.exports = {
  transpileDependencies: ["vuetify"],
  publicPath: "/parking-admin",
  devServer: {
    // overlay: false
    //  host: 'test_admin.sunil-ezp.com',
    //
    host: "0.0.0.0",
    hot: true,
    disableHostCheck: true,
    port: "3001"
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder

        appId: "parking.sunil",
        nsis: {
          shortcutName: "sunil parking",
          oneClick: false
        }
      }
    }
  }
}
