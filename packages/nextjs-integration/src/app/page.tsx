import { PostTestButton2 } from '@swisspost/design-system-components-react/server';

export default function Home() {
  return (
    <>
      <h1>Design System Components</h1>
      <span id="id_2">My Text</span>
      <PostTestButton2
        ariaLabelledbyId="id_2"
        workaround="ariaLabelledByElements"
      ></PostTestButton2>
    </>
  );
}
