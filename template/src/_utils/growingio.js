class Growingio {
  constructor({account_id}) {
    this.sdk = '//dn-growing.qbox.me/vds.js'
    this.init(account_id)
  }

  init(account_id) {
    window._vds = [['setAccountId', account_id]]
  }

  requestSDK() {
    const { sdk } = this
    const vds = document.createElement('script')
    const header = document.getElementsByTagName('head')[0];

    vds.type = 'text/javascript';
    vds.async = true;
    vds.src = sdk

    header.insertBefore(vds, s);
  }
}

export default Growingio