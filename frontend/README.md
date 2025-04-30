# React Real Estate UI Design

# Zentra — Brand Identity & Frontend Style Guide

---

## 1. Brand Essence

**Name**: Zentra

**Meaning**:

- "Zen" = Calm, peaceful, balanced
- "Center" = Core, heart, prime location

**Mission Statement**:

> "Zentra connects travelers to peaceful, centered places — from cozy urban lofts to tranquil natural retreats."

---

## 2. Taglines

- "Stay Centered, Stay Anywhere."
- "Where Calm Meets Convenience."
- "Your Peaceful Place in the World."
- "Zentra: The Art of Smart Stays."

---

## 3. Visual Identity

### 🎨 Color Palette

**Primary Colors**:

| Name        | Hex Code |
| ----------- | -------- |
| Orange Base | #FFBC80  |
| Purple Base | #D8C4F6  |

**Pastel Shades**:

| Name            | Hex Code |
| --------------- | -------- |
| Orange Lightest | #FFEAD8  |
| Orange Light    | #FFD1A6  |
| Orange Dark     | #FF9E4D  |
| Orange Darkest  | #FF7A1A  |
| Purple Lightest | #F1E9FF  |
| Purple Light    | #E0CCFF  |
| Purple Dark     | #B49DE1  |
| Purple Darkest  | #937ACC  |

**Neutrals**:

| Name         | Hex Code |
| ------------ | -------- |
| Background   | #F9FAFB  |
| Text Primary | #555B6E  |

---

### 🧢 Typography

**Font Family**:

- `Poppins`, `Helvetica Neue`, sans-serif

**Font Sizes**:

- Base Text: 16px
- Heading 1 (H1): 32px
- Heading 2 (H2): 24px
- Small Text: 14px

---

### 🖌️ UI Elements

- **Border Radius**: 12px
- **Box Shadow**: `0 2px 8px rgba(0, 0, 0, 0.08)`

---

## 4. Tone & Voice

- Calm, clear, and confident
- Friendly yet professional
- Warm, inviting, and easy to understand
- Avoid hard-sell language and jargon

**Example Copy**:

> "Find your next peaceful place with Zentra. From chic city lofts to forest retreats, we bring you serenity, one stay at a time."

---

## 5. Frontend SCSS Base (`theme.scss`)

**Global Variables**:

```scss
// 🎨 Color Variables
$color-primary: #ffbc80;
$color-accent: #fff1a6;
$color-secondary: #d8c4f6;
$color-background: #f9fafb;
$color-text-primary: #555b6e;

// 🎨 Extended Color Palette
$orange-lightest: #ffead8;
$orange-light: #ffd1a6;
$orange-dark: #ff9e4d;
$orange-darkest: #ff7a1a;
$purple-lightest: #f1e9ff;
$purple-light: #e0ccff;
$purple-dark: #b49de1;
$purple-darkest: #937acc;

// 🌟 Typography
$font-family-base: "Poppins", "Helvetica Neue", sans-serif;
$font-size-base: 16px;
$font-size-heading: 32px;
$font-size-subheading: 24px;
$font-size-small: 14px;

// 🧱 Layout
$spacing-unit: 8px;
$border-radius-base: 12px;
$box-shadow-base: 0 2px 8px rgba(0, 0, 0, 0.08);
```
