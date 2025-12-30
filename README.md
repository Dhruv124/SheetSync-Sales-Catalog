## 🛍️ SheetSync: Modern Sales Engine - Modern E-commerce PWA

A feature-rich, responsive sales catalogue application built with Next.js 16, React 19, and TypeScript. Perfect for retail businesses, sales teams, and trade shows to showcase products and manage orders seamlessly.

## ✨ Key Features

### 🛒 **E-commerce Functionality**
- **Smart Cart Management**: Real-time cart synchronization across all components
- **Quantity Controls**: Intuitive +/- buttons with live updates
- **Order Processing**: Complete order workflow with data persistence
- **Product Variants**: Support for sizes, categories, and multiple images

### 📱 **Progressive Web App (PWA)**
- **Installable**: Add to home screen on mobile devices
- **Offline Support**: Basic offline functionality for reliability
- **App-like Experience**: Standalone mode without browser UI
- **Fast Loading**: Optimized for mobile networks

### 🖼️ **Rich Media Experience**
- **Image Gallery**: Multiple images per product with smooth slider
- **Smart Navigation**: Arrow buttons, thumbnail dots, and swipe gestures
- **Image Optimization**: Next.js Image component with lazy loading
- **Fallback Handling**: Graceful degradation for missing images

### 🎨 **Modern UI/UX**
- **Responsive Design**: Perfect on desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion for delightful interactions
- **Professional Styling**: Tailwind CSS with custom branding
- **Accessibility**: WCAG compliant with proper ARIA labels

### ⚡ **Performance & Reliability**
- **Data Caching**: 60-second cache for optimal performance
- **Error Handling**: Graceful fallbacks and error recovery
- **Type Safety**: Full TypeScript implementation
- **SEO Optimized**: Meta tags and structured data

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/sales-catalogue-next.git
   cd sales-catalogue-next
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   GOOGLE_SHEET_ID=your_google_sheet_id_here
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account@gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open Your Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Documentation

- **[📋 Setup Guide](./SETUP.md)** - Detailed configuration and data source setup
- **[🚀 Deployment Guide](./DEPLOYMENT.md)** - Production deployment instructions
- **[🔐 Security Guide](./SECURITY.md)** - Security best practices and considerations

## 🛠️ Tech Stack

### **Frontend Framework**
- **Next.js 16** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development

### **Styling & UI**
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Animation library
- **Custom CSS Variables** - Casa Copenhagen branding

### **State Management**
- **Zustand** - Lightweight state management
- **Local Storage Persistence** - Cart data persistence

### **PWA & Performance**
- **Next PWA** - Progressive Web App features
- **Next.js Image** - Optimized image loading
- **Service Worker** - Offline functionality

### **Development Tools**
- **ESLint** - Code linting and formatting
- **TypeScript** - Static type checking
- **Hot Reload** - Fast development experience

## 📱 PWA Features

### **Mobile Experience**
- **Installation Prompt**: "Add to Home Screen" on mobile
- **Standalone Mode**: Full-screen app experience
- **Theme Colors**: Custom Casa Copenhagen branding
- **Splash Screen**: Professional loading experience

### **Offline Capabilities**
- **Service Worker**: Caches essential assets
- **Fallback Pages**: Graceful offline handling
- **Network Detection**: Smart online/offline behavior

## 🎯 Use Cases

### **Retail Businesses**
- **Product Catalogue**: Showcase your entire product line
- **In-Store Ordering**: Sales reps take orders on tablets
- **Customer Self-Service**: Customers browse and order independently

### **Sales Teams**
- **Mobile Order Taking**: Field sales with offline capability
- **Trade Show Support**: Interactive product demonstrations
- **Client Presentations**: Professional product showcase

### **E-commerce**
- **Lightweight Store**: Fast, mobile-first shopping experience
- **Inventory Management**: Real-time product updates
- **Order Processing**: Complete order workflow

## 🏗️ Project Structure

```
sales-catalogue-next/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   ├── product/[id]/      # Dynamic product pages
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # Reusable components
│   │   ├── Header.tsx         # Navigation header
│   │   ├── ProductCard.tsx    # Product grid card
│   │   ├── ProductQuantity.tsx # Quantity controls
│   │   ├── ImageSlider.tsx    # Image gallery
│   │   ├── CartDrawer.tsx     # Shopping cart
│   │   └── ProductImage.tsx   # Optimized images
│   ├── lib/                   # Utilities and integrations
│   │   ├── google-sheets.ts   # Data source integration
│   │   └── constants.ts       # Shared constants
│   ├── store/                 # State management
│   │   └── cartStore.ts       # Cart state with Zustand
│   └── data/                  # Data types and mocks
│       └── mockData.ts        # Mock product data
├── public/                    # Static assets
│   ├── icons/                 # PWA icons
│   └── manifest.json          # PWA manifest
├── .env.example              # Environment template
├── .gitignore               # Git ignore rules
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind configuration
└── package.json             # Dependencies and scripts
```

## 🔧 Customization

### **Branding**
- **Colors**: Edit CSS variables in `globals.css`
- **Logo**: Replace icons in `public/icons/`
- **Fonts**: Modify font imports in `layout.tsx`

### **Data Source**
- **Google Sheets**: Configure in `.env.local`
- **Custom API**: Modify `src/lib/google-sheets.ts`
- **Mock Data**: Update `src/data/mockData.ts`

### **Features**
- **Cart Logic**: Modify `src/store/cartStore.ts`
- **Product Display**: Update component props
- **PWA Settings**: Edit `public/manifest.json`

## 📊 Performance Features

### **Optimizations**
- **Image Optimization**: Next.js Image with lazy loading
- **Code Splitting**: Automatic route-based splitting
- **Caching**: 60-second data cache
- **Bundle Analysis**: Optimized dependencies

### **Metrics**
- **Lighthouse Score**: 95+ Performance
- **Core Web Vitals**: Optimized for user experience
- **Mobile Performance**: Optimized for mobile networks

## 🛡️ Security

### **Built-in Security**
- **Environment Variables**: No hardcoded secrets
- **Type Safety**: TypeScript prevents runtime errors
- **Input Validation**: Form data validation
- **XSS Protection**: React's built-in protections

### **Best Practices**
- **No API Keys in Code**: All secrets in environment
- **Secure Headers**: Proper security headers
- **Dependency Updates**: Regular security updates
- **Code Reviews**: Security-focused development

## 🚀 Deployment

### **Vercel (Recommended)**
1. Connect repository to Vercel
2. Add environment variables in dashboard
3. Deploy with automatic CI/CD

### **Other Platforms**
- **Netlify**: Static site generation
- **AWS**: Serverless deployment
- **Docker**: Containerized deployment

### **Environment Variables Required**
- `GOOGLE_SHEET_ID`: Your Google Sheet ID
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`: Service account email
- `GOOGLE_PRIVATE_KEY`: Service account private key

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the Repository**
2. **Create Feature Branch** (`git checkout -b feature/amazing-feature`)
3. **Commit Changes** (`git commit -m 'Add amazing feature'`)
4. **Push to Branch** (`git push origin feature/amazing-feature`)
5. **Open Pull Request**

### **Development Guidelines**
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Test on multiple devices
- Update documentation

## 📄 License

This project is provided as a template for educational and commercial use. Please customize for your specific needs.

## 🆘 Support

### **Common Issues**
- **Images Not Loading**: Check environment variables and permissions
- **Cart Not Syncing**: Verify state management configuration
- **PWA Not Installing**: Ensure HTTPS and proper manifest

### **Getting Help**
- Check the [Setup Guide](./SETUP.md) for configuration
- Review [Deployment Guide](./DEPLOYMENT.md) for production issues
- See [Security Guide](./SECURITY.md) for security concerns

---

## 🎉 Ready to Launch!

Your Sales Catalogue is now ready for production. With its modern tech stack, responsive design, and PWA capabilities, you have a professional e-commerce solution that works seamlessly across all devices.

**Happy Selling!** 🛍️✨

---

**⚠️ Security Reminder**: Never commit your `.env.local` file or share actual credentials. This repository is sanitized for public sharing.
