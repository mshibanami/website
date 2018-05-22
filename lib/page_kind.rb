class PageKind
    attr_reader :kind

    def initialize(kind)
        @kind = kind
    end

    def page_id
        case kind
        when "article"
            PageID::BLOG
        when "slide"
            PageID::SLIDES
        end
    end

    def root_path(language_code)
        page_id().gsub(PageID::PREFIX, "/#{language_code}/")
    end
end
