import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: './index.html',
                about: './about.html',
                'case-studies': './case-studies.html',
                'ai-readiness': './ai-readiness.html',
                'ai-development': './ai-development.html',
                automation: './automation.html',
                'ai-ops': './ai-ops.html',
                'ai-social': './ai-social.html',
                demos: './demos.html',
                resources: './resources.html',
                book: './book.html',
            }
        }
    }
})
