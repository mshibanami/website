class ItemRule
    # Path of the layout file for specified item
    attr_reader :layout_path

    # Path for output/
    attr_reader :output_path

    # Language code
    # nil if the specified item is localized
    attr_reader :language

    def initialize(item, config)
        langs = config[:supported_languages].join('|')
        doc_extensions = config[:supported_document_extensions].join('|')
        default_layout = '/default.*'

        case item.identifier
        when %r{/index\..*}
            @layout_path = '/content-only.*'
            @output_path = '/index.html'
        when %r{^/(?<id>.*)/(?<lang>#{langs})\..*(#{doc_extensions})$}
            # Full localized pages like the homepage or the blog's top page
            @layout_path = default_layout
            @output_path = "/#{$~[:lang]}/#{$~[:id]}.html"
            @language = Language.new($~[:lang])
        when %r{^/(?<dir>.*)/(?<lang>#{langs})/(?<name>.*)\.(#{doc_extensions})}
            # Non localized pages like blog's articles
            @layout_path = default_layout
            id = $~[:dir] + '/' + $~[:name]
            @output_path = "/#{$~[:lang]}/#{id}/index.html"
            @language = Language.new($~[:lang])
        when /.*(scss|sass)/
            @output_path = "/assets/css/compiled/#{File.basename(item.identifier.to_s, '.scss')}.css"
        else
            @output_path = item.identifier.to_s
        end
    end

    def language_code
        language.code
    end

    def region_code
        language.region_code
    end
end
