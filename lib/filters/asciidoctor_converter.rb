require 'asciidoctor-revealjs'
require 'asciidoctor-bespoke'

module Nanoc::Filters
    class AsciidoctorConverter < Nanoc::Filter
        identifier :asciidoctor_converter

        def run(content, params = {})
            raise 'the key `backend` is not specified.' unless params.include?(:backend)

            ::Asciidoctor.convert(
                content,
                params
            )
        end
    end
end
