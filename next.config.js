module.exports = {
    async redirects() {
        return [
            {
                source: '/projects/redirect-web-for-safari',
                destination: 'https://mshibanami.github.io/redirect-web',
                permanent: true,
            },
        ]
    },
};
