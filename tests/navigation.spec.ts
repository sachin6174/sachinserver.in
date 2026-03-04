import { test, expect } from '@playwright/test';

const navigationStructure = {
    leftbrain: [
        "about-me", "dsa", "github", "apple-development-podcasts", "xcode-shortcuts",
        "apple-dev-youtube", "swift-gui", "swift-storage", "swift-networking",
        "debugging", "swift-testing", "package-deployment", "mac-terminal-scripts",
        "ai-and-tools", "design-patterns", "software-architecture", "system-design",
        "chrome-extensions"
    ],
    rightbrain: [
        "drawing", "literature", "philosophy", "psychology", "music", "rightbrain-youtube"
    ],
    "developer-tools": [
        "ai-tools-channels", "api-tool", "storage-tool", "qr-code-tool", "pdf-tool",
        "JSON-Tool", "XML-Tool", "yaml-tool", "csv-tool", "Encryption-Decryption-Tool",
        "hash-tool", "encoder-tool", "markdown-renderer", "regex-tool", "diff-checker",
        "password-tool", "uuid-tool", "writing-board", "latex-renderer", "text-generator"
    ],
    "qa-tools": [
        "macos-app-catalog", "terminal-scripts", "terminal-tutorial", "online-clipboard"
    ],
    "general-tools": [
        "info-tool", "passport-photo-maker", "app-icon-generator", "color-picker",
        "screen-recorder", "youtube-downloader", "important-websites", "emoji-picker",
        "number-to-unicode"
    ]
};

test.describe('Exhaustive Link-Based Navigation Tests', () => {

    test('Should redirect / to /leftbrain/about-me', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveURL(/.*\/leftbrain\/about-me$/);
        await expect(page.locator('.nav-item.selected', { hasText: 'About Me' })).toBeVisible();
    });

    test('Should verify all top-level tab links', async ({ page }) => {
        await page.goto('/');

        // Loop through each tab and click it, then verify url
        const tabs = [
            { key: 'leftbrain', name: 'LeftBrain', defaultItem: 'about-me' },
            { key: 'rightbrain', name: 'RightBrain', defaultItem: 'drawing' },
            { key: 'developer-tools', name: 'Developer Tools', defaultItem: 'ai-tools-channels' },
            { key: 'qa-tools', name: 'QA Tools', defaultItem: 'macos-app-catalog' },
            { key: 'general-tools', name: 'General Tools', defaultItem: 'info-tool' }
        ];

        for (const tab of tabs) {
            // Click the tab logic (using the React Router link we set up)
            const tabElement = page.locator(`.tab`, { hasText: tab.name });
            await tabElement.click();
            await expect(page).toHaveURL(new RegExp(`.*\/${tab.key}\/${tab.defaultItem}$`));

            // Verify LeftNavigation section appears
            await expect(page.locator('.left-nav.visible')).toBeVisible();
        }
    });

    // Generate comprehensive brute tests for each individual page
    for (const [tab, items] of Object.entries(navigationStructure)) {
        test.describe(`Brute testing ${tab} navigation`, () => {

            test.beforeEach(async ({ page }) => {
                await page.goto(`/${tab}`);
            });

            for (const item of items) {
                test(`Navigating to ${tab} -> ${item}`, async ({ page }) => {
                    // Start from the active tab's default
                    // Then click the specific left nav item link
                    const navLink = page.locator(`a.nav-item[href="/${tab}/${item}"]`);

                    // Wait for the nav link to be visible and click it
                    await navLink.waitFor({ state: 'visible' });
                    await navLink.click();

                    // Check URL updated
                    await expect(page).toHaveURL(new RegExp(`.*\/${tab}\/${item}$`));

                    // The left nav item should have "selected" class
                    await expect(navLink).toHaveClass(/selected/);

                    // Main content wrapper should be visible
                    const mainContent = page.locator('main#main .content-wrapper');
                    await expect(mainContent).toBeVisible();

                    // Check that breadcrumb reflects the new item selection appropriately 
                    // (the breadcrumb component should update its text)
                    const breadcrumbItems = page.locator('.breadcrumb-path span');
                    // We just assert that breadcrumb loaded
                    await expect(breadcrumbItems.first()).toBeVisible();
                });
            }
        });
    }

    test('Deep linking works correctly', async ({ page }) => {
        // Direct navigate to a deep link
        await page.goto('/developer-tools/regex-tool');

        // Ensure it doesn't redirect away
        await expect(page).toHaveURL(/.*\/developer-tools\/regex-tool$/);

        // Ensure the correct tab is highlighted
        await expect(page.locator('.tab.active', { hasText: 'Developer Tools' })).toBeVisible();

        // Ensure the left navigation highlights the selected item
        const navLink = page.locator(`a.nav-item[href="/developer-tools/regex-tool"]`);
        await expect(navLink).toHaveClass(/selected/);
    });
});
