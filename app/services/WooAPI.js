export default WooAPI;

function WooAPI(opt) {
  if (!(this instanceof WooAPI)) {
      return new WooAPI(opt);
  }

  opt = opt || {};

  if (!(opt.url)) {
      throw new Error('url is required');
  }
}
