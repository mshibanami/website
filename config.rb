require 'compass/import-once/activate'

http_path = "/"

css_dir = "static/css/compiled"
sass_dir = "static/sass"

output_style = (environment == :production) ? :compressed : :expanded

line_comments = false
