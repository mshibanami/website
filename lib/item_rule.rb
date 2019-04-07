require "set"

class ItemRule
    # Path of the layout file for specified item
    attr_reader :layout_path

    # Language code
    # nil if the specified item should not be localized (for assets, etc.)
    attr_reader :language

    attr_reader :creates_localized_pages

    attr_reader :output_path_base

    attr_reader :uses_filter

    def initialize(identifier, presentation, language, config)
        available_languages = config[:available_languages]
        document_extensions = config[:document_extensions]
        @language = language if available_languages.include?(language.code)

        doc_exts = document_extensions.join("|")
        default_layout = "/default.*"

        @uses_filter = true

        case identifier
        when PageID::INDEX
            @layout_path = "/index.*"
            @output_path_base = "/index.html"
            @creates_localized_pages = false
        when PageID::HOME
            @layout_path = "/home.*"
            @output_path_base = "/index.html"
            @creates_localized_pages = true
        when PageID::BLOG
            @layout_path = "/pages/blog-pages.*"
            @output_path_base = "/blog/index.html"
            @creates_localized_pages = true
        when PageID::SLIDES
            @layout_path = "/pages/slides-pages.*"
            @output_path_base = "/slides/index.html"
            @creates_localized_pages = true
        when %r{^/lib/}
            @output_path_base = identifier.to_s
            @creates_localized_pages = false
            @uses_filter = false
        when %r{^/(?<dir>.*)/(?<page_number>\d)$}
            case $LAST_MATCH_INFO[:dir]
            when "blog"
                @layout_path = "/pages/blog-pages.*"
            when "slides"
                @layout_path = "/pages/slides-pages.*"
            end

            @output_path_base = "/#{$LAST_MATCH_INFO[:dir]}/#{$LAST_MATCH_INFO[:page_number]}/index.html"
            @creates_localized_pages = true
        when %r{^/(?<id>.*)/index.(?<ext>#{doc_exts})$}
            @layout_path = default_layout
            @output_path_base = "/#{$LAST_MATCH_INFO[:id]}/index.html"
            @creates_localized_pages = true
        when %r{^/(?<dir>.*)/(?<name>.*)\.(?<ext>#{doc_exts})$}
            case $LAST_MATCH_INFO[:dir]
            when "slides"
                case DocType.value($LAST_MATCH_INFO[:ext])
                when DocType::ASCIIDOC
                    case presentation
                    when "revealjs"
                        @layout_path = "/slide-asciidoc-revealjs.*"
                    when "bespoke"
                        @layout_path = "/slide-asciidoc-bespoke.*"
                    end
                when DocType::MARKDOWN
                    @layout_path = "/slide-markdown-revealjs.*"
                end
            when "blog"
                @layout_path = "/blog-post.*"
            else
                @layout_path = default_layout
            end
            id = $LAST_MATCH_INFO[:dir] + "/" + $LAST_MATCH_INFO[:name]
            @output_path_base = "/#{id}/index.html"
            @creates_localized_pages = true
        when /\..*(scss|sass)$/
            name = Util.file_basename(
                identifier.to_s,
                [".scss", ".sass"])
            @output_path_base = "/assets/css/compiled/#{name}.css"
            @creates_localized_pages = false
        when %r{^/assets/img/quiver-image-url/}
            @output_path_base = "/quiver-image-url/" + File.basename(identifier.to_s)
            @creates_localized_pages = false
        when %r{^/assets/}
            @output_path_base = identifier.to_s
            @creates_localized_pages = false
        end
    end

    def output_path
        return nil if @output_path_base.nil?
        if creates_localized_pages
            return nil if language.nil?
            
            code = language.code
            "/" + code + @output_path_base
        else
            return nil unless language.nil?
            @output_path_base
        end
    end

    def type
        case @output_path_base
        when %r{^/index\..*}
            :home
        when %r{^/(?<hello>.*?)/}
            $LAST_MATCH_INFO[:hello].to_sym
        end
    end
end

class String
    def no_indexed
        chomp("index.html")
    end
end
