// @ts-check
import { expect, test } from '@playwright/test'

test.describe('Events exercises', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('Alert dialog is fired ?', async ({ page }) => {
    const dialogPromise = page.waitForEvent('dialog', (dialog) => {
      dialog.dismiss()
      return true
    })
    await page.locator('#click-me').click()
    await dialogPromise
  })

  test('React to a click event', async ({ page }) => {
    const dialogPromise = page.waitForEvent('dialog', async (dialog) => {
      await expect(dialog.type()).toContain('alert')
      await expect(dialog.message()).toBe('Button clicked')
      await dialog.accept().catch(() => {})
      return true
    })
    await page.locator('#click-me').click()
    await dialogPromise
  })

  test.describe('addEventToDomOnClick', () => {
    test('clicking the button inserts a visible "clicked" element after it', async ({
      page,
    }) => {
      page.on('dialog', (dialog) => dialog.dismiss())
      await page.locator('#click-me').click()

      const clickedEl = page.getByText('clicked', { exact: true })
      await expect(clickedEl).toHaveCount(1)
      await expect(clickedEl).toBeVisible()
    })

    test('the "clicked" element is placed right after the button', async ({
      page,
    }) => {
      page.on('dialog', (dialog) => dialog.dismiss())
      await page.locator('#click-me').click()

      const sibling = page.locator('#click-me + div')
      await expect(sibling).toHaveText('clicked')
    })

    test('clicking the button multiple times creates multiple "clicked" elements', async ({
      page,
    }) => {
      page.on('dialog', (dialog) => dialog.dismiss())

      await page.locator('#click-me').click()
      await page.locator('#click-me').click()
      await page.locator('#click-me').click()

      await expect(page.getByText('clicked', { exact: true })).toHaveCount(3)
    })
  })

  test.describe('displayInputContentInAlertOnEnterKey', () => {
    test('pressing Enter triggers an alert with the input value', async ({
      page,
    }) => {
      const input = page.getByLabel('Input write-some-text')
      await input.fill('bonjour')

      const dialogPromise = page.waitForEvent('dialog', async (dialog) => {
        expect(dialog.message()).toBe('bonjour')
        await dialog.dismiss()
        return true
      })
      await input.press('Enter')
      await dialogPromise
    })

    test('alert contains the exact text typed by the user', async ({
      page,
    }) => {
      const input = page.getByLabel('Input write-some-text')
      await input.fill('hello world 123')

      const dialogPromise = page.waitForEvent('dialog', async (dialog) => {
        expect(dialog.message()).toBe('hello world 123')
        await dialog.dismiss()
        return true
      })
      await input.press('Enter')
      await dialogPromise
    })
  })

  test.describe('addElementsInListOnEnterKey', () => {
    test('pressing Enter adds the text as a <li> in the #list', async ({
      page,
    }) => {
      const input = page.getByLabel('Add text to list :')
      await input.fill('Bonjour in list')
      await input.press('Enter')

      await expect(
        page.locator('#list > li').getByText('Bonjour in list'),
      ).toHaveCount(1)
    })

    test('input is cleared after the item is added', async ({ page }) => {
      const input = page.getByLabel('Add text to list :')
      await input.fill('Some text')
      await input.press('Enter')

      await expect(input).toHaveValue('')
    })

    test('blurring the field also adds the text to the list', async ({
      page,
    }) => {
      const input = page.getByLabel('Add text to list :')
      await input.fill('Added on blur')
      // Click away to blur the input and trigger change event
      await page.getByText('React to change events').click()

      await expect(
        page.locator('#list').getByText('Added on blur'),
      ).toHaveCount(1)
      await expect(input).toHaveValue('')
    })

    test('empty input does not add an item to the list', async ({ page }) => {
      const input = page.getByLabel('Add text to list :')

      // First add one item so we have a baseline
      await input.fill('first item')
      await input.press('Enter')
      await expect(page.locator('#list > li')).toHaveCount(1)

      // Try to add an empty item
      await input.fill('')
      await input.press('Enter')

      // Still only one item in the list
      await expect(page.locator('#list > li')).toHaveCount(1)
    })

    test('multiple items can be added sequentially', async ({ page }) => {
      const input = page.getByLabel('Add text to list :')

      await input.fill('Item A')
      await input.press('Enter')
      await input.fill('Item B')
      await input.press('Enter')
      await input.fill('Item C')
      await input.press('Enter')

      const items = page.locator('#list > li')
      await expect(items).toHaveCount(3)
      await expect(items.nth(0)).toHaveText('Item A')
      await expect(items.nth(1)).toHaveText('Item B')
      await expect(items.nth(2)).toHaveText('Item C')
    })
  })

  test.describe('removeElementsFromListWhenClicked', () => {
    test('clicking a list item removes it from the list', async ({ page }) => {
      const input = page.getByLabel('Add text to list :')
      await input.fill('item to remove')
      await input.press('Enter')

      const item = page.locator('#list').getByText('item to remove')
      await expect(item).toHaveCount(1)

      await item.click()
      await expect(item).toHaveCount(0)
    })

    test('removing one item does not affect other items', async ({ page }) => {
      const input = page.getByLabel('Add text to list :')

      await input.fill('keep me')
      await input.press('Enter')
      await input.fill('delete me')
      await input.press('Enter')

      await expect(page.locator('#list > li')).toHaveCount(2)

      await page.locator('#list').getByText('delete me').click()

      await expect(page.locator('#list > li')).toHaveCount(1)
      await expect(page.locator('#list').getByText('keep me')).toHaveCount(1)
    })
  })

  test.describe('mouseMovements', () => {
    test('displays mouse coordinates in #mouse-coordinates', async ({
      page,
    }) => {
      const coords = page.locator('#mouse-coordinates')

      await page.mouse.move(200, 200)
      await expect(coords).toHaveText('x: 200, y: 200')
    })

    test('coordinates update when the mouse moves to a new position', async ({
      page,
    }) => {
      const coords = page.locator('#mouse-coordinates')

      await page.mouse.move(200, 200)
      await expect(coords).toHaveText('x: 200, y: 200')

      await page.mouse.move(457, 384)
      await expect(coords).toHaveText('x: 457, y: 384')
    })
  })

  test.describe('hoverFocusAndBlur', () => {
    const defaultBorderColor = 'rgb(100, 149, 237)'

    test('hovering the input changes all labels to "Yes, you hover me !"', async ({
      page,
    }) => {
      await page.locator('#focus-me').hover()
      await expect(page.getByText('Yes, you hover me !')).toHaveCount(2)
    })

    test('moving the mouse away restores original label text', async ({
      page,
    }) => {
      await test.step('verify initial labels', async () => {
        await expect(page.getByText('Focus me :')).toHaveCount(1)
        await expect(
          page.getByText('A second label ! just for fun'),
        ).toHaveCount(1)
      })

      await test.step('hover to change labels', async () => {
        await page.locator('#focus-me').hover()
        await expect(page.getByText('Yes, you hover me !')).toHaveCount(2)
      })

      await test.step('move mouse away to restore labels', async () => {
        await page.mouse.move(0, 0)
        await expect(page.getByText('Focus me :')).toHaveCount(1)
        await expect(
          page.getByText('A second label ! just for fun'),
        ).toHaveCount(1)
      })
    })

    test('focusing the input changes its border color from the default', async ({
      page,
    }) => {
      const input = page.locator('#focus-me')
      await expect(input).toHaveCSS('border-color', defaultBorderColor)

      await input.focus()
      await expect(input).not.toHaveCSS('border-color', defaultBorderColor)
    })

    test('blurring the input resets its border color back to the default', async ({
      page,
    }) => {
      const input = page.locator('#focus-me')

      await input.focus()
      await expect(input).not.toHaveCSS('border-color', defaultBorderColor)

      // Blur by focusing another element
      await page.getByLabel('Add text to list :').focus()
      await expect(input).toHaveCSS('border-color', defaultBorderColor)
    })

    test('focusing a second time uses a different random color than the first', async ({
      page,
    }) => {
      const input = page.locator('#focus-me')

      // First focus - capture the color
      await input.focus()
      const firstColor = await input.evaluate(
        (el) => getComputedStyle(el).borderColor,
      )
      expect(firstColor).not.toBe(defaultBorderColor)

      // Blur
      await page.getByLabel('Add text to list :').focus()
      await expect(input).toHaveCSS('border-color', defaultBorderColor)

      // Second focus - should be a different color
      await input.focus()
      await expect(input).not.toHaveCSS('border-color', defaultBorderColor)
      await expect(input).not.toHaveCSS('border-color', firstColor)
    })
  })

  test.describe('changesOnInputEvents', () => {
    test('typing in the input changes the default border color (visible after blur)', async ({
      page,
    }) => {
      const defaultBorderColor = 'rgb(100, 149, 237)'
      const input = page.locator('#focus-me')

      await test.step('focus and type a character', async () => {
        await input.focus()
        await input.pressSequentially('A')
      })

      await test.step('blur — border should be the new default, not the original', async () => {
        await page.getByLabel('Add text to list :').focus()
        await expect(input).not.toHaveCSS('border-color', defaultBorderColor)
      })
    })

    test('label text color is set to the new default border color', async ({
      page,
    }) => {
      const input = page.locator('#focus-me')

      await test.step('focus and type to trigger input event', async () => {
        await input.focus()
        await input.pressSequentially('B')
      })

      await test.step('blur to apply the new default border color', async () => {
        await page.getByLabel('Add text to list :').focus()
      })

      await test.step('verify labels text color matches the new border color', async () => {
        const newBorderColor = await input.evaluate(
          (el) => getComputedStyle(el).borderColor,
        )
        await expect(page.getByText('Focus me :')).toHaveCSS(
          'color',
          newBorderColor,
        )
        await expect(page.getByText('A second label ! just for fun')).toHaveCSS(
          'color',
          newBorderColor,
        )
      })
    })
  })
})
