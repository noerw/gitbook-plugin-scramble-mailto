# gitbook-plugin-scramble-mailto

This gitbook plugin scrambles / obscures `mailto` links found in the book source.
Requires `gitbook >=3.1.0`.

The email address may be obscured according to 2 methods, selectable in your `book.json`:

- `jsFunction`: opens a on the fly generated mailto link via javascript (default)
- `htmlEncode`: replaces the email address with a randomly encoded version


Currently the filter applies to any `<a>`-tag with a `mailto:` in the href.

If you write the email not only in the `href` but also in the rendered text of an anchor, a safe replacement is not guaranteed.

## usage

1. add the plugin to your `book.json`, and optionally configure it. example:

    ```
    {
      "gitbook": "3.1.0",
      "plugins": [ "scramble-mailto"],
      "scramble-mailto": {
        "scrambleMethod": "htmlEncode" // optional, defaults to "jsFunction"
      }
    }
    ```

2. run `gitbook install`

3. hopefully stay safe from spambots ;)

## license

LGPL-3.0
