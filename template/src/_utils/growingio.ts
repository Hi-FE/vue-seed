class Growingio {
  js_sdk: string
  account_id: string

  constructor({ js_sdk, account_id }: { js_sdk: string, account_id: string }) {
    this.js_sdk = js_sdk
    this.account_id = account_id
    this.init(account_id)
  }

  init(account_id: string) {
    window._vds = [['setAccountId', account_id]]
  }

  install() {
    const { js_sdk, account_id } = this

    if (!js_sdk || !account_id) return this

    const vds = document.createElement('script')
    const header = document.getElementsByTagName('head')[0];

    vds.type = 'text/javascript';
    vds.async = true;
    vds.src = js_sdk

    header.appendChild(vds)
  }
}

export default Growingio