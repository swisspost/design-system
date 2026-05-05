// page.tsx
import { PostAvatar, PostBanner } from '@swisspost/design-system-components-react/server';

export default function Page() {
  return (
    <div>
      <PostAvatar firstname="Max"></PostAvatar>
      <PostBanner>Lorem ipsum</PostBanner>
    </div>
  );
}
