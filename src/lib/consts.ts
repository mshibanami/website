class Consts {
    static readonly AUTHOR_NAME = 'Manabu Nakazawa'
    static readonly AUTHOR_ACCOUNT_ID = 'mshibanami'
    static readonly SITE_TITLE = Consts.AUTHOR_NAME
    static readonly TWITTER_URL = 'https://twitter.com/mshibanami'
    static readonly GITHUB_URL = 'https://github.com/mshibanami'
    static readonly LINKEDIN_URL = 'https://www.linkedin.com/in/mshibanami'
    static readonly PAGE_DESCRIPTION = 'Personal webpage of Manabu Nakazawa';

    static readonly CONTENT_SECTIONS: ContentSection[] = [
        { title: "Projects", href: "/projects" },
        { title: "Blog", href: "/blog" },
    ]
}

type ContentSection = {
    href: string
    title: string
}

export default Consts
