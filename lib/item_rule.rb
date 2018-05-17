require 'set'

class ItemRule
    # Path of the layout file for specified item
    attr_reader :layout_path

    # Language code
    # nil if the specified item is localized
    attr_reader :language

    attr_reader :creates_localized_pages

    attr_reader :output_path_base

    def initialize(identifier, presentation, languages, document_extensions)
        langs = languages.join('|')
        doc_exts = document_extensions.join('|')
        default_layout = '/default.*'

        case identifier
        when %r{^/index\.}
            @layout_path = '/content-only.*'
            @output_path_base = '/index.html'
            @creates_localized_pages = false
        when %r{^/index-localized\.}
            @layout_path = default_layout
            @output_path_base = '/index.html'
            @creates_localized_pages = true
        when %r{^/(?<id>.*)/index.(?<ext>#{doc_exts})$}
            @layout_path = default_layout
            @output_path_base = "/#{$~[:id]}/index.html"
            @creates_localized_pages = true
        when %r{^/(?<dir>.*)/(?<name>.*)\.(?<ext>#{doc_exts})$}
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
            @output_path_base = "/#{id}/index.html"
            @creates_localized_pages = true
        when /\..*(scss|sass)$/
            name = Util.file_basename(
                identifier.to_s,
                ['.scss', '.sass'])
            @output_path_base = "/assets/css/compiled/#{name}.css"
            @creates_localized_pages = false
        when %r{^/assets/img/quiver-image-url/}
            @output_path_base = '/quiver-image-url/' + File.basename(identifier.to_s)
            @creates_localized_pages = false
        when %r{^/assets/}
            @output_path_base = identifier.to_s
            @creates_localized_pages = false
        end
    end

    def output_path(language_code)
        return nil if @output_path_base.nil?

        if creates_localized_pages
            return nil if language_code == 'default'
            code = language_code
            '/' + code + @output_path_base
        else
            return nil if language_code != 'default'
            @output_path_base
        end
    end

    def type
        case @output_path_base
        when %r{^/index\..*}
            :home
        when %r{^/(?<hello>.*?)/}
            $~[:hello].to_sym
        end
    end
end

class String
    def no_indexed
        chomp('index.html')
    end
end
