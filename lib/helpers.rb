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
    item_rule.output_path
end

def language
    item_rule.language
end

def layout_path
    item_rule.layout_path
end

def t(key)
    I18n.t(key, locale: language.code)
end
