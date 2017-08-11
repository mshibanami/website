require 'commonmarker'

Class.new(Nanoc::Filter) do
  identifier :commonmarker

  def run(content, params = {})
    ::CommonMarker.render_html(content, params)
  end
end
