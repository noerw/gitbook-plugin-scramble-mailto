/**
 * open a mailto link with a given email address
 * @param {string} pre  Content of the adress before the '@'
 * @param {string} post Content of the adress after the '@',
 *                      may include additional mailto link args
 */
function openMail(pre, post) {
  var s = ['mailto', pre];
  window.location.href = s.join(':') + '@' + post;
}
