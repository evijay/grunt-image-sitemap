# grunt-image-sitemap

> A Grunt plugin for generating sitemaps

[![NPM version](https://img.shields.io/npm/v/grunt-image-sitemap.svg)](https://www.npmjs.com/package/grunt-image-sitemap)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A Grunt plugin to effortlessly generate an XML sitemap specifically for your website's images, following Google's Image Sitemaps guidelines. This helps search engines discover and index the images on your site more effectively.

---

## Getting Started

This plugin requires Grunt `>=0.4.0`.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, which explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins.

Once you're familiar with that process, you can install this plugin with this command:

```shell
npm install grunt-image-sitemap --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-image-sitemap');
```

## The "image_sitemap" Task

### Overview

In your project's `Gruntfile.js`, add a section named `image_sitemap` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  image_sitemap: {
    your_target: { // You can name your target anything you like
      options: {
        // Task-specific options go here
      },
      // Files to be processed (not directly used here as `imageSrc` in options is preferred)
      // src: ['path/to/images/**/*.{jpg,png,gif}']
    },
  },
});
```

### Options

`options.baseUrl`
Type: `String`

### Required

The absolute base URL of your website (e.g., `https://www.yourwebsite.com/`). This is crucial for constructing the full, valid URLs for your images in the sitemap.

`options.outputFile`

Type: `String`
Default: `'image-sitemap.xml'`

The path and filename where the generated image sitemap XML file will be saved. This path is relative to your `Gruntfile.js`.

`options.imageSrc`
Type: `Array<String>`
Default: `[]`

A list of [glob patterns](https://www.google.com/search?q=https://github.com/isaacs/node-glob%23glob-primer) specifying the location of your image files. The plugin will scan these paths to find images to include in the sitemap.

### Example

```js
imageSrc: [
  'dist/assets/images/**/*.jpg', // All JPGs in images folder and subfolders
  'dist/assets/images/**/*.png', // All PNGs
  'src/img/*.{gif,webp}'        // GIF and WebP images in a specific source folder
]
```

### Usage Examples

### Default Configuration

This example generates `image-sitemap.xml` in the root of your project (or specified `outputFile`), including all `.jpg` and `.png` images found within the `dist/assets/img` directory and its subdirectories.

```js
// Gruntfile.js
module.exports = function(grunt) {
  grunt.initConfig({
    image_sitemap: {
      default: {
        options: {
          baseUrl: '[https://www.example.com/](https://www.example.com/)',
          outputFile: 'dist/image-sitemap.xml',
          imageSrc: [
            'dist/assets/img/**/*.jpg',
            'dist/assets/img/**/*.png'
          ],
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-image-sitemap');
  grunt.registerTask('build', ['image_sitemap']);
};
```

To run this task:

```shell
grunt build
```

### Including Images from Multiple Locations

You can specify multiple glob patterns to gather images from different parts of your project.

```js
// Gruntfile.js
module.exports = function(grunt) {
  grunt.initConfig({
    image_sitemap: {
      my_site_images: {
        options: {
          baseUrl: '[https://www.mysuperwebsite.com/](https://www.mysuperwebsite.com/)',
          outputFile: 'sitemaps/my-images.xml', // Custom output path
          imageSrc: [
            'build/images/**/*.jpeg',
            'src/assets/photos/*.png',
            '!src/assets/photos/temp-*.png' // Exclude specific files
          ],
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-image-sitemap');
  grunt.registerTask('generate-sitemaps', ['image_sitemap:my_site_images']);
};
```

To run this task:

```shell
grunt generate-sitemaps
```

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

1. Fork the repository.

2. Create your feature branch (`git checkout -b feature/AmazingFeature`).

3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).

4. Push to the branch (`git push origin feature/AmazingFeature`).

5. Open a Pull Request.

### License

This project is licensed under the MIT [License](https://www.google.com/search?q=LICENSE) - see the LICENSE file for details.

### Changelog

* 2016-02-25 [v0.1.0] Initial release.
  * Core functionality for generating image sitemaps.
  * Options for `baseUrl`, `outputFile`, and `imageSrc`.
