class Language
    CODE_TO_ORIGINAL_NAME_MAP = {
        en: 'English',
        ja: '日本語'
    }.freeze

    CODE_TO_REGION_MAP = {
        en: 'US',
        ja: 'JP'
    }.freeze

    attr_accessor :code

    def originalName; end
end

# Returns the language_code attribute, or, if the former is nil, the
# language code derived from the path.
def language_code_of(item)
    puts item.path.to_s
    item.path.to_s
    # (item.identifier.to_s.match(%r{^\/([a-z]{2})\/}) || [])[1]
end
