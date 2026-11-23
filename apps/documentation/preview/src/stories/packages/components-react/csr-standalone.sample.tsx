// app.tsx
import { PostAvatar } from '@swisspost/design-system-components-react/post-avatar';
import { PostBanner } from '@swisspost/design-system-components-react/post-banner';

export default function App() {
  return (
    <div>
      <PostAvatar firstname="Max"></PostAvatar>
      <PostBanner>Lorem ipsum</PostBanner>
    </div>
  );
}
