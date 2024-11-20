# Nikunja Gallery 🖼️📸

## Project Overview

Nikunja Gallery is a sophisticated, modern web application designed for elegant and secure photo album management. Built with React and cutting-edge web technologies, this gallery offers a seamless, visually stunning experience for browsing and viewing personal photo collections.

## 🌟 Key Features

### 1. Dynamic Album Management
- Create and manage multiple photo albums
- Responsive grid-based album thumbnail view
- Intuitive navigation between albums and individual photos

### 2. Advanced Image Rendering
- Lazy loading of images for optimal performance
- Intersection observer for efficient image loading
- Adaptive image sizing and aspect ratio preservation

### 3. Animated User Experience
- Smooth page transitions using Framer Motion
- Hover and interaction animations
- Subtle background effects (animated fog overlay)

### 4. Content Safety Mechanisms
- Specialized content warning system for sensitive albums
- Age verification modal for restricted content
- Persistent verification using browser local storage
- Granular album-level content protection

### 5. Responsive Design
- Mobile-friendly layout
- Adaptive grid systems
- Touch-friendly interactions

## 🔐 Content Protection Architecture

### Age Verification Modal
```typescript
interface ContentWarningModalProps {
  onAccept: () => void;
  onDecline: () => void;
}
```

#### Verification Flow
1. Detect sensitive album (e.g., "myth")
2. Trigger content warning modal
3. User can:
   - Accept and view album
   - Decline and navigate away
4. Store verification state in localStorage
5. Subsequent visits bypass verification

### Security Considerations
- Client-side verification only
- No sensitive data stored permanently
- Easy to clear verification status
- Configurable per album

## 🚀 Technical Stack

### Frontend
- React 18
- TypeScript
- React Router
- Framer Motion
- Tailwind CSS

### Animation & Performance
- CSS Animations
- Intersection Observer API
- Web Storage API
- Lazy Loading Techniques

### Responsive Design Approach
- Mobile-first design
- Flexbox and Grid layouts
- Responsive image handling

## 📦 Project Structure

```
src/
├── components/
│   ├── AlbumThumbnail.tsx
│   ├── AlbumView.tsx
│   ├── ContentWarningModal.tsx
│   └── PhotoViewer.tsx
├── hooks/
│   └── usePhotos.ts
├── types/
│   └── index.ts
├── App.tsx
└── index.tsx
```

## 🛠 Development Setup

### Prerequisites
- Node.js (v16+ recommended)
- npm or Yarn
- Git

### Local Development

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/nikunja-gallery.git
   cd nikunja-gallery
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Environment Configuration
   Create a `.env` file with:
   ```
   REACT_APP_PHOTOS_API_ENDPOINT=your_photos_api_endpoint
   ```

4. Start Development Server
   ```bash
   npm start
   # or
   yarn start
   ```

### Build for Production
```bash
npm run build
# or
yarn build
```

## 🌈 Customization

### Album Configuration
Modify `src/types/index.ts` to adjust album and photo interfaces:

```typescript
export interface Album {
  name: string;
  photos: Photo[];
  requiresVerification?: boolean;
}

export interface Photo {
  url: string;
  filename: string;
  metadata?: Record<string, any>;
}
```

### Content Warning Customization
Edit `ContentWarningModal.tsx` to:
- Modify warning text
- Adjust styling
- Add additional verification steps

## 🚢 Deployment

### Supported Platforms
- Cloudflare Pages
- Netlify
- Vercel
- GitHub Pages

### Deployment Tips
- Configure build settings in platform dashboard
- Set environment variables
- Enable HTTPS
- Configure CORS for photo sources

## 🔒 Security Best Practices

1. Never store sensitive verification logic server-side
2. Use localStorage for temporary client-side state
3. Implement additional server-side access controls if needed
4. Regularly update dependencies
5. Use Content Security Policy (CSP)

## 📊 Performance Optimization

- Image lazy loading
- Minimal initial bundle size
- Efficient state management
- Memoization of complex components

## 🧪 Testing

### Recommended Testing Approach
- Unit Tests: React Testing Library
- Component Tests: Storybook
- End-to-End Tests: Cypress

## 🔧 Troubleshooting

### Common Issues
- Images not loading
- Verification not persisting
- Responsive design breaks

### Debugging
- Check browser console
- Verify localStorage
- Use React DevTools

## 📝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create pull request

## 📄 License

[Insert your license - MIT/Apache/etc.]

## 🙏 Acknowledgements
- React Community
- Framer Motion
- Tailwind CSS
- Open Source Contributors

---

**Happy Photographing! 📷✨**
