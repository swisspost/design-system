import {
  PostIconLetter,
  PostIconLetterSolid,
} from '@swisspost/design-system-components-react/icons';

export default function Page() {
  return (
    <>
      {/* Regular letter icon */}
      <PostIconLetter></PostIconLetter>

      {/* Solid letter icon */}
      <PostIconLetterSolid></PostIconLetterSolid>

      {/* Letter icon with custom styles, fontSize defines icon size */}
      <PostIconLetter style={{ color: 'red', fontSize: '2em' }}></PostIconLetter>

      {/* Flipped letter icon */}
      <PostIconLetter flipH={true}></PostIconLetter>

      {/* Rotated letter icon */}
      <PostIconLetter rotate={45}></PostIconLetter>

      {/* Scaled letter icon (applies a transform, does not change the used space of the icon) */}
      <PostIconLetter scale={2}></PostIconLetter>

      {/* Animated letter icon */}
      <PostIconLetter animation="spin"></PostIconLetter>
    </>
  );
}
