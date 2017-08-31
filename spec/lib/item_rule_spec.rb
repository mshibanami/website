require 'spec_helper'
require 'item_rule'
require 'language'

describe ItemRule do
    langs = ['en', 'ja']
    doc_exts = ['md', 'adoc', 'slim']

    it 'outputs a rule for the localized node' do
        v1 = ItemRule.new('/blog/index/en.slim', langs, doc_exts)
        expect(v1.output_path).to eq '/en/blog/index.html'
        expect(v1.layout_path).to eq '/default.*'
        expect(v1.language.code).to eq 'en'

        v2 = ItemRule.new('/blog/index/ja.slim', langs, doc_exts)
        expect(v2.output_path).to eq '/ja/blog/index.html'
        expect(v2.layout_path).to eq '/default.*'
        expect(v2.language.code).to eq 'ja'

        v3 = ItemRule.new('/index/en.slim', langs, doc_exts)
        expect(v3.output_path).to eq '/en/index.html'
        expect(v3.layout_path).to eq '/default.*'
        expect(v1.language.code).to eq 'en'
    end

    it 'accepts allowed languages only' do

        v3 = ItemRule.new('/index/fr.slim', langs, doc_exts)
        expect(v3.output_path).to eq '/en/index.html'
        expect(v3.layout_path).to eq '/default.*'
        expect(v1.language.code).to eq 'en'
    end
end
