// tasks/image_sitemap.js
module.exports = function(grunt) {
  'use strict';

  const xmlbuilder = require('xmlbuilder');
  const path = require('path');
  const URL = require('url').URL; // Node.js URL API for robust URL construction

  grunt.registerMultiTask('image_sitemap', 'Generates an XML sitemap for images.', function() {
    // Merge task-specific and/or target-specific options with default options.
    const options = this.options({
      baseUrl: '',              // Required: Your website's base URL
      outputFile: 'image-sitemap.xml', // Where to save the sitemap
      imageSrc: [],             // Globs for image files
      // Optional: Add options for image:caption, image:title, etc., here if needed
    });

    // Check if baseUrl is provided
    if (!options.baseUrl) {
      grunt.log.error('Error: "baseUrl" option is required for image sitemap generation. Please provide it in your Gruntfile.');
      return false; // Abort task
    }

    // Expand the image source paths
    const imageFiles = grunt.file.expand(options.imageSrc);

    if (imageFiles.length === 0) {
      grunt.log.warn('No image files found matching the specified patterns. Skipping sitemap generation.');
      return true; // Still considered successful, just no images to process
    }

    grunt.log.writeln('Generating image sitemap...');

    // Start XML document
    // Using xmlbuilder to create the XML structure
    const root = xmlbuilder.create('urlset', { encoding: 'UTF-8' })
      .att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')
      .att('xmlns:image', 'http://www.google.com/schemas/sitemap-image/1.1');

    imageFiles.forEach(function(filePath) {
      // Get the relative path of the image from the project root.
      // This assumes imageSrc paths are relative to the Gruntfile.js.
      // Normalize path separators for consistent URLs (Windows uses backslashes).
      const relativePath = path.relative(process.cwd(), filePath).replace(/\\/g, '/');

      let imageUrl;
      try {
        // Construct full URL using Node.js URL API for better handling of base and relative paths
        imageUrl = new URL(relativePath, options.baseUrl).href;
      } catch (e) {
        grunt.log.warn(`Warning: Could not construct URL for "${filePath}". Error: ${e.message}`);
        return; // Skip this file
      }

      const urlElement = root.ele('url');
      urlElement.ele('loc', imageUrl); // Main URL for the page (which contains the image)

      const imageElement = urlElement.ele('image:image');
      imageElement.ele('image:loc', imageUrl); // Specific URL of the image

      // You could add other image attributes here if you extended the options:
      // if (options.caption) { imageElement.ele('image:caption', options.caption); }
      // if (options.title) { imageElement.ele('image:title', options.title); }
      // etc.
    });

    // Finalize the XML document with pretty printing
    const xml = root.end({ pretty: true });

    // Write the sitemap to the specified output file
    try {
      grunt.file.write(options.outputFile, xml);
      grunt.log.ok(`Image sitemap generated at: ${options.outputFile}`);
    } catch (e) {
      grunt.log.error(`Error writing sitemap to ${options.outputFile}: ${e.message}`);
      return false;
    }
  });
};