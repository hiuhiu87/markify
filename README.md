# Markify

[![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.0.0-blue?logo=react)](https://reactjs.org)
[![TipTap](https://img.shields.io/badge/TipTap-2.23.0-purple?logo=tiptap)](https://tiptap.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?logo=tailwind-css)](https://tailwindcss.com)

A modern, real-time rich text to Markdown converter with a beautiful split-pane interface. Built with Next.js, TipTap editor, and Tailwind CSS.

![Markify Screenshot](https://via.placeholder.com/800x400/1e293b/ffffff?text=Markify+Screenshot)

## ✨ Features

- **🔥 Real-time Conversion**: See your Markdown output update instantly as you type
- **📝 Rich Text Editor**: Full-featured WYSIWYG editor powered by TipTap
- **🌓 Dark/Light Theme**: Toggle between beautiful dark and light themes
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **🎯 Split-pane Interface**: Resizable editor and preview panels
- **📊 Live Statistics**: Character, word, and line counts in real-time
- **🎨 Modern UI**: Clean, professional interface with smooth animations
- **📋 Copy Support**: Easy copying of generated Markdown
- **🚀 Fast Performance**: Built with Next.js 15 and React 19

### Editor Features

- **Text Formatting**: Bold, italic, underline, strikethrough
- **Headings**: H1-H6 with dropdown selection
- **Lists**: Ordered, unordered, and task lists
- **Code**: Inline code and code blocks with syntax highlighting
- **Quotes**: Blockquotes for emphasis
- **Links**: Smart link insertion and editing
- **Images**: Image upload and insertion
- **Alignment**: Text alignment options
- **Typography**: Smart typography features
- **Subscript/Superscript**: Advanced text formatting
- **Highlighting**: Text highlighting with color options

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm/yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd markify
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3004](http://localhost:3004) to see the application.

### Build for Production

```bash
pnpm build
pnpm start
```

## 🏗️ Project Structure

```
src/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
├── components/
│   ├── tiptap-extension/        # Custom TipTap extensions
│   │   ├── link-extension.ts
│   │   ├── selection-extension.ts
│   │   └── trailing-node-extension.ts
│   ├── tiptap-icons/           # Icon components
│   ├── tiptap-node/            # Custom node components
│   │   ├── code-block-node/
│   │   ├── image-node/
│   │   ├── image-upload-node/
│   │   ├── list-node/
│   │   └── paragraph-node/
│   ├── tiptap-templates/       # Editor templates
│   │   └── simple/
│   ├── tiptap-ui/             # UI components for editor
│   │   ├── blockquote-button/
│   │   ├── code-block-button/
│   │   ├── heading-dropdown-menu/
│   │   ├── link-popover/
│   │   └── ...
│   ├── tiptap-ui-primitive/   # Base UI primitives
│   │   ├── button/
│   │   ├── dropdown-menu/
│   │   ├── popover/
│   │   └── ...
│   └── ui/                    # General UI components
├── hooks/                     # Custom React hooks
│   ├── use-cursor-visibility.ts
│   ├── use-menu-navigation.ts
│   ├── use-mobile.ts
│   ├── use-resizable.ts
│   ├── use-tiptap-editor.ts
│   └── use-window-size.ts
├── lib/                       # Utility libraries
│   ├── tiptap-utils.ts
│   └── utils.ts
├── styles/                    # SCSS styles
│   ├── _keyframe-animations.scss
│   └── _variables.scss
├── ui/                        # Page-specific UI
│   └── home/
└── utils/                     # Utility functions
```

## 🛠️ Technologies Used

### Core Framework
- **Next.js 15.3.4** - React framework with App Router
- **React 19.0.0** - UI library
- **TypeScript 5.x** - Type safety

### Editor
- **@tiptap/react 2.23.0** - Headless editor framework
- **@tiptap/starter-kit** - Essential editor extensions
- **Multiple TipTap extensions** - Rich text features

### Styling
- **Tailwind CSS 4.x** - Utility-first CSS framework
- **Sass 1.89.2** - CSS preprocessor
- **Lucide React** - Beautiful icons

### Utilities
- **Turndown 7.2.0** - HTML to Markdown conversion
- **class-variance-authority** - Component styling variants
- **clsx & tailwind-merge** - Conditional CSS classes

### Development Tools
- **ESLint 9.x** - Code linting
- **@floating-ui/react** - Floating UI elements
- **@radix-ui/react-slot** - Composable components

## 🎯 Usage

1. **Start Writing**: Click in the left panel and start typing your content
2. **Format Text**: Use the toolbar to apply formatting (bold, italic, headings, etc.)
3. **See Live Preview**: Watch the Markdown output update in real-time on the right panel
4. **Resize Panels**: Drag the divider between panels to adjust the layout
5. **Toggle Theme**: Use the theme toggle in the header to switch between light and dark modes
6. **Copy Markdown**: Click the copy button to copy the generated Markdown

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TipTap](https://tiptap.dev) - For the excellent editor framework
- [Next.js](https://nextjs.org) - For the amazing React framework
- [Tailwind CSS](https://tailwindcss.com) - For the utility-first CSS framework
- [Lucide](https://lucide.dev) - For the beautiful icons

## 📞 Support

If you have any questions or need help, please feel free to reach out or open an issue.

---

<div align="center">
  Made with ❤️ using Next.js and TipTap
</div>
