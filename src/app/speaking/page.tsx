import { redirect } from 'next/navigation'

// The template's example speaking engagements are not real portfolio entries.
// Until actual speaking content exists, keep this legacy URL out of the public site.
export default function Speaking() {
  redirect('/about')
}
