class Consts {
    static readonly AUTHOR_NAME = 'Manabu Nakazawa'
    static readonly AUTHOR_ACCOUNT_ID = 'mshibanami'
    static readonly AUTHOR_EMAIL = 'mshibanami+website@gmail.com'
    static readonly SITE_TITLE = Consts.AUTHOR_NAME
    static readonly TWITTER_URL = 'https://twitter.com/mshibanami'
    static readonly GITHUB_URL = 'https://github.com/mshibanami'
    static readonly LINKEDIN_URL = 'https://www.linkedin.com/in/mshibanami'
    static readonly PAGE_DESCRIPTION = 'Personal webpage of Manabu Nakazawa'
    static readonly GOOGLE_ANALYTICS_CODE = 'UA-46019833-3'
    static readonly COPYRIGHT = `© ${new Date().getFullYear()} ${Consts.AUTHOR_NAME}`

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
