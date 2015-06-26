(function (window, undefined) {
  function get(key) {

    var result = document.cookie.match('(?:^|; )' + window.encodeURIComponent(key) + '=([^;]+)');

    if (result === null) {
      return undefined;
    }

    return window.decodeURIComponent(result[1]);

  }

  function getRaw(key) {

    var result = document.cookie.match('(?:^|; )' + key + '=([^;]+)');

    if (result === null) {
      return undefined;
    }

    return result[1];

  }


  function set(key, value, options) {
    return setRaw(encodeURIComponent(key), encodeURIComponent(value), options);
  }

  function setRaw(key, value, options) {

    options = options || {};
    options.expires = options.expires || 365;
    options.path = options.path || '/';
    options.secure = options.secure || false;

    options.domain = options.domain || '.hao123.com';


    var cookieString = key + '=' + value + ';expires=' + getExpires(options.expires) + ';path=' + options.path + (options.secure ? ';secure' : '');
    if (options.domain != 'current') {
      cookieString += ';domain=' + options.domain;
    }
    document.cookie = cookieString;
  }

  function remove(key) {
    set(key, '', {expires: -1});
  }

  function has(key) {
    if (get(key) === undefined) {

      return false;
    }
    else {
      return true;
    }
  }

  function getBaiduId() {
    var baiduCookie = get('BAIDUID');
    if (baiduCookie) {
      return baiduCookie.split(':')[0];
    }
    else {
      return undefined;
    }
  }

  function getFlashId() {
    var flashCookie = get('FLASHID');
    if (flashCookie) {
      return flashCookie.split(':')[0];
    }
    else {
      return undefined;
    }
  }

  function getCSRFId() {
    var id = getFlashId();
    if (!id) {
      id = getBaiduId();
    }
    return id;
  }

  function getExpires(days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 86400000);
    return date.toUTCString();
  }

  window.cookie = {
    getRaw: getRaw,
    setRaw: setRaw,
    get: get,
    set: set,
    remove: remove,
    has: has,
    getBaiduId: getBaiduId,
    getFlashId: getFlashId,
    getCSRFId: getCSRFId
  };
})(window);

