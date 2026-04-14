// @ts-check
import { expect, test } from '@playwright/test'

test.describe('DOM exercises', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('page has correct title and heading', async ({ page }) => {
    await expect(page).toHaveTitle('JavaScript exercises')
    await expect(
      page.getByRole('heading', { name: 'JavaScript exercises', level: 1 }),
    ).toBeVisible()
  })

  test.describe('getElementFromDomAndChangeColorToRed', () => {
    test('element #change-my-color is visible', async ({ page }) => {
      await expect(page.locator('#change-my-color')).toBeVisible()
    })

    test('element #change-my-color has its text color set to red', async ({
      page,
    }) => {
      await expect(page.locator('#change-my-color')).toHaveCSS(
        'color',
        'rgb(255, 0, 0)',
      )
    })

    test('element #change-my-color still contains its original text', async ({
      page,
    }) => {
      await expect(page.locator('#change-my-color')).toContainText(
        'Change my color to red',
      )
    })
  })

  test.describe('addElementsInDOM', () => {
    const containerSelector = '#add-your-elements-in-this-element'

    test('adds exactly two <p> elements inside the container', async ({
      page,
    }) => {
      const paragraphs = page.locator(`${containerSelector} > p`)
      await expect(paragraphs).toHaveCount(2)
    })

    test('first paragraph contains "Bonjour"', async ({ page }) => {
      const paragraphs = page.locator(`${containerSelector} > p`)
      await expect(paragraphs.nth(0)).toContainText('Bonjour')
    })

    test('second paragraph contains "Toto"', async ({ page }) => {
      const paragraphs = page.locator(`${containerSelector} > p`)
      await expect(paragraphs.nth(1)).toContainText('Toto')
    })
  })

  test.describe('addAListInDomFromAnArrayOfObjects', () => {
    const containerSelector = '#add-list-here'

    test('creates a <ul> inside the container', async ({ page }) => {
      const list = page.locator(`${containerSelector} > ul`)
      await expect(list).toHaveCount(1)
    })

    test('list contains exactly 4 <li> items', async ({ page }) => {
      const items = page.locator(`${containerSelector} > ul > li`)
      await expect(items).toHaveCount(4)
    })

    test('list items are in the correct order', async ({ page }) => {
      const items = page.locator(`${containerSelector} > ul > li`)
      await expect(items.nth(0)).toHaveText('Toto')
      await expect(items.nth(1)).toHaveText('Tata')
      await expect(items.nth(2)).toHaveText('Titi')
      await expect(items.nth(3)).toHaveText('Tutu')
    })

    test('Toto has correct background color (#ff6b81)', async ({ page }) => {
      const item = page.locator(`${containerSelector} > ul > li`).nth(0)
      await expect(item).toHaveCSS('background-color', 'rgb(255, 107, 129)')
    })

    test('Tata has correct background color (#70a1ff)', async ({ page }) => {
      const item = page.locator(`${containerSelector} > ul > li`).nth(1)
      await expect(item).toHaveCSS('background-color', 'rgb(112, 161, 255)')
    })

    test('Titi has correct background color (#a4b0be)', async ({ page }) => {
      const item = page.locator(`${containerSelector} > ul > li`).nth(2)
      await expect(item).toHaveCSS('background-color', 'rgb(164, 176, 190)')
    })

    test('Tutu has correct background color (#ff7f50)', async ({ page }) => {
      const item = page.locator(`${containerSelector} > ul > li`).nth(3)
      await expect(item).toHaveCSS('background-color', 'rgb(255, 127, 80)')
    })
  })
})
