import {
  PostTestButton2,
  PostTestTarget,
  PostTestButton3,
  PostTestButtonControl,
  PostTestButton,
  PostTestSpan,
  PostIcon,
  PostTestList,
  PostTestTarget4,
} from '@swisspost/design-system-components-react/server';

export default function Home() {
  return (
    <>
      <h3>For / Elements API</h3>
      <div>
        <label htmlFor="id_1">My Text</label>
        <PostTestTarget
          ariaLabelledbyId="id_1"
          workaround="ariaLabelledByElements"
        ></PostTestTarget>
      </div>
      <div>
        <h3>For/ ElementInternals</h3>
        <PostTestTarget4 aria-labelledby="id_7">
          <label id="id_7" slot="label-slot">
            My Text
          </label>
        </PostTestTarget4>
      </div>
      <h3>Aria-labelledby / Elements API</h3>
      <div>
        <span id="id_2">My Text</span>
        <PostTestButton2
          ariaLabelledbyId="id_2"
          workaround="ariaLabelledByElements"
        ></PostTestButton2>
      </div>
      <h3>Aria-describedby / Elements API</h3>
      <div>
        <PostTestButton2
          ariaDescribedbyId="id_3"
          workaround="ariaDescribedByElements"
        ></PostTestButton2>
        <span id="id_3">My Description</span>
      </div>
      <div>
        <PostTestButton3 workaround="ariaDescribedByElements">
          <span slot="label-slot">My Slotted Description</span>
        </PostTestButton3>
      </div>

      <h3>Aria-controls / Elements API</h3>
      <div>
        <PostTestButtonControl ariaControlsId="id_2" workaround="ariaControlsElements">
          Toggle Text
        </PostTestButtonControl>
      </div>
      <h3>Aria-labelledby / id on the host</h3>
      <div>
        <PostTestSpan id="id_6"></PostTestSpan>
        <div className="btn btn-primary" aria-labelledby="id_6" role="button" tabIndex={0}>
          <PostIcon name="1022"></PostIcon>
        </div>
      </div>
      <h3>Aria-labelledby / 2 shadows /id and arialabelledby on the hosts</h3>
      <div>
        <PostTestSpan id="id_7"></PostTestSpan>
        <PostTestButton aria-labelledby="id_7"></PostTestButton>
      </div>
      <div>
        List with slotted children
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
