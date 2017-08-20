class Language
    CODE_TO_ORIGINAL_NAME_MAP ||= {
        en: 'English',
        ja: '日本語'
    }.freeze

    CODE_TO_REGION_MAP ||= {
        en: 'US',
        ja: 'JP'
    }.freeze

    attr_reader :code

    def initialize(language_code)
        @code = language_code
    end

    def region_code
        CODE_TO_REGION_MAP[@code]
    end

    def original_name
        CODE_TO_ORIGINAL_NAME_MAP[@code]
    end
end
