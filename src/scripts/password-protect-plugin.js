import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

/**
 * Astro Integration for Client-Side AES-256-GCM Case Study Protection
 * Automatically scrambles case study content at build time if passwordProtected is set.
 */
export default function passwordProtect(options = {}) {
    const defaultPassword = options.universalPassword || 'peek-a-boo';

    return {
        name: 'astro-password-protect',
        hooks: {
            'astro:server:setup': ({ server }) => {
                // Intercept dev server HTML responses to encrypt them in local dev too
                server.middlewares.use((req, res, next) => {
                    const originalEnd = res.end.bind(res);
                    const chunks = [];

                    // Intercept only HTML responses
                    const originalWrite = res.write.bind(res);
                    res.write = function (chunk, ...args) {
                        if (chunk) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
                        return true;
                    };

                    res.end = function (chunk, ...args) {
                        if (chunk) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
                        const bodyBuffer = Buffer.concat(chunks);
                        let body = bodyBuffer.toString('utf-8');

                        const startTag = '<!-- PROTECTED_CONTENT_START -->';
                        const endTag = '<!-- PROTECTED_CONTENT_END -->';

                        if (body.includes(startTag) && body.includes(endTag)) {
                            const startIndex = body.indexOf(startTag);
                            const endIndex = body.indexOf(endTag);
                            const contentToEncrypt = body.substring(startIndex + startTag.length, endIndex);

                            const salt = crypto.randomBytes(16);
                            const iv = crypto.randomBytes(12);
                            const key = crypto.pbkdf2Sync(defaultPassword, salt, 100000, 32, 'sha256');

                            const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
                            let encrypted = cipher.update(contentToEncrypt, 'utf-8', 'base64');
                            encrypted += cipher.final('base64');
                            const tag = cipher.getAuthTag();

                            const payload = JSON.stringify({
                                salt: salt.toString('base64'),
                                iv: iv.toString('base64'),
                                tag: tag.toString('base64'),
                                data: encrypted
                            });

                            const safeReplacement = `
                            <!-- PROTECTED_CONTENT_ACTIVE -->
                            <div id="csEncryptedPayload" style="display:none;" data-payload='${payload.replace(/'/g, '&#39;')}'></div>
                            <div id="csProtectedContentSlot" class="cs-protected-unlocked" style="display:none;"></div>
                            `;

                            body = body.substring(0, startIndex) + safeReplacement + body.substring(endIndex + endTag.length);
                            res.setHeader('content-length', Buffer.byteLength(body));
                        }

                        return originalEnd(body, ...args);
                    };

                    next();
                });
            },
            'astro:build:done': async ({ dir }) => {
                const outDirPath = dir.pathname || dir;
                // Normalize Windows or POSIX path if needed
                const buildDir = path.resolve(outDirPath);
                const caseStudiesDir = path.join(buildDir, 'case-studies');

                if (!fs.existsSync(caseStudiesDir)) {
                    return;
                }

                // Scan all folders in dist/case-studies/
                const entries = fs.readdirSync(caseStudiesDir, { withFileTypes: true });
                for (const entry of entries) {
                    if (entry.isDirectory()) {
                        const indexPath = path.join(caseStudiesDir, entry.name, 'index.html');
                        if (fs.existsSync(indexPath)) {
                            processHtmlFile(indexPath, defaultPassword);
                        }
                    }
                }
            }
        }
    };
}

function processHtmlFile(filePath, password) {
    let html = fs.readFileSync(filePath, 'utf-8');

    // Look for our marker comment
    const startTag = '<!-- PROTECTED_CONTENT_START -->';
    const endTag = '<!-- PROTECTED_CONTENT_END -->';

    const startIndex = html.indexOf(startTag);
    const endIndex = html.indexOf(endTag);

    if (startIndex === -1 || endIndex === -1) {
        return; // Not a protected case study
    }

    const contentToEncrypt = html.substring(startIndex + startTag.length, endIndex);

    // Encrypt content with AES-256-GCM using PBKDF2
    const salt = crypto.randomBytes(16);
    const iv = crypto.randomBytes(12);
    const key = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');

    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    let encrypted = cipher.update(contentToEncrypt, 'utf-8', 'base64');
    encrypted += cipher.final('base64');
    const tag = cipher.getAuthTag();

    const payload = JSON.stringify({
        salt: salt.toString('base64'),
        iv: iv.toString('base64'),
        tag: tag.toString('base64'),
        data: encrypted
    });

    // Replace the plaintext content with an empty container carrying the encrypted payload
    const safeReplacement = `
    <!-- PROTECTED_CONTENT_ACTIVE -->
    <div id="csEncryptedPayload" style="display:none;" data-payload='${payload.replace(/'/g, '&#39;')}'></div>
    <div id="csProtectedContentSlot" class="cs-protected-unlocked" style="display:none;"></div>
    `;

    const newHtml = html.substring(0, startIndex) + safeReplacement + html.substring(endIndex + endTag.length);
    fs.writeFileSync(filePath, newHtml, 'utf-8');
    console.log(`[password-protect] Successfully encrypted ${path.basename(path.dirname(filePath))}`);
}
