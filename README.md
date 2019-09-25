# slideshow-js
This library allows you to create an interactive slideshow on your web page:

## Using the slideshow-js

### Step 1: Create the HTML structure
This example code shows how to put three images in the image gallery, but you
can add as many as you want. Just use multiple `<figure>` elements with the same
structure as a the first two.

```html
<section class=”my-slideshow”>

  <figure>
    <img src=”images/image1.png” height=”300”>
    <figcaption>Caption for image 1</figcaption>
  </figure>

  <figure>
    <img src=”images/image2.png” height=”300”>
    <figcaption>Caption for image 2</figcaption>
  </figure>

  <figure>
    <img src=”images/image4.png” height=”300”>
    <figcaption>Caption for image 4</figcaption>
  </figure>

</section>
```

Inside the figure element we have an `<img>` element (which you should be
familiar with), and a `<figcaption>` element. This is optional, but it serves as
a caption for the image.

Each figure element is contained within a `<section>` element, but we also need
to give this section a class name so that the script can easily identify it.


### Step 2: Add the stylesheet
You'll need to use the slideshow-js stylesheet in order to make things look
right. Add the stylesheet in the `<head>` element, before your own website's
stylesheets. This code snippet shows how to load the slideshow-js stylesheet
that's hosted on another server so you don't have to download it:

```html
<link rel="stylesheet" type="text/css" href="https://boldidea.org/static/webdev/slideshow-js/slideshow.css">
```

### Step 3: Add the javascript code
Use the `<script>` element to load the javascript library (the `slideshow.js`
file). Then use another `<script>` element to initialize the slideshow. The
following code snippet shows how to load the library from another server and
initialize it.

It's best to add javascript code at the end of your `<body>` element (just
before the `</body>` closing tag).

```html
<script src="https://boldidea.org/static/webdev/slideshow-js/slideshow.js"></script>
<script>makeSlideshow('.my-slideshow');</script>
```

The text in parentheses on the 2nd line is a CSS selector for the slideshow
container element. If your slideshow container has the class name
`"my-slideshow"`, you would use `'.my-slideshow'` for the part in parentheses.

*Important:* Be sure to always include the closing `</script>` tag! It's always
required, even when there's nothing inside the element.
