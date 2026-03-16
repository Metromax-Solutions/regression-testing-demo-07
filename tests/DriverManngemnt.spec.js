
import { test, expect } from '@playwright/test';

// Generate unique license number
const licenseNumber = 'LIC' + Math.floor(100000 + Math.random() * 900000);

test.beforeEach(async ({ page }) => {

  await page.goto('https://dev.fleetdrive360.com/');

  // LOGIN
  await page.getByRole('textbox', { name: 'Username' }).fill('sambittest');
  await page.getByRole('textbox', { name: 'Password' }).fill('k7mLdXpuPz');
  await page.getByRole('button', { name: 'Login' }).click();

  // Navigate to Driver Management
  await page.getByRole('link', { name: /Driver Management/i }).click();

});


// TEST 1 - Verify Driver Page
test('Verify Driver Management page loads', async ({ page }) => {

  await expect(
    page.getByRole('heading', { name: 'Driver Management' })
  ).toBeVisible();

  await expect(
    page.getByRole('tab', { name: /Add Driver/i })
  ).toBeVisible();

});


// TEST 2 - Verify Add Driver Form
test('Verify Add Driver form fields', async ({ page }) => {

  await page.getByRole('tab', { name: /Add Driver/i }).click();

  await expect(page.getByRole('textbox', { name: 'First Name*' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Last Name*' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Email*' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Phone Number*' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'License Number*' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Add Driver' })).toBeVisible();

});


// TEST 3 - Required Field Validation
test('Verify required field validation', async ({ page }) => {

  await page.getByRole('tab', { name: /Add Driver/i }).click();
  await page.getByRole('button', { name: 'Add Driver' }).click();

  await expect(page.locator('span:has-text("This field is required")').nth(0)).toBeVisible();
  await expect(page.locator('span:has-text("This field is required")').nth(1)).toBeVisible();
  await expect(page.locator('span:has-text("This field is required")').nth(2)).toBeVisible();
  await expect(page.locator('span:has-text("This filed is required")')).toBeVisible();
  await expect(page.locator('span:has-text("This field is required")').nth(3)).toBeVisible();
  await expect(page.locator('span:has-text("This field is required")').nth(4)).toBeVisible();
  await expect(page.locator('span:has-text("This field is required")').nth(5)).toBeVisible();
  await expect(page.locator('span:has-text("This field is required")').nth(6)).toBeVisible();
  await expect(page.locator('span:has-text("This field is required")').nth(7)).toBeVisible();
  await expect(page.locator('span:has-text("This field is required")').nth(8)).toBeVisible();
  await expect(page.locator('span:has-text("This field is required")').nth(9)).toBeVisible();
  await expect(page.locator('span:has-text("This field is required")').nth(10)).toBeVisible();
  await expect(page.locator('span:has-text("This field is required")').nth(11)).toBeVisible();
  await expect(page.locator('span:has-text("This field is required")').nth(12)).toBeVisible();

});


// TEST 4 - Email Field Validation
test('Verify invalid email validation', async ({ page }) => {

  await page.getByRole('tab', { name: /Add Driver/i }).click();

  await page.getByRole('textbox', { name: 'Email*' }).fill('invalidemail');
  await page.getByRole('button', { name: 'Add Driver' }).click();

  await expect(page.getByText(/invalid/i)).toBeVisible();

});


// TEST 5 - Phone Validation
test('Verify phone number validation', async ({ page }) => {

  await page.getByRole('tab', { name: /Add Driver/i }).click();

  await page.getByRole('textbox', { name: 'Phone Number*' }).fill('123');
  await page.getByRole('button', { name: 'Add Driver' }).click();

  await expect(page.getByText('min 10 digit')).toBeVisible();

});


// TEST 6 - Add Driver Successfully
test('Verify driver can be added successfully', async ({ page }) => {

  await page.getByRole('tab', { name: /Add Driver/i }).click();

  await page.getByRole('radio').nth(1).check();

  await page.getByRole('textbox', { name: 'First Name*' }).fill('demo');
  await page.getByRole('textbox', { name: 'Last Name*' }).fill('driver');

  await page.getByRole('textbox', { name: 'Date Of Birth *' }).fill('2008-03-03');

  await page.getByRole('textbox', { name: 'Email*' }).fill('demo@gmail.com');

  await page.getByRole('textbox', { name: 'Phone Number*' }).fill('9078224452');

  await page.locator('#status').click();
  await page.getByRole('option', { name: 'Active' }).click();

  await page.getByRole('textbox', { name: 'Social Security Number*' }).fill('123456789');

  // UNIQUE LICENSE NUMBER
  await page.getByRole('textbox', { name: 'License Number*' }).fill(licenseNumber);

  await page.locator('#licenseClass').click();
  await page.getByRole('option', { name: 'Class A' }).click();

  await page.getByRole('textbox', { name: 'Issue Date *' }).fill('2026-03-10');
  await page.getByRole('textbox', { name: 'Expiration Date *' }).fill('2026-03-28');

  await page.locator('#licenseIssueState').click();
  await page.getByRole('option', { name: 'California' }).click();

  await page.locator('input[name="medicalCardInfo"]').nth(1).check();
  await expect(page.locator('input[name="medicalCardInfo"]').nth(1))
    .toBeChecked();
      await page.getByRole('radio').nth(3).check();


  await page.locator('input[name="mvrInfo"]').nth(1).check();
  await expect(page.locator('input[name="mvrInfo"]').nth(1))
    .toBeChecked();

  await page.locator('input[name="dqDocument"]').nth(1).check();
  await expect(page.locator('input[name="dqDocument"]').nth(1))
    .toBeChecked();


  await page.getByRole('button', { name: 'Add Driver' }).click();


await page.getByRole('alert').waitFor({ state: 'visible' });

await expect(page.getByRole('alert')).toBeVisible();

});


// TEST 7 - Search Driver
test('Verify search driver functionality', async ({ page }) => {

  await page.getByRole('button', { name: 'Show/Hide search' }).click();
  await page.getByRole('textbox', { name: 'Search', exact: true }).fill('demo driver');

  await expect(page.getByRole('link', { name: 'demo driver' }).first()).toBeVisible();

});


// TEST 8 - Open Driver Profile
test('Verify driver profile page opens', async ({ page }) => {

  await page.getByRole('button', { name: 'Show/Hide search' }).click();
  await page.getByRole('textbox', { name: 'Search', exact: true }).fill('demo driver');

  await page.getByRole('link', { name: 'demo driver' }).first().click();

  await expect(page.getByRole('heading', { name: 'demo driver' })).toBeVisible();

});

