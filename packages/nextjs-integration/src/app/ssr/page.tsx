import { PostMenuTrigger } from '@swisspost/design-system-components-react/server';

export default function Home() {
  return (
    <>
      <PostMenuTrigger for="menu-one">
        <button className="btn btn-primary">Menu button</button>
      </PostMenuTrigger>
    </>
  );
}
