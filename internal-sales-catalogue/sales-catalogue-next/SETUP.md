# Sales Catalogue - Setup Guide

## Environment Variables

Create `.env.local` in the project root using `.env.example` as a template.

**⚠️ IMPORTANT:** Never commit `.env.local` to version control!

## Google Sheets Setup

1. **Create a Google Service Account**
   - Go to Google Cloud Console
   - Enable Google Sheets API
   - Create service account credentials

2. **Share your Google Sheet**
   - Share with the service account email
   - Permission: Must be **Editor** (not Viewer)

3. **Sheet Structure**
   - Create a "Products" tab with your product data
   - Orders tab will be auto-created

## Products Tab Columns

Required columns (case-insensitive):
- ID (unique identifier)
- Name (product name)
- Category (product category)
- Size (optional)
- Price (numeric price)
- Image (image URL, optional)
- Description (optional)

## Deployment

### Vercel
1. Push to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Local Development
```bash
npm install
npm run dev
```

## Features

- **PWA Support**: Installable on mobile devices
- **Image Gallery**: Multiple images per product
- **Cart Management**: Real-time quantity updates
- **Order Tracking**: Orders saved to Google Sheets
- **Responsive Design**: Works on all devices

## Troubleshooting

### Orders not saving
- Verify environment variables
- Check service account permissions
- Ensure sheet has correct permissions

### Images not loading
- Verify image domains in `next.config.ts`
- Check image URLs are accessible

For detailed setup instructions, refer to the inline code comments.
