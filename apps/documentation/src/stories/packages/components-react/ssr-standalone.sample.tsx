// page.tsx
import { PostAvatar } from '@swisspost/design-system-components-react/server/post-avatar';
import { PostBanner } from '@swisspost/design-system-components-react/server/post-banner';

export default function Page() {
  return (
    <div>
      <PostAvatar firstname="Max"></PostAvatar>
      <PostBanner>Lorem ipsum</PostBanner>
    </div>
  );
}
