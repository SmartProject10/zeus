export default {
    'src/**/*.{ts,tsx}': (fileNames) => {
        return [
            'yarn typecheck',
            `eslint -c .eslintrc --quiet ${fileNames.join(' ')}`,
        ]
    },
}
