var cfg = null;

var scrambleMethods = {
  /**
   * Call a js function (./assets/scramble-mailto.js) on click,
   * wich then opens a generated mailto link. [default]
   */
  'jsFunction': function(match, preAt, postAt, displayText) {
    return [
      '<a href="#" onclick="openMail(\'', preAt, '\',\'', postAt, '\')">', encode(displayText), '</a>'
    ].join('');
  },

  /**
   * Encode the email address with several randomly mixed encodings.
   * Probably not as safe as 'jsFunction', but doesnt require client JS
   */
  'htmlEncode': function(match, preAt, postAt, displayText) {
    return match
      .replace(preAt, encode(preAt, true))
      .replace('@', '%40')
      .replace(postAt, encode(postAt, true))
      .replace(displayText, encode(displayText));
  }
};

/**
 * Encode a string with randomly mixed encodings (html entity, URI, plaintext).
 * @param {string} originalString  The string to encode
 * @param {boolean} useURIEncode   Wether to use URI encoding. defaults to false
 * @returns {string} The encoded string
 */
function encode(originalString, useURIEncode) {
  var i, chr, encodingOpt, result = '';
  for (i = 0; i < originalString.length; ++i) {
    chr = Number(originalString.charCodeAt(i));
    encodingOpt = Math.random() * 5;
    // encode as URI component if not first character, and not ? & or =
    if (useURIEncode && encodingOpt > 3 && [63, 61, 38].indexOf(chr) === -1 && i !== 0)
      result += '%' + chr.toString(16)
    else if (encodingOpt > 2)
      result += '&#x' + chr.toString(16) + ';';
    else if (encodingOpt > 1)
      result += '&#' + chr.toString() + ';';
    else
      result += originalString[i];
  }
  return result;
}

module.exports = {
  website: {
    assets: './assets',
    js: ['scramble-mailto.js']
  },
  hooks: {
    'init': function() {
      cfg = this.config.get('pluginsConfig.scramble-mailto');
    },
    'page': function(page) {
      if (this.output.name !== 'website') // apply on the website renderer only
        return page;

      if (typeof scrambleMethods[cfg.scrambleMethod] !== 'function')
        return this.log.error('invalid mailto scramble method "' + cfg.scrambleMethod + '"');

      for (var i = 0; i < page.sections.length; ++i) {
        page.sections[i].content = page.sections[i].content
          .replace(/<a[^>]*?href="mailto:([^\"]+)@([^\"]+)"[^>]*>([^<]*)<\/a>/gi, scrambleMethods[cfg.scrambleMethod]);
      }

      return page;
    }
  }
};
