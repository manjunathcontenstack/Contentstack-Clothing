# 🎯 Contentstack Clothing - Content Type Schemas

Complete JSON schemas for your luxury fashion e-commerce website built on Contentstack CMS.

## 📦 Content Types Overview

Based on your navigation structure, here are all the content types created:

### 👔 **Men's Collection**
- **Men Shirts** (`men_shirts`) - Business, casual, formal shirts
- **Men Jackets** (`men_jackets`) - Blazers, bombers, leather jackets, coats
- **Men Shoes** (`men_shoes`) - Formal, casual, sneakers, boots

### 👗 **Women's Collection**  
- **Women Jewelry** (`women_jewelry`) - Necklaces, earrings, bracelets, rings
- **Women Tops** - *(Schema can be created similar to men shirts)*
- **Women Kurta** - *(Schema can be created with ethnic wear fields)*
- **Women Office Wear** - *(Schema can be created with professional attire fields)*

### 👜 **Bags & Accessories**
- **Handbags** (`handbags`) - Totes, shoulder bags, clutches, crossbody
- **Wallets** - *(Schema can be created similar to handbags with wallet-specific fields)*

### 💄 **Beauty & Fragrance**
- **Women Fragrance** (`women_fragrance`) - Perfumes, eau de toilette, body mists
- **Men Fragrance** - *(Schema can be created similar to women fragrance)*
- **Daily Care** - *(Schema can be created with skincare/beauty fields)*
- **Night Care Complete Set** - *(Schema for beauty sets and bundles)*

## 🔧 **Common Fields Across All Products**

Every product schema includes these essential e-commerce fields:

### **Basic Information**
- `title` - Product name (mandatory, unique)
- `description` - Rich text product description
- `product_images` - Multiple image gallery
- `sku` - Stock keeping unit (unique identifier)
- `brand` - Brand name

### **Pricing**
- `price` - Regular price
- `sale_price` - Discounted price (optional)

### **Inventory**
- `in_stock` - Boolean availability status
- `featured` - Mark as featured product

### **Product Attributes**
Each category has specific fields:
- **Clothing**: fabric, fitting, sizes, colors, care instructions
- **Shoes**: material, sole type, width options, waterproof
- **Jewelry**: metal type, gemstones, chain length, hypoallergenic
- **Bags**: material, closure type, dimensions, compartments
- **Fragrance**: scent family, notes, longevity, volume options

## 🚀 **How to Import to Contentstack**

### **Step 1: Access Content Types**
1. Log into your Contentstack dashboard
2. Go to **Content Types** in the left sidebar
3. Click **+ New Content Type**

### **Step 2: Import Schema**
1. Choose **Import from JSON**
2. Copy the entire JSON from any schema file
3. Paste it into the import dialog
4. Click **Import**

### **Step 3: Customize if Needed**
- Add additional fields specific to your business
- Modify dropdown choices
- Adjust field validations
- Set up field rules and dependencies

### **Step 4: Create Entries**
1. Go to **Entries** section
2. Select your imported content type
3. Start adding your products!

## 📋 **Schema Features**

### **Field Types Used**
- ✅ **Text** - Names, descriptions, SKUs
- ✅ **Rich Text** - Detailed product descriptions  
- ✅ **Number** - Prices, dimensions, quantities
- ✅ **Boolean** - Stock status, featured flags
- ✅ **Dropdown** - Predefined choices (sizes, colors, materials)
- ✅ **Multiple** - Arrays for sizes, colors, images
- ✅ **File** - Product image galleries

### **E-commerce Ready**
- Product image galleries
- Pricing with sale price support
- Inventory management fields
- SEO-friendly structure
- Multi-language support ready

### **Luxury Fashion Focused**
- Premium material types
- Designer brand fields
- Size and fit specifications
- Care instruction fields
- Gift options and packaging

## 🎨 **Customization Tips**

### **Add Your Brand Specifics**
```json
{
  "display_name": "Your Custom Field",
  "uid": "custom_field",
  "data_type": "text",
  "mandatory": false
}
```

### **Create Product Relationships**
```json
{
  "display_name": "Related Products",
  "uid": "related_products", 
  "data_type": "reference",
  "reference_to": ["men_shirts", "men_jackets"]
}
```

### **Add Inventory Tracking**
```json
{
  "display_name": "Stock Quantity",
  "uid": "stock_quantity",
  "data_type": "number",
  "mandatory": true
}
```

## 🔗 **Integration with Your Website**

Once you have content in Contentstack, use the **Delivery API** to fetch products:

```javascript
// Example API call
const products = await stack
  .ContentType('men_shirts')
  .Query()
  .where('in_stock', true)
  .where('featured', true)
  .find()
```

## 📞 **Support**

These schemas are designed to work perfectly with your **Contentstack Clothing** website navigation structure. Each content type maps directly to your menu categories for seamless content management.

**Happy Content Managing! 🛍️**
