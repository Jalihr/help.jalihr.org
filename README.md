# help.jalihr.org

The JaliHR help centre: step-by-step guides for people using the product.
Plain HTML and CSS, no build step.

Published with GitHub Pages from the `main` branch. Any commit to `main` is
live on https://help.jalihr.org within about a minute, so editing a file here
is the whole deploy process.

This is the sibling of [jalihr.org](https://github.com/Jalihr/jalihr.org), the
marketing site. The two split by audience, not by topic: jalihr.org sells and
publishes the knowledge hub, help.jalihr.org answers "how do I do that in
JaliHR". `assets/css/style.css` and `assets/css/nav.css` are copied from
jalihr.org so both sites look like one system; change them there first and copy
the change across.

## Layout

Every page lives in its own directory as `index.html`, so it serves at a clean
URL with no `.html` extension. All internal links and every `/assets/...`
reference use absolute paths for this reason. Links to jalihr.org and
app.jalihr.org are absolute and fully qualified, because those are other hosts.

```
index.html                            Help home: search box, then one card per topic
equipment/add-equipment/index.html    Article: add an item to the equipment register
404.html                              Served by GitHub Pages for any unknown path
assets/css/style.css                  Copied from jalihr.org: colour, type, spacing, buttons, footer
assets/css/nav.css                    Copied from jalihr.org: the shared top nav
assets/css/help.css                   Help-centre layout only: search, topic cards, article prose
assets/js/help.js                     Filters the home page's article list as the reader types
CNAME                                 Custom domain for GitHub Pages
robots.txt
sitemap.xml
.nojekyll                             Serve the files as they are, with no Jekyll build
```

## Adding an article

1. Copy `equipment/add-equipment/index.html` to `<topic>/<slug>/index.html`.
2. Change the `<title>`, the description, the canonical and `og:url`, the
   eyebrow, the heading and the breadcrumb.
3. Add a link to it in the matching topic card in `index.html`, replacing that
   card's `<p class="help-cat__empty">` with a `<ul class="help-cat__articles">`
   if it is the topic's first article.
4. Add the URL to `sitemap.xml`.

The home page is the search index: `help.js` matches on the text already in
those cards, so an article nobody linked from `index.html` cannot be found.

## Writing the articles

Each article describes the product as it actually behaves, named field by named
field. Write them from a run through the real screen or from a recorded demo,
never from the code alone, and use the labels the user sees.

## Topic cards

The home page carries a card per topic whether or not it has articles yet, so
the shape of the help centre is visible from day one. A topic gets its own
index page only once it has more articles than its card can hold.
