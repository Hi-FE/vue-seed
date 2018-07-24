class Growingio {
  constructor({account_id, js_sdk}) {
    this.js_sdk = js_sdk
    this.account_id = account_id
    this.init(account_id)
  }

  init(account_id) {
    window._vds = [['setAccountId', account_id]]
  }

  requestSDK() {
    const { js_sdk, account_id } = this

    if (!js_sdk || !account_id) return this

    const vds = document.createElement('script')
    const header = document.getElementsByTagName('head')[0];

    vds.type = 'text/javascript';
    vds.async = true;
    vds.src = js_sdk

    header.append(vds)
  }
}

export default Growingio