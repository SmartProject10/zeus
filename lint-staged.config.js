export default {
    'src/**/*.{ts,tsx}': (fileNames) => {
        return [
            'npm run typecheck',
            `eslint -c .eslintrc --quiet ${fileNames.join(' ')}`,
        ]
    },
}
