# Thư viện Motion Quizzy — Next.js + TypeScript

## Route

```text
/thu-vien-motion
```

## Copy vào project

```text
app/thu-vien-motion/
components/motion-library/
public/motion-library/
```

## Product access gate

`app/thu-vien-motion/page.tsx` dùng trực tiếp conventions hiện tại của project:

```ts
import UserAuth from "@/hook/userAuth";
import UseProtectProduct from "@/hook/useProtectProduct";
```

Thêm Product `_id` vào `.env.local`:

```env
NEXT_PUBLIC_MOTION_LIBRARY_PRODUCT_ID=YOUR_PRODUCT_MONGO_ID
```

Flow:

```text
chưa login  -> không render thư viện
đã login nhưng chưa mua -> không render thư viện
đã login + đã mua -> render MotionLibraryApp
```

## Tại sao tách runtime ra khỏi React?

HTML nguồn chứa:
- 37 motion templates
- 34 text presets
- 30 video FX
- runtime canvas/DOM animation
- audio SFX và video/image demo được nhúng base64

Nếu đưa toàn bộ vào một TSX, component rất nặng và khó maintain.

Package đã tách thành:

```text
components/motion-library/
  MotionLibraryApp.tsx
  MotionLibraryHeader.tsx
  MotionLibraryToolbar.tsx
  MotionLibrarySections.tsx
  MotionLibraryDrawer.tsx
  MotionLibraryRuntime.tsx
  AccessGate.module.css

public/motion-library/
  engine.js
  app.js
  assets/
    sfx/
    fx/
```

`engine.js` giữ engine/template gốc.
`app.js` là UI runtime đã được đổi từ IIFE sang `MotionQuizzyMount()` để React mount/unmount được.

## Fonts

Font binaries nhúng trong HTML nguồn không được đưa vào package.
CSS ưu tiên font hiện tại của project:

```css
var(--font-archia, Arial, system-ui, sans-serif)
```

## Lưu ý bảo mật

`UseProtectProduct` chặn **giao diện route** theo quyền mua như hệ thống hiện tại.

Tuy nhiên file trong `public/motion-library/*` vẫn là static public URL. Nếu các asset/runtime này cũng cần chống truy cập trực tiếp tuyệt đối, cần phục vụ chúng qua endpoint backend có `JwtAuthGuard + hasPurchasedProduct(userId, productId)` hoặc signed URL, thay vì `public/`.
