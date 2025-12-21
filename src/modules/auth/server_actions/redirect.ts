'use server'

import { redirect as serverRedirect, RedirectType } from 'next/navigation'

export async function redirect(page: string) {
  serverRedirect(`${page}`, RedirectType.push)
}
