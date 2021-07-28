# Default
use_helper Nanoc::Helpers::LinkTo
use_helper Nanoc::Helpers::Filtering
use_helper Nanoc::Helpers::XMLSitemap
use_helper Nanoc::Helpers::Rendering
use_helper Nanoc::Helpers::Blogging

def production?
    ENV["NANOC_ENV"] == "production"
end

def item_rule
    ItemRule.new(
        @item.identifier,
        @item[:presentation],
        language(),
        @config)
end

def language
    Language.new(@item_rep.name.to_s) if @item_rep
end

def layout_path
    item_rule.layout_path
end

def t(key)
    code = @item_rep.name if @item_rep.name != :default
    I18n.t(key, locale: code)
end

def l(key, options = {})
    code = @item_rep.name if @item_rep.name != :default
    options = options.merge(locale: code)
    I18n.l(key, options)
end

def page_type
    item_rule.type
end

def items_of(kind)
    blk = -> { @items.select {|item| item[:kind] == kind } }
    if @items.frozen?
        @article_items ||= blk.call
    else
        blk.call
    end
end

def sorted_items_of(kind)
    blk = -> {
        items_of(kind).sort_by {|a|
            attribute_to_time(a[:created_at])
        }.reverse
    }

    if @items.frozen?
        @sorted_article_items ||= blk.call
    else
        blk.call
    end
end

def copyright_year
    Time.now().year
end

module Nanoc
    module Core
        module DocumentViewMixin
            def to_item_rule(item_rep, config)
                ItemRule.new(
                    identifier,
                    self[:presentation],
                    item_rep.to_language,
                    config)
            end
        end

        class CompilationItemRepView
            def to_language
                Language.new(@item_rep.name.to_s) if @item_rep
            end
        end
    end
end
