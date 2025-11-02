const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Your Contentstack credentials
const STACK_API_KEY = 'bltfe96f37415d9a587';
const MANAGEMENT_TOKEN = 'cs9cd8c3c984f56c93190a4f61';
const BASE_URL = 'https://api.contentstack.io/v3';

// Headers for API calls
const headers = {
  'api_key': STACK_API_KEY,
  'authorization': MANAGEMENT_TOKEN,
  'Content-Type': 'application/json'
};

// Content types to import
const contentTypes = [
  { file: 'home-page.json', name: 'Home Page' },
  { file: 'men-shirts.json', name: 'Men Shirts' },
  { file: 'men-jackets.json', name: 'Men Jackets' },
  { file: 'men-shoes.json', name: 'Men Shoes' },
  { file: 'women-jewelry.json', name: 'Women Jewelry' },
  { file: 'handbags.json', name: 'Handbags' },
  { file: 'women-fragrance.json', name: 'Women Fragrance' },
  { file: 'women-jackets.json', name: 'Women Jackets' },
  { file: 'men-fragrance.json', name: 'Men Fragrance' },
  { file: 'men-tshirts.json', name: 'Men T-Shirts' },
  { file: 'men-blazers.json', name: 'Men Blazers' },
  { file: 'men-formal-shoes.json', name: 'Men Formal Shoes' },
  { file: 'men-sneakers.json', name: 'Men Sneakers' },
  { file: 'men-boots.json', name: 'Men Boots' },
  { file: 'men-watches.json', name: 'Men Watches' },
  { file: 'men-belts.json', name: 'Men Belts' },
  { file: 'men-ties.json', name: 'Men Ties' },
  { file: 'women-tops.json', name: 'Women Tops' },
  { file: 'women-office-wear.json', name: 'Women Office Wear' },
  { file: 'women-dresses.json', name: 'Women Dresses' },
  { file: 'women-scarves.json', name: 'Women Scarves' },
  { file: 'tote-bags.json', name: 'Tote Bags' },
  { file: 'shoulder-bags.json', name: 'Shoulder Bags' },
  { file: 'clutches.json', name: 'Clutches' },
  { file: 'wallets-long.json', name: 'Long Wallets' },
  { file: 'coin-purses.json', name: 'Coin Purses' },
  { file: 'beauty-daily-care.json', name: 'Beauty Daily Care' },
  { file: 'beauty-night-care.json', name: 'Beauty Night Care Complete Set' }
];

async function importContentType(filePath, name) {
  try {
    console.log(`🚀 Importing ${name}...`);
    
    // Read the JSON schema
    const schemaPath = path.join(__dirname, 'contentstack-schemas', filePath);
    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
    
    // Remove timestamps and version info for import
    delete schema.created_at;
    delete schema.updated_at;
    delete schema._version;
    delete schema.last_activity;
    delete schema.DEFAULT_ACL;
    delete schema.SYS_ACL;
    delete schema.field_rules;
    delete schema.abilities;
    
    // Create the content type
    const response = await axios.post(
      `${BASE_URL}/content_types`,
      { content_type: schema },
      { headers }
    );
    
    console.log(`✅ ${name} imported successfully! UID: ${response.data.content_type.uid}`);
    return response.data;
    
  } catch (error) {
    console.error(`❌ Error importing ${name}:`, error.response?.data || error.message);
    throw error;
  }
}

async function bulkImportAllContentTypes() {
  console.log('🎯 Starting bulk import of Contentstack Clothing content types...\n');
  
  const results = [];
  
  for (const contentType of contentTypes) {
    try {
      const result = await importContentType(contentType.file, contentType.name);
      results.push({ name: contentType.name, status: 'success', uid: result.content_type.uid });
      
      // Add delay between imports to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      results.push({ name: contentType.name, status: 'failed', error: error.message });
    }
  }
  
  // Summary
  console.log('\n📊 IMPORT SUMMARY:');
  console.log('==================');
  results.forEach(result => {
    if (result.status === 'success') {
      console.log(`✅ ${result.name} - UID: ${result.uid}`);
    } else {
      console.log(`❌ ${result.name} - Error: ${result.error}`);
    }
  });
  
  const successful = results.filter(r => r.status === 'success').length;
  console.log(`\n🎉 ${successful}/${results.length} content types imported successfully!`);
  
  if (successful === results.length) {
    console.log('\n🔥 ALL CONTENT TYPES IMPORTED! Your Contentstack Clothing site is ready!');
    console.log('Next steps:');
    console.log('1. Go to Contentstack → Entries');
    console.log('2. Start adding your products');
    console.log('3. Connect your Next.js website to fetch data');
  }
}

// Run the bulk import
bulkImportAllContentTypes().catch(console.error);
