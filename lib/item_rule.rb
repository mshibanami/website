require 'set'

class ItemRule
    # Path of the layout file for specified item
    attr_reader :layout_path

    # Path for output/
    attr_reader :output_path

    # Language code
    # nil if the specified item is localized
    attr_reader :language

    def initialize(identifier, presentation, languages, document_extensions)
        langs = languages.join('|')
        doc_exts = document_extensions.join('|')
        default_layout = '/default.*'

        case identifier
        when %r{^/index\.}
            @layout_path = '/content-only.*'
            @output_path = '/index.html'
        when %r{^/(?<id>.*)/(?<lang>#{langs})\..*(#{doc_exts})$}
            @layout_path = default_layout
            @output_path = "/#{$~[:lang]}/#{$~[:id]}.html"
            @language = Language.new($~[:lang])
        when %r{^/(?<dir>.*)/(?<lang>#{langs})/(?<name>.*)\.(?<ext>#{doc_exts})$}
            if $~[:dir] == 'slides'
                case DocType.value($~[:ext])
                when DocType::ASCIIDOC
                    case presentation
                    when 'revealjs'
                        @layout_path = '/slide-asciidoc-revealjs.*'
                    when 'bespoke'
                        @layout_path = '/slide-asciidoc-bespoke.*'
                    end
                when DocType::MARKDOWN
                    @layout_path = '/slide-markdown-revealjs.*'
                end
            else
                @layout_path = default_layout
            end
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
