const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index.html');
files.forEach(f => {
        let content = fs.readFileSync(f, 'utf8');
        if (content.includes('footer-bottom') && !content.includes('footer-social')) {
                const replacement = `<a href="index.html" class="nav-logo">AIOPS<span>EXPERT</span></a>
                <div class="footer-social" style="margin: 1rem 0;">
                    <a href="https://www.linkedin.com/in/danielschley/" class="social-link" title="LinkedIn" target="_blank" rel="noopener">in</a>
                    <a href="https://x.com/AIOpsExpert" class="social-link" title="Twitter/X" target="_blank" rel="noopener">𝕏</a>
                    <a href="https://www.youtube.com/@AIOPSEXPERT/videos" class="social-link" title="YouTube" target="_blank" rel="noopener">▶️</a>
                    <a href="https://www.facebook.com/profile.php?id=61578737542703&sk=followers" class="social-link" title="Facebook" target="_blank" rel="noopener">f</a>
                    <a href="https://www.instagram.com/aiopsexpert/" class="social-link" title="Instagram" target="_blank" rel="noopener">📷</a>
                </div>`;
                content = content.replace(/<a href="index\.html" class="nav-logo">AIOPS<span>EXPERT<\/span><\/a>/g, replacement);
                fs.writeFileSync(f, content);
        }
});
console.log('Added social links to subpages.');
