import { test, expect } from '@playwright/test';
import { blockKlpPlatform } from '../support/klp-platform';

test.describe('App', () => {
  test.beforeEach(async ({ page }) => {
    await blockKlpPlatform(page);
  });

  test('should run', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Hurray, it works!')).toBeVisible();
  });

  test.describe('Toast notifications', () => {
    test.beforeEach(async ({ page }) => {
      await page.clock.install();
      await page.goto('/home');
    });

    test('should keep an error toast visible until it is dismissed', async ({ page }) => {
      await page.getByRole('button', { name: 'Show error toast' }).click();

      const toast = page.locator('app-toast .toast-error');
      await expect(toast).toBeVisible();
      await expect(toast.locator('.toast-title')).toHaveText('Error');
      await expect(toast.locator('.toast-message')).toHaveText('An error occurred.');
      await expect(page.locator('app-toast .toast-container')).toHaveAttribute('role', 'status');

      await page.clock.fastForward(7000);
      await expect(toast).toBeVisible();

      await toast.getByRole('button', { name: 'Close', exact: true }).click();
      await expect(toast).toHaveCount(0);
    });

    test('should auto-close a success toast after the default timeout without closing an error toast', async ({
      page,
    }) => {
      await page.getByRole('button', { name: 'Show error toast' }).click();
      await page.getByRole('button', { name: 'Show success toast' }).click();

      const successToast = page.locator('app-toast .toast-success');
      const errorToast = page.locator('app-toast .toast-error');
      await expect(successToast).toBeVisible();
      await expect(successToast.locator('.toast-title')).toHaveText('Success');
      await expect(successToast.locator('.toast-message')).toHaveText('Your changes were saved.');

      await page.clock.fastForward(5000);
      await expect(successToast).toBeVisible();

      await page.clock.fastForward(1000);
      await expect(successToast).toHaveCount(0);
      await expect(errorToast).toBeVisible();
    });
  });
});
