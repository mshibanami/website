def production?
    ENV['NANOC_ENV'] == 'production'
end

def item_rule
    ItemRule.new(
        @item.identifier,
        @item[:presentation],
        @config[:languages],
        @config[:document_extensions])
end

def output_path
    item_rule.output_path(language.code)
end

def language
    return item_rule.language if item_rule.language
    return Language.new(@item_rep.name.to_s) if @item_rep
    item_rule.language
end

def layout_path
    item_rule.layout_path
end

def t(key)
    if language.nil?
        code = language.code
    elsif @item_rep.name != :default
        code = @item_rep.name
    end
    I18n.t(key, locale: code)
end

def page_type
    item_rule.type
end

def base_url
    @config[:base_url]
end
