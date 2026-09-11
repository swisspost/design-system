// Import the KLP URL configuration from the internet-header package
import { getSessionUrl } from '@swisspost/internet-header/config/klp-urls';

// Get the appropriate URL based on your environment
const environment = 'prod'; // Change to your environment (int01, int02, etc.)
const sessionUrl = getSessionUrl(environment as any);

const response = await fetch(sessionUrl, {
  credentials: 'include',
});
const json = await response.json();
const user = json?.data; // { name, surname, email, ... }
