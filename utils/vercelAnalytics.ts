// vercelAnalytics.ts

import { Analytics } from '@vercel/analytics';

const vercelAnalytics = new Analytics();

export function initVercelAnalytics() {
    vercelAnalytics.init();
}

export default vercelAnalytics;