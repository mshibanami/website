class ItemRule
    # Path of the layout file for specified item
    attr_reader :layout_path

    # Path for output/
    attr_reader :output_path

    # Language code
    # nil if the specified item is localized
    attr_reader :language

    def initialize(identifier, languages, document_extensions)
        langs = languages.join('|')
        doc_exts = document_extensions.join('|')
        default_layout = '/default.*'

        case identifier
        when %r{^/index\.}
            @layout_path = '/content-only.*'
            @output_path = '/index.html'
        when %r{^/(?<id>.*)/(?<lang>#{langs})\..*(#{doc_exts})$}
            # localized pages (e.g. the homepage, the blog's top page)
            @layout_path = default_layout
            @output_path = "/#{$~[:lang]}/#{$~[:id]}.html"
            @language = Language.new($~[:lang])
        when %r{^/(?<dir>.*)/(?<lang>#{langs})/(?<name>.*)\.(#{doc_exts})$}
            # Partially localized pages (e.g. blog's articles)
            @layout_path = default_layout
            id = $~[:dir] + '/' + $~[:name]
            @output_path = "/#{$~[:lang]}/#{id}/index.html"
            @language = Language.new($~[:lang])
        when /\..*(scss|sass)$/
            name = Util.file_basename(
                identifier.to_s,
                ['.scss', '.sass'])
            @output_path = "/assets/css/compiled/#{name}.css"
        when %r{^/assets/img/quiver-image-url/}
            @output_path = '/quiver-image-url/' + File.basename(identifier.to_s)
        when %r{^/assets/}
            @output_path = identifier.to_s
        end
    end
end

def output_path
    ItemRule.new(
        @item.identifier,
        @config[:languages],
        @config[:document_extensions]
    ).output_path
end

def language
    ItemRule.new(
        @item.identifier,
        @config[:languages],
        @config[:document_extensions]
    ).language
end

def layout_path
    ItemRule.new(
        @item.identifier,
        @config[:languages],
        @config[:document_extensions]
    ).layout_path
end
