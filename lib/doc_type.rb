module DocType
    # Asciidoc
    ASCIIDOC = 0
    # Erb
    ERB = 1
    # Scss
    SCSS = 2
    # Slim
    SLIM = 3
    # MarkDown
    MARKDOWN = 4

    def self.value(extension)
        case extension
        when 'asciidoc', 'adoc'
            ASCIIDOC
        when 'erb'
            ERB
        when 'scss'
            SCSS
        when 'slim'
            SLIM
        when 'markdown', 'md'
            MARKDOWN
        end
    end
end
