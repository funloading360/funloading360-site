# FunLoading360 Design System

## Overview

The FunLoading360 design system is built on a dark-first aesthetic with premium gold accents, designed for luxury event services. All components follow WCAG accessibility standards and are optimized for both desktop and mobile experiences.

---

## Colors

### Brand Colors

- **Gold**: `#f5a623` — Primary brand color, used for CTAs and accents
- **Gold Light**: `#fbbf4a` — Lighter gold for hover states
- **Gold Dark**: `#d4891a` — Darker gold for pressed states

### Background & Surface

- **Background**: `#0a0a0e` — Main background color (dark charcoal)
- **Surface**: `#13131a` — Card/container background (slightly lighter)
- **Surface Hover**: `#1c1c28` — Hover state for interactive surfaces
- **Border**: `#2a2a3a` — Border/divider color
- **Muted**: `#8888a0` — Secondary text color

### Semantic Colors

- **Foreground**: `#f0ede8` — Primary text (off-white)
- **Success**: `#10b981` — Green for success states
- **Error**: `#ef4444` — Red for errors and warnings
- **Warning**: `#f59e0b` — Amber for warnings
- **Info**: `#3b82f6` — Blue for informational messages

### Color Usage

```css
/* In CSS */
color: var(--gold);
background-color: var(--surface);
border-color: var(--border);

/* In Tailwind */
className="text-[#f5a623] bg-[#13131a] border-[#2a2a3a]"
```

---

## Typography

### Font Families

- **Display Font**: Playfair Display (Georgia fallback) — Headings (h1-h6)
- **Body Font**: Inter (system-ui fallback) — Body text and UI
- **Monospace**: System monospace — Code blocks (if needed)

### Font Sizes

| Size | Value | Usage |
|------|-------|-------|
| Display 1 (H1) | 48px (3rem) | Page titles, hero sections |
| Display 2 (H2) | 36px (2.25rem) | Section headings |
| Display 3 (H3) | 24px (1.5rem) | Card titles, subsections |
| Body Large | 16px (1rem) | Default body text |
| Body | 14px (0.875rem) | Secondary text |
| Small | 12px (0.75rem) | Captions, help text |

### Font Weights

- **400** — Normal weight (body text, default)
- **500** — Medium weight (UI elements, labels)
- **600** — Semibold (buttons, strong emphasis)
- **700+** — Bold weight (headings, strong CTAs)

### Line Height

- **Headings**: 1.2 (120%) — Tight line height
- **Body**: 1.6 (160%) — Comfortable reading
- **UI/Buttons**: 1.4 (140%) — Balanced spacing

---

## Spacing System

Uses a consistent 4px base unit for all spacing:

| Token | Value | Usage |
|-------|-------|-------|
| 2xs | 2px | Border width, fine details |
| xs | 4px | Minimal spacing |
| sm | 8px | Small gaps, icon spacing |
| md | 12px | Default component spacing |
| lg | 16px | Moderate gaps |
| xl | 24px | Section spacing |
| 2xl | 32px | Large gaps |
| 3xl | 48px | Extra large spacing |

### Tailwind Mapping

```
sm: 8px    (sm:)
md: 12px   (md:)
lg: 16px   (lg:)
xl: 24px   (xl:)
2xl: 32px  (2xl:)
```

---

## Components

### Button

#### Variants

**Primary CTA**
- Background: `#f5a623`
- Text: `#0a0a0e` (dark text on gold)
- Hover: Background → `#fbbf4a`
- Shadow: `shadow-lg shadow-[#f5a623]/20`
- Padding: `px-8 py-4` (desktop), `px-6 py-3` (mobile)

**Secondary**
- Border: `2px solid #2a2a3a`
- Text: White (`#ffffff`)
- Hover: Border → `#f5a623/40`, Background → `white/5`
- Padding: `px-8 py-4`

**Disabled**
- Opacity: 50%
- Cursor: `not-allowed`
- Text: Gray (`#888`)

#### Sizing

- **Desktop**: Minimum 44px height (WCAG AA)
- **Mobile**: Minimum 48px height (WCAG AAA)
- **Small**: 36px height for compact layouts
- **Large**: 56px height for prominent CTAs

#### States

- **Default**: Standard styling
- **Hover**: Color change, subtle lift (`-translate-y-0.5`)
- **Active/Pressed**: Darker color
- **Disabled**: Opacity reduction, cursor change
- **Focus**: 2px gold outline with 3px offset

#### Best Practices

1. Always include visible focus indicator
2. Use min-height instead of fixed height for flexibility
3. Include shadow for depth on primary buttons
4. Never disable buttons for animation—use loading state instead
5. Ensure 4.5:1 contrast ratio (WCAG AA)

---

### Form Input

#### States

- **Default**: Border `#2a2a3a`, placeholder gray
- **Focused**: Border + ring `#f5a623`, outline removed
- **Filled**: Text color white
- **Error**: Border + ring red, error icon + text
- **Disabled**: Opacity 50%, cursor `not-allowed`

#### Styling

```css
.input {
  @apply px-4 py-3 rounded-xl
    bg-[#13131a]
    border border-[#2a2a3a]
    text-white
    placeholder:text-gray-500
    focus:border-[#f5a623]/50
    focus:ring-1
    focus:ring-[#f5a623]/20
    outline-none
    transition-all duration-200;
}
```

#### Accessibility

- All inputs must have associated labels (visual or aria-label)
- Error messages linked with `aria-describedby`
- Error styling must include color + icon + text (not color alone)
- Min height: 48px (mobile), 44px (desktop)

#### Error Handling

```tsx
// Show error on blur, not onChange
<input
  aria-describedby={error ? "field-error" : undefined}
  className={error ? "border-red-500" : "border-[#2a2a3a]"}
/>
{error && (
  <div id="field-error" className="text-red-400 text-xs mt-2">
    <span>⚠️ {error}</span>
  </div>
)}
```

---

### Card

#### Styling

```css
.card {
  @apply rounded-2xl bg-[#13131a] border border-[#2a2a3a] p-6;
}

.card-accent {
  @apply border-[#f5a623]/50;
}

.card-hover {
  @apply hover:border-[#f5a623]/50 hover:bg-[#13131a] transition-all duration-200;
}
```

#### Layouts

- **Basic**: Title + description
- **Feature**: Image + content + CTA
- **Pricing**: Price + list + button
- **Testimonial**: Quote + author
- **Product**: Image + title + price + button

#### Responsive

- Mobile: Full width with margins
- Tablet: 2-column grid
- Desktop: 3-column grid with gap-6

---

### Modal

#### Styling

- **Backdrop**: `bg-black/70` (black with 70% opacity)
- **Modal**: `rounded-3xl`, border `#2a2a3a`
- **Max Width**: 448px (28rem)
- **Padding**: 32px (2xl)

#### Behavior

1. **Focus Trap**: Focus cycling within modal
2. **Escape Key**: Close modal with Escape
3. **Backdrop Click**: Optional (usually disabled for important dialogs)
4. **Announcement**: `role="dialog"` with appropriate `aria-label`
5. **Scroll**: Disable body scroll when modal open

#### Content Guidelines

- **Title**: Clear, concise heading
- **Description**: Explain context and actions
- **Primary Action**: Gold button (most important)
- **Secondary Action**: Border button (less important)
- **Close Option**: X button or Cancel (for non-blocking dialogs)

---

## Responsive Breakpoints

| Name | Min Width | Max Width | Devices |
|------|-----------|-----------|---------|
| Mobile | 0 | 639px | Phones |
| Tablet | 640px | 1023px | iPads, tablets |
| Desktop | 1024px | 1535px | Laptops, desktops |
| Wide | 1536px | — | Large monitors |

### Tailwind Breakpoints

- `sm:` → 640px
- `md:` → 768px
- `lg:` → 1024px
- `xl:` → 1280px
- `2xl:` → 1536px

### Mobile-First Approach

Always design mobile-first, then enhance for larger screens:

```tsx
// ✓ CORRECT: Mobile default, then larger screens
className="flex-col sm:flex-row"

// ✗ WRONG: Desktop-first
className="flex-row sm:flex-col"
```

---

## Accessibility Guidelines

### Contrast

- **WCAG AA**: 4.5:1 for normal text, 3:1 for large text
- **WCAG AAA**: 7:1 for normal text, 4.5:1 for large text

**Example Test**:
- Gold (#f5a623) on dark (#0a0a0e) = 7.8:1 ✓
- Gray (#999) on dark (#0a0a0e) = 4.5:1 ✓

### Focus Indicators

```css
:focus-visible {
  outline: 2px solid #f5a623;
  outline-offset: 3px;
  border-radius: 4px;
}
```

### Motion & Animation

```css
/* Always respect prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Example: Ping animation with motion respect */
@apply animate-ping motion-reduce:animate-none
```

### Touch Targets

- **Minimum size**: 48x48px (WCAG AAA)
- **Recommended spacing**: 8px between targets
- **Button text**: Must be readable without zoom

### Keyboard Navigation

- All interactive elements must be focusable
- Logical tab order (top-to-bottom, left-to-right)
- Links and buttons must be distinguishable
- Forms must have labels
- Modals must trap focus

### Semantic HTML

```tsx
// ✓ CORRECT
<button onClick={handleClick}>Submit</button>
<a href="/page">Link</a>
<label htmlFor="input">Label</label>
<input id="input" />

// ✗ WRONG
<div onClick={handleClick}>Submit</div>
<div onClick={() => navigate("/page")}>Link</div>
<div className="label">Label</div>
```

---

## Motion & Animation

### Transitions

- **Duration**: 200ms for UI interactions, 300-400ms for larger changes
- **Easing**: ease-in-out for smooth motion
- **Trigger**: On hover, focus, and state changes

```tsx
className="transition-all duration-200"
className="transition-colors duration-300"
```

### Animation Guidelines

1. **Entrance**: 300-400ms (subtle scale or fade)
2. **Exit**: 200ms (quick, snappy)
3. **Hover**: 200ms (instant feedback)
4. **Loading**: Smooth, continuous

### Disabled Motion

Always check `prefers-reduced-motion`:

```tsx
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
```

---

## Elevation & Depth

### Shadow System

```css
/* Subtle shadow (buttons, cards on hover) */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

/* Medium shadow (floating elements) */
box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

/* Large shadow (modals, dropdowns) */
box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);

/* Gold glow (premium feel) */
box-shadow: 0 0 20px rgba(245, 166, 35, 0.3);
```

---

## Usage Examples

### Button Group

```tsx
<div className="flex gap-3">
  <button className="flex-1 px-4 py-3 rounded-full border border-[#2a2a3a] text-white font-semibold hover:border-[#f5a623]/40">
    Cancel
  </button>
  <button className="flex-1 px-4 py-3 rounded-full bg-[#f5a623] text-[#0a0a0e] font-bold hover:bg-[#fbbf4a]">
    Confirm
  </button>
</div>
```

### Form Field with Error

```tsx
<div>
  <label className="block text-sm font-medium text-white mb-2">
    Email
  </label>
  <input
    type="email"
    aria-describedby={error ? "email-error" : undefined}
    className={`w-full px-4 py-3 rounded-xl bg-[#13131a] border text-white outline-none transition-all duration-200 ${
      error
        ? "border-red-500/50 focus:ring-red-500/20"
        : "border-[#2a2a3a] focus:border-[#f5a623]/50 focus:ring-[#f5a623]/20"
    }`}
  />
  {error && (
    <div id="email-error" className="mt-2 text-red-400 text-xs">
      ⚠️ {error}
    </div>
  )}
</div>
```

### Card with Hover Effect

```tsx
<div className="p-6 rounded-2xl bg-[#13131a] border border-[#2a2a3a] hover:border-[#f5a623]/50 transition-all duration-200 cursor-pointer group">
  <h3 className="text-white font-bold mb-2 group-hover:text-[#f5a623] transition-colors">
    Title
  </h3>
  <p className="text-gray-400">Description</p>
</div>
```

---

## Implementation Guide

### Installation

See Storybook for interactive component examples:

```bash
npm run storybook
# Opens at http://localhost:6006
```

### Component Pattern

All components follow this structure:

```tsx
"use client"; // If interactive

import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  children,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-full font-bold transition-all duration-200 focus-visible:outline focus-visible:outline-offset-2",
        variant === "primary"
          ? "bg-[#f5a623] text-[#0a0a0e] hover:bg-[#fbbf4a]"
          : "border border-[#2a2a3a] text-white hover:border-[#f5a623]/40",
        size === "sm" && "px-6 py-2 text-sm",
        size === "md" && "px-8 py-4",
        size === "lg" && "px-10 py-5 text-lg",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

---

## Checklist for New Components

- [ ] Follows color system (no hard-coded colors)
- [ ] Includes focus indicator (`:focus-visible`)
- [ ] Touch targets minimum 48px (mobile) / 44px (desktop)
- [ ] 4.5:1 contrast ratio for text
- [ ] Respects `prefers-reduced-motion`
- [ ] Semantic HTML (button, link, form elements)
- [ ] Proper aria attributes (`aria-label`, `aria-describedby`, etc.)
- [ ] Mobile responsive (tested on real devices)
- [ ] TypeScript types defined
- [ ] Story file created (`*.stories.tsx`)
- [ ] Documentation added
- [ ] Tested with screen reader
- [ ] Keyboard navigation works

---

## Resources

- Tailwind Documentation: https://tailwindcss.com
- Storybook Documentation: https://storybook.js.org
- WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- Next.js Documentation: https://nextjs.org/docs
- Color Contrast Checker: https://webaim.org/resources/contrastchecker/
