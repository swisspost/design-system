import {
  PostTestButton2,
  PostTestTarget,
  PostTestButton3,
  PostTestButtonControl,
  PostTestButton,
  PostTestSpan,
  PostIcon,
  PostTestList,
} from '@swisspost/design-system-components-react/server';

export default function Home() {
  return (
    <>
      <h1>Design System Components</h1>
      <div>
        <span id="id_2">My Text</span>
        <PostTestButton2
          ariaLabelledbyId="id_2"
          workaround="ariaLabelledByElements"
        ></PostTestButton2>
      </div>
      <div>
        <label htmlFor="id_1">My Text</label>
        <PostTestTarget
          ariaLabelledbyId="id_1"
          workaround="ariaLabelledByElements"
        ></PostTestTarget>
      </div>
      <div>
        <PostTestButton2
          ariaDescribedbyId="id_3"
          workaround="ariaDescribedByElements"
        ></PostTestButton2>
        <span id="id_3">My Description</span>
      </div>
      <div>
        <PostTestButton3 workaround="ariaDescribedByElements">
          <span slot="label-slot">My Description</span>
        </PostTestButton3>
      </div>
      <div>
        <PostTestButtonControl ariaControlsId="id_2" workaround="ariaControlsElements">
          Toggle Text
        </PostTestButtonControl>
      </div>
      <div>
        <span id="id_4">My Text</span>
        <PostTestButton ariaLabelledbyId="id_4"></PostTestButton>
      </div>
      <div>
        <PostTestSpan id="id_6"></PostTestSpan>
        <div className="btn btn-primary" aria-labelledby="id_6" role="button" tabIndex={0}>
          <PostIcon name="1022"></PostIcon>
        </div>
      </div>
      <div>
        <PostTestSpan id="id_7"></PostTestSpan>
        <PostTestButton aria-labelledby="id_7"></PostTestButton>
      </div>
      <div>
        <PostTestList>
          <div role="listitem" slot="post-list-item">
            item 1
          </div>
          <div role="listitem" slot="post-list-item">
            item 2
          </div>
          <div role="listitem" slot="post-list-item">
            item 3
          </div>
        </PostTestList>
      </div>
    </>
  );
}
