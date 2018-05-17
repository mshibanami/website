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

def items_of(kind)
    blk = -> { @items.select { |item| item[:kind] == kind } }
    if @items.frozen?
        @article_items ||= blk.call
    else
        blk.call
    end
end

def sorted_items_of(kind)
    blk = lambda {
        items_of(kind).sort_by do |a|
            attribute_to_time(a[:created_at])
        end .reverse
    }

    if @items.frozen?
        @sorted_article_items ||= blk.call
    else
        blk.call
    end
end

def created_at_list_of(kind)
    sorted_items_of(kind)
        .map { |i| i[:created_at].strftime('%Y-%m') }
        .uniq
end

module Nanoc
    module DocumentViewMixin
        def to_item_rule(config)
            ItemRule.new(
                identifier,
                self[:presentation],
                config[:languages],
                config[:document_extensions])
        end
    end
end
