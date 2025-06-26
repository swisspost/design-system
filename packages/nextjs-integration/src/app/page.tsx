import {
  PostTestTarget,
  PostTestTarget2,
  PostTestTarget3,
  PostTestTarget4,
  PostTestLabel,
  PostTestButton,
  PostTestButton2,
  PostTestButton3,
  PostTestListItemGroup2,
  PostTestList2,
  PostTestSpan,
  PostIcon,
  PostTestList,
} from '@swisspost/design-system-components-react/server';

export default function Home() {
  return (
    <>
      <h3>FOR</h3>
      <h5>II. Referencing From Outside a Shadow DOM Into That Shadow DOM</h5>
      <h6>1. Element:ariaLabelledByElements</h6>
      <div>
        <b>a. Light DOM → Shadow DOM Example</b>
        <label htmlFor="id_1">My Text</label>
        <PostTestTarget
          ariaLabelledbyId="id_1"
          workaround="ariaLabelledByElements"
        ></PostTestTarget>
      </div>
      <div>
        <b>b. Slotted Content → Shadow DOM Example</b>
        <PostTestTarget2 workaround="ariaLabelledByElements">
          <label slot="label-slot">My Text</label>
        </PostTestTarget2>
      </div>
      <h6>2. Set aria-labelledby on the host</h6>
      <div>
        <b>a. Directly</b>
        <PostTestTarget3 aria-labelledby="id_2">
          <label id="id_2" slot="label-slot">
            My Text
          </label>
        </PostTestTarget3>
      </div>
      <div>
        <b>b. Via ElementInternals</b>
        <PostTestTarget4 aria-labelledby="id_3">
          <label id="id_3" slot="label-slot">
            My Text
          </label>
        </PostTestTarget4>
      </div>
      <h5>III. Referencing From Inside a Shadow DOM Out to the Light DOM</h5>
      <b>Set id on the reference element host</b>
      <div>
        <PostTestLabel for="id_4" id="id_4"></PostTestLabel>
        <input aria-labelledby="id_4" />
      </div>
      <h5>IV. Referencing From a Shadow DOM Out to another Shadow DOM</h5>
      <b>Set id on the reference element host and aria-labelledby on the target element host</b>
      <div>
        <PostTestLabel for="id_5" id="id_5"></PostTestLabel>
        <PostTestTarget3 aria-labelledby="id_5"></PostTestTarget3>
      </div>

      <h3>Aria-Labelledby/Describedby</h3>
      <h5>II. Referencing From Outside a Shadow DOM Into That Shadow DOM</h5>
      <h6>1. Element:ariaLabelledByElements</h6>
      <div>
        <b>a. Light DOM → Shadow DOM Example</b>
        <span id="id_6">My Text</span>
        <PostTestButton2
          ariaLabelledbyId="id_6"
          workaround="ariaLabelledByElements"
        ></PostTestButton2>
      </div>

      <div>
        <b>b. Slotted Content → Shadow DOM Example</b>
        <PostTestButton3 workaround="ariaLabelledByElements">
          <span slot="label-slot">My Text</span>
        </PostTestButton3>
      </div>

      <h6>2. Set aria-labelledby on the host</h6>
      <div>
        <b>a. Light DOM → Shadow DOM Example</b>
        <span id="id_7">My Text</span>
        <PostTestButton ariaLabelledbyId="id_7"></PostTestButton>
      </div>
      <div>
        <b>b. Slotted Content → Shadow DOM Example</b>
        <PostTestButton ariaLabelledbyId="id_8">
          <span slot="label-slot" id="id_8">
            My Text
          </span>
        </PostTestButton>
      </div>
      <h5>III. Referencing From Inside a Shadow DOM Out to the Light DOM</h5>
      <b>Set id on the reference element host</b>
      <div>
        <PostTestSpan id="id_9"></PostTestSpan>
        <div className="btn btn-primary" aria-labelledby="id_9" role="button" tabIndex={0}>
          <PostIcon name="1022"></PostIcon>
        </div>
      </div>
      <h5>IV. Referencing From a Shadow DOM Out to another Shadow DOM</h5>
      <b>Set id on the reference element host and aria-labelledby on the target element host</b>
      <div>
        <PostTestSpan id="id_10"></PostTestSpan>
        <PostTestButton aria-labelledby="id_10"></PostTestButton>
      </div>

      <h3>Aria-Role: List</h3>
      <h5>II. Parent in the Light DOM - Children Into That Shadow DOM</h5>
      <div>
        <b>a. Light DOM → Shadow DOM </b>
        <PostTestListItemGroup2 role="list" tabIndex={0}></PostTestListItemGroup2>
      </div>

      <div>
        <b>b. Slotted Parent → Shadow DOM</b>{' '}
        <PostTestListItemGroup2 tabIndex={0}>
          <div slot="list-parent" role="list"></div>
        </PostTestListItemGroup2>
      </div>

      <h5>III. Parent in the Shadow DOM - Children Out to the Light DOM </h5>
      <div>
        <b>Shadow DOM → Slotted Children</b>
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

      <h5>IV. Parent and Children in Different Shadow DOM</h5>
      <div>
        <b>Shadow DOM → Other nested Shadow DOM</b>
        <PostTestList2></PostTestList2>
      </div>
    </>
  );
}
