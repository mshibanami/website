require "spec_helper"
require "item_rule"
require "language"
require "page_id"

describe ItemRule do
    LANGS = ["en", "ja"].freeze
    DOC_EXTS = ["md", "adoc", "slim"].freeze
    CONFIG = {
        available_languages: LANGS,
        document_extensions: DOC_EXTS,
    }.freeze

    it "outputs a rule for the localized node" do
        v1 = ItemRule.new(
            "/blog/index.slim",
            nil,
            Language.new("en"),
            CONFIG)
        expect(v1.output_path).to eq "/en/blog/index.html"
        expect(v1.layout_path).to eq "/default.*"
        expect(v1.language.code).to eq "en"

        v2 = ItemRule.new(
            "/blog/index.slim",
            nil,
            Language.new("ja"),
            CONFIG)
        expect(v2.output_path).to eq "/ja/blog/index.html"
        expect(v2.layout_path).to eq "/default.*"
        expect(v2.language.code).to eq "ja"
    end
end
