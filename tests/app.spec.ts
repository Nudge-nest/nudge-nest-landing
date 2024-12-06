import { test, expect } from '@playwright/test';

const homeUrl = `http://localhost:5173/`;

test.describe('App Test', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(homeUrl);
    });

    test('signup for early access url works', async ({ page }) => {
        await expect(page).toHaveTitle(/Nudge-nest/);
        await expect(page.getByRole('button', { name: 'Sign Up for Early Access' })).toBeVisible();
        const [popup] = await Promise.all([
            page.waitForEvent('popup'), // Wait for a new tab to open
            page.getByRole('button', { name: /Sign Up for Early Access/i }).click(), // Click the button
        ]);
        await popup.waitForURL(/docs\.google\.com\/forms/i);
        await expect(popup).toHaveURL(/docs\.google\.com\/forms/i);
        await expect(popup).toHaveTitle(/Early Access Signup/);
    });

    test('submit feature request url works', async ({ page }) => {
        await expect(page).toHaveTitle(/Nudge-nest/);
        await expect(page.getByRole('button', { name: 'Submit Your Feature Request' })).toBeVisible();
        const [popup] = await Promise.all([
            page.waitForEvent('popup'), // Wait for a new tab to open
            page.getByRole('button', { name: /Submit Your Feature Request/i }).click(), // Click the button
        ]);
        await popup.waitForURL(/docs\.google\.com\/forms/i);
        await expect(popup).toHaveURL(/docs\.google\.com\/forms/i);
        await expect(popup).toHaveTitle(/Feature Request/);
    });

    test('contact url works', async ({ page }) => {
        await expect(page).toHaveTitle(/Nudge-nest/);
        await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
        const [popup] = await Promise.all([
            page.waitForEvent('popup'), // Wait for a new tab to open
            page.getByRole('link', { name: /Contact/i }).click(), // Click the button
        ]);
        await popup.waitForURL(/google\.com\/search/i);
        await expect(popup).toHaveURL(/google\.com\/search/i);
        await expect(popup).toHaveTitle(/Nudge-nest/);
    });
});
