gem 'i18n'

class Util
    def self.file_basename(path, extensions)
        filename = File.basename(path)

        (extensions || {}).each do |ext|
            basename = File.basename(path, ext)
            return basename if basename != filename
        end
    end
end
