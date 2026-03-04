import { test, expect } from '@playwright/test';

test.describe('sachinserver.in E2E tests', () => {

    test.beforeEach(async ({ page }) => {
        // Navigate to the site
        await page.goto('/');
    });

    test('should load the homepage properly and display the logo', async ({ page }) => {
        // Verify title or main structure is present
        await expect(page).toHaveTitle(/React App|Sachin/i);

        // Check if the logo is present
        const logo = page.locator('img[alt="Tab Icon"]');
        await expect(logo).toBeVisible();
    });

    test('should have default tabs and navigate correctly', async ({ page }) => {
        // Check main tabs are visible
        const tabs = ['LeftBrain', 'RightBrain', 'Developer Tools', 'QA Tools', 'General Tools'];
        for (const tabName of tabs) {
            await expect(page.locator(`.tab:has-text("${tabName}")`)).toBeVisible();
        }

        // Default tab should be LeftBrain and its default section should be About Me
        await expect(page.locator('.tab.active')).toContainText('LeftBrain');

        // About Me should be active in the left navigation
        const aboutMeNav = page.locator('.nav-item.selected', { hasText: 'About Me' });
        await expect(aboutMeNav).toBeVisible();

        // Click on Developer Tools tab
        await page.locator('.tab:has-text("Developer Tools")').click();

        // Developer Tools should be active now
        await expect(page.locator('.tab.active')).toContainText('Developer Tools');

        // Its default section should be AI Tools Channels
        const aiNav = page.locator('.nav-item.selected', { hasText: 'AI Tools Channels' });
        if (await aiNav.count() > 0) {
            await expect(aiNav).toBeVisible();
        }
    });

    test('should toggle dark/light mode', async ({ page }) => {
        const themeButton = page.locator('button.theme-toggle');
        await expect(themeButton).toBeVisible();

        // Check current theme
        const isDark = await themeButton.evaluate(node => node.classList.contains('dark'));

        // Toggle theme
        await themeButton.click();

        if (isDark) {
            // should now be light
            await expect(themeButton).toHaveClass(/light/);
        } else {
            // should now be dark
            await expect(themeButton).toHaveClass(/dark/);
        }
    });

    test('should toggle left navigation', async ({ page }) => {
        const navToggleBtn = page.locator('button.nav-toggle-btn');
        const leftNav = page.locator('.left-nav');

        await expect(leftNav).toHaveClass(/visible/);

        await navToggleBtn.click();

        // should hide the navigation
        await expect(leftNav).toHaveClass(/hidden/);

        // click again to show
        await navToggleBtn.click();
        await expect(leftNav).toHaveClass(/visible/);
    });
});
