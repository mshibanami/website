require 'compass/import-once/activate'

http_path    = "/"
project_path = "."
css_dir      = "output/assets/css/compiled"
sass_dir     = "content/assets/sass"
images_dir   = "output/assets/img"

line_comments = false
output_style = (environment == :production) ? :compressed : :expanded

sass_options = {
  :syntax => :scss
}
