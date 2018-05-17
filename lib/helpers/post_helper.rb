# https://github.com/clarkdave/nanoc-blog-example/blob/master/lib%2Fdefault.rb

module PostHelper
    def get_post_start(post)
        content = post.compiled_content
        if content =~ /\s<!-- more -->\s/
            content = content.partition('<!-- more -->').first +
                      "<div class='read-more'><a href='#{post.path}'>Continue reading &rsaquo;</a></div>"
        end
    end
end
include PostHelper
