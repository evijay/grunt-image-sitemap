// Gruntfile.js
module.exports = function(grunt) {
  // Load local tasks. In a real project, this would be `grunt.loadNpmTasks('grunt-image-sitemap');`
  grunt.loadTasks('tasks');

  grunt.initConfig({
    // Configuration for your image_sitemap task
    image_sitemap: {
      default: { // You can define multiple targets here
        options: {
          baseUrl: 'https://www.example.com/', // ⚠️ IMPORTANT: Change this to your actual website's base URL!
          outputFile: 'dist/image-sitemap.xml', // Output path for the sitemap
          imageSrc: [
            'test_images/**/*.jpg', // Example: Look for JPGs in a test_images folder
            'test_images/**/*.png', // Example: Look for PNGs in a test_images folder
            // Add more globs as needed for your project's image locations
          ],
        },
      },
    },
  });

  // By default, run the image_sitemap task.
  grunt.registerTask('default', ['image_sitemap']);
};