// apollo.config.js
export const client = {
    service: {
        name: 'my-app',
        // URL to the GraphQL API
        url: 'http://api.equilibra.test.natterbase.com/',
    },
    // Files processed by the extension
    includes: [
        'src/**/*.vue',
        'src/**/*.js',
    ],
};