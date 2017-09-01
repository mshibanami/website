require 'spec_helper'
require 'item_rule'
require 'language'

describe ItemRule do
    LANGS = ['en', 'ja'].freeze
    DOC_EXTS = ['md', 'adoc', 'slim'].freeze

    it 'outputs a rule for the localized node' do
        v1 = ItemRule.new('/blog/index/en.slim', LANGS, DOC_EXTS)
        expect(v1.output_path).to eq '/en/blog/index.html'
        expect(v1.layout_path).to eq '/default.*'
        expect(v1.language.code).to eq 'en'

        v2 = ItemRule.new('/blog/index/ja.slim', LANGS, DOC_EXTS)
        expect(v2.output_path).to eq '/ja/blog/index.html'
        expect(v2.layout_path).to eq '/default.*'
        expect(v2.language.code).to eq 'ja'

        v3 = ItemRule.new('/index/en.slim', LANGS, DOC_EXTS)
        expect(v3.output_path).to eq '/en/index.html'
        expect(v3.layout_path).to eq '/default.*'
        expect(v3.language.code).to eq 'en'
    end

    it 'accepts allowed languages only' do
        v1 = ItemRule.new('/index/fr.slim', LANGS, DOC_EXTS)
        expect(v1.output_path).to eq nil
        expect(v1.layout_path).to eq nil
        expect(v1.language).to eq nil
    end
end
